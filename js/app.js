const CURRENT_USER_KEY = "clf_current_user";

document.addEventListener("DOMContentLoaded", async () => {
  setupLogout();
  showUserInfo();

  const page = document.body.dataset.page;

  if (page === "login") initLogin();
  if (page === "lostDashboard") await initLostDashboard();
  if (page === "foundDashboard") await initFoundDashboard();
  if (page === "upload") initUploadPage();
  if (page === "itemDetails") await initItemDetails();
});

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.location.href = "index.html";
}

function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }
}

function showUserInfo() {
  const userInfo = document.getElementById("userInfo");
  const user = getCurrentUser();

  if (userInfo && user) {
    userInfo.textContent = `${user.full_name} | ID: ${user.college_id}`;
  }
}

function requireLogin(role) {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  if (role && user.role !== role) {
    alert("You are not allowed to access this page.");
    window.location.href = "index.html";
    return null;
  }

  return user;
}

function escapeHTML(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shortText(text, limit) {
  if (!text) return "";
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "...";
}

function createPlaceholderImage(text) {
  const safeText = escapeHTML(text || "Item");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
      <rect width="100%" height="100%" fill="#dbeafe"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-size="42" font-family="Arial" fill="#1d4ed8">${safeText}</text>
    </svg>
  `;

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function getStatusClass(status) {
  if (status === "Returned") return "danger-status";
  if (status === "Claim Pending") return "pending-status";
  return "status";
}

/* LOGIN + AUTO REGISTER */

function initLogin() {
  const params = new URLSearchParams(window.location.search);
  const selectedRole = params.get("role");

  if (selectedRole) {
    document.getElementById("role").value = selectedRole;
  }

  const loginForm = document.getElementById("loginForm");
  const message = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const collegeId = document.getElementById("collegeId").value.trim().toUpperCase();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!fullName || !collegeId || !phone || !password || !role) {
      message.textContent = "Please fill all fields.";
      message.style.color = "red";
      return;
    }

    const { data: existingUser } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("college_id", collegeId)
      .maybeSingle();

    if (existingUser) {
      if (existingUser.password !== password) {
        message.textContent = "Wrong password.";
        message.style.color = "red";
        return;
      }

      if (existingUser.role !== role) {
        message.textContent = "Selected role does not match your account.";
        message.style.color = "red";
        return;
      }

      setCurrentUser(existingUser);

      if (role === "lost") {
        window.location.href = "lost-dashboard.html";
      } else {
        window.location.href = "found-dashboard.html";
      }

      return;
    }

    const newUser = {
      college_id: collegeId,
      full_name: fullName,
      role: role,
      phone: phone,
      password: password
    };

    const { data: createdUser, error } = await supabaseClient
      .from("profiles")
      .insert(newUser)
      .select()
      .single();

    if (error) {
      message.textContent = error.message;
      message.style.color = "red";
      return;
    }

    setCurrentUser(createdUser);

    if (role === "lost") {
      window.location.href = "lost-dashboard.html";
    } else {
      window.location.href = "found-dashboard.html";
    }
  });
}

/* DATABASE */

async function fetchItems() {
  const { data, error } = await supabaseClient
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    alert("Error loading items: " + error.message);
    return [];
  }

  return data || [];
}

async function fetchClaims() {
  const { data, error } = await supabaseClient
    .from("claims")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    alert("Error loading claims: " + error.message);
    return [];
  }

  return data || [];
}

async function fetchItemById(itemId) {
  const { data, error } = await supabaseClient
    .from("items")
    .select("*")
    .eq("id", itemId)
    .single();

  if (error) return null;
  return data;
}

/* LOST DASHBOARD */

async function initLostDashboard() {
  const user = requireLogin("lost");
  if (!user) return;

  document.getElementById("searchInput").addEventListener("input", renderLostItems);
  document.getElementById("categoryFilter").addEventListener("change", renderLostItems);
  document.getElementById("locationFilter").addEventListener("input", renderLostItems);

  await renderLostItems();
}

async function renderLostItems() {
  const grid = document.getElementById("itemsGrid");
  grid.innerHTML = `<div class="empty">Loading found items...</div>`;

  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const location = document.getElementById("locationFilter").value.toLowerCase();

  let items = await fetchItems();

  items = items.filter(item => item.status !== "Returned");

  items = items.filter(item => {
    const text = `${item.title} ${item.category} ${item.description} ${item.location}`.toLowerCase();

    return (
      text.includes(search) &&
      (category === "" || item.category === category) &&
      item.location.toLowerCase().includes(location)
    );
  });

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty">No matching found items available.</div>`;
    return;
  }

  grid.innerHTML = items.map(item => createItemCard(item, true)).join("");
}

/* FOUND DASHBOARD */

async function initFoundDashboard() {
  const user = requireLogin("found");
  if (!user) return;

  await renderFoundDashboard(user);
}

async function renderFoundDashboard(user) {
  const items = await fetchItems();
  const claims = await fetchClaims();

  const myItems = items.filter(item => item.user_id === user.college_id);
  const myItemIds = myItems.map(item => item.id);
  const myClaims = claims.filter(claim => myItemIds.includes(claim.item_id));
  const pendingClaims = myClaims.filter(claim => claim.status === "Pending");

  document.getElementById("uploadCount").textContent = myItems.length;
  document.getElementById("claimCount").textContent = myClaims.length;
  document.getElementById("pendingCount").textContent = pendingClaims.length;

  renderClaimsList(myClaims, items);
  renderMyUploadedItems(myItems);
}

function renderClaimsList(claims, items) {
  const claimsList = document.getElementById("claimsList");

  if (claims.length === 0) {
    claimsList.innerHTML = `<div class="empty">No claim requests received yet.</div>`;
    return;
  }

  claimsList.innerHTML = claims.map(claim => {
    const item = items.find(i => i.id === claim.item_id);

    return `
      <div class="claim-card">
        <h4>${escapeHTML(item ? item.title : "Unknown Item")}</h4>
        <p><b>Claimed By:</b> ${escapeHTML(claim.claimant_name)} (${escapeHTML(claim.claimant_id)})</p>
        <p><b>Proof:</b> ${escapeHTML(claim.proof)}</p>
        <p><b>Status:</b> ${escapeHTML(claim.status)}</p>

        ${
          claim.status === "Pending"
          ? `
            <div class="claim-actions">
              <button class="btn accept" onclick="updateClaimStatus(${claim.id}, 'Accepted')">Accept</button>
              <button class="btn reject" onclick="updateClaimStatus(${claim.id}, 'Rejected')">Reject</button>
            </div>
          `
          : ""
        }
      </div>
    `;
  }).join("");
}

function renderMyUploadedItems(items) {
  const grid = document.getElementById("myItemsGrid");

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty">You have not uploaded any item yet.</div>`;
    return;
  }

  grid.innerHTML = items.map(item => createItemCard(item, false)).join("");
}

async function updateClaimStatus(claimId, status) {
  const claims = await fetchClaims();
  const claim = claims.find(c => c.id === claimId);

  if (!claim) {
    alert("Claim not found.");
    return;
  }

  const { error: claimError } = await supabaseClient
    .from("claims")
    .update({ status })
    .eq("id", claimId);

  if (claimError) {
    alert("Claim update failed: " + claimError.message);
    return;
  }

  if (status === "Accepted") {
    await supabaseClient
      .from("items")
      .update({ status: "Returned" })
      .eq("id", claim.item_id);

    await supabaseClient
      .from("claims")
      .update({ status: "Rejected" })
      .eq("item_id", claim.item_id)
      .eq("status", "Pending")
      .neq("id", claimId);
  }

  alert(`Claim ${status}`);
  await initFoundDashboard();
}

/* UPLOAD */

function initUploadPage() {
  const user = requireLogin("found");
  if (!user) return;

  const uploadForm = document.getElementById("uploadForm");
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");

  let selectedFile = null;

  imageInput.addEventListener("change", () => {
    selectedFile = imageInput.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select only image files.");
      imageInput.value = "";
      selectedFile = null;
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Image is too large. Upload below 5 MB.");
      imageInput.value = "";
      selectedFile = null;
      return;
    }

    imagePreview.src = URL.createObjectURL(selectedFile);
  });

  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = uploadForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Uploading...";

    try {
      const itemName = document.getElementById("itemName").value.trim();
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value.trim();
      const location = document.getElementById("location").value.trim();
      const date = document.getElementById("date").value;
      const contact = document.getElementById("contact").value.trim();

      let imageUrl = createPlaceholderImage(category);

      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const safeId = user.college_id.replace(/[^A-Za-z0-9]/g, "");
        const filePath = `${safeId}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabaseClient.storage
          .from("lost-found-images")
          .upload(filePath, selectedFile, {
            cacheControl: "3600",
            upsert: false
          });

        if (uploadError) throw uploadError;

        const publicData = supabaseClient.storage
          .from("lost-found-images")
          .getPublicUrl(filePath);

        imageUrl = publicData.data.publicUrl;
      }

      const newItem = {
        title: itemName,
        category: category,
        description: description,
        location: location,
        found_date: date,
        contact_number: contact,
        image_url: imageUrl,
        user_id: user.college_id,
        reporter_name: user.full_name,
        status: "Available"
      };

      const { error } = await supabaseClient
        .from("items")
        .insert(newItem);

      if (error) throw error;

      alert("Found item uploaded successfully.");
      window.location.href = "found-dashboard.html";

    } catch (error) {
      alert("Upload failed: " + error.message);
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Found Item";
    }
  });
}

/* ITEM DETAILS + CLAIM */

async function initItemDetails() {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id");

  const detailsBox = document.getElementById("detailsBox");
  const claimSection = document.getElementById("claimSection");

  if (!itemId) {
    detailsBox.innerHTML = `<div class="empty">Invalid item link.</div>`;
    claimSection.style.display = "none";
    return;
  }

  const item = await fetchItemById(itemId);

  if (!item) {
    detailsBox.innerHTML = `<div class="empty">Item not found.</div>`;
    claimSection.style.display = "none";
    return;
  }

  const statusClass = getStatusClass(item.status);

  detailsBox.innerHTML = `
    <img src="${escapeHTML(item.image_url)}" alt="${escapeHTML(item.title)}">

    <div class="details-info">
      <span class="badge">${escapeHTML(item.category)}</span>
      <span class="badge ${statusClass}">${escapeHTML(item.status)}</span>

      <h2>${escapeHTML(item.title)}</h2>

      <p><b>Description:</b> ${escapeHTML(item.description)}</p>
      <p><b>Found Location:</b> ${escapeHTML(item.location)}</p>
      <p><b>Found Date:</b> ${escapeHTML(item.found_date)}</p>
      <p><b>Reporter Name:</b> ${escapeHTML(item.reporter_name)}</p>
      <p><b>Reporter ID:</b> ${escapeHTML(item.user_id)}</p>
      <p><b>Contact:</b> ${escapeHTML(item.contact_number)}</p>
    </div>
  `;

  if (user.role !== "lost" || item.status === "Returned") {
    claimSection.style.display = "none";
    return;
  }

  const claimForm = document.getElementById("claimForm");

  claimForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const proof = document.getElementById("proof").value.trim();
    const claims = await fetchClaims();

    const alreadyClaimed = claims.some(
      c => c.item_id == item.id &&
           c.claimant_id === user.college_id &&
           c.status === "Pending"
    );

    if (alreadyClaimed) {
      document.getElementById("claimMessage").textContent =
        "You already sent a pending claim for this item.";
      document.getElementById("claimMessage").style.color = "red";
      return;
    }

    const newClaim = {
      item_id: item.id,
      claimant_id: user.college_id,
      claimant_name: user.full_name,
      proof: proof,
      status: "Pending"
    };

    const { error: claimError } = await supabaseClient
      .from("claims")
      .insert(newClaim);

    if (claimError) {
      alert("Claim failed: " + claimError.message);
      return;
    }

    await supabaseClient
      .from("items")
      .update({ status: "Claim Pending" })
      .eq("id", item.id);

    document.getElementById("claimMessage").textContent =
      "Claim request sent successfully.";
    document.getElementById("claimMessage").style.color = "green";

    claimForm.reset();
  });
}

/* CARD UI */

function createItemCard(item, showClaimButton) {
  const statusClass = getStatusClass(item.status);

  return `
    <div class="item-card">
      <img src="${escapeHTML(item.image_url)}" alt="${escapeHTML(item.title)}">

      <div class="item-content">
        <span class="badge">${escapeHTML(item.category)}</span>
        <span class="badge ${statusClass}">${escapeHTML(item.status)}</span>

        <h3>${escapeHTML(item.title)}</h3>
        <p><b>Location:</b> ${escapeHTML(item.location)}</p>
        <p><b>Date:</b> ${escapeHTML(item.found_date || "Not given")}</p>
        <p>${escapeHTML(shortText(item.description, 80))}</p>

        <div class="card-actions">
          <a class="btn primary" href="item-details.html?id=${encodeURIComponent(item.id)}">View Details</a>
          ${
            showClaimButton
            ? `<a class="btn secondary" href="item-details.html?id=${encodeURIComponent(item.id)}">Claim</a>`
            : ""
          }
        </div>
      </div>
    </div>
  `;
}