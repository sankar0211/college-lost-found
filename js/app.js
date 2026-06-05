async function getCurrentUser() {
  const { data } = await supabaseClient.auth.getUser();
  return data.user;
}

async function registerUser() {
  const fullName = document.getElementById("fullName").value.trim();
  const role = document.getElementById("role").value;
  const collegeId = document.getElementById("collegeId").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!fullName || !role || !email || !password) {
    message.innerText = "Please fill all required fields.";
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    message.innerText = error.message;
    return;
  }

  const user = data.user;

  if (user) {
    const { error: profileError } = await supabaseClient
      .from("profiles")
      .upsert(
        {
          id: user.id,
          full_name: fullName,
          role: role,
          phone: phone,
          college_id: collegeId
        },
        {
          onConflict: "id"
        }
      );

    if (profileError) {
      message.innerText = profileError.message;
      return;
    }
  }

  message.innerText = "Registration successful. Please login.";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}

async function loginUser() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Please enter email and password.";
    return;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    message.innerText = error.message;
    return;
  }

  window.location.href = "dashboard.html";
}

async function logoutUser() {
  await supabaseClient.auth.signOut();
  window.location.href = "login.html";
}

async function loadDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!error && profile) {
    document.getElementById("welcomeText").innerText =
      `Welcome, ${profile.full_name} (${profile.role})`;
  }

  loadItems();
}

async function loadItems() {
  const searchInput = document.getElementById("searchInput");
  const keyword = searchInput ? searchInput.value.toLowerCase() : "";
  const itemsList = document.getElementById("itemsList");

  const { data: items, error } = await supabaseClient
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    itemsList.innerHTML = `<p>${error.message}</p>`;
    return;
  }

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(keyword) ||
    item.location.toLowerCase().includes(keyword) ||
    item.category.toLowerCase().includes(keyword)
  );

  if (filteredItems.length === 0) {
    itemsList.innerHTML = "<p>No items found.</p>";
    return;
  }

  itemsList.innerHTML = filteredItems.map(item => `
    <div class="card">
      ${item.image_url ? `<img src="${item.image_url}" alt="${item.title}">` : ""}
      <h3>${item.title}</h3>
      <p><b>Category:</b> ${item.category}</p>
      <p><b>Location:</b> ${item.location}</p>
      <p><b>Status:</b> ${item.status}</p>
      <a href="item-details.html?id=${item.id}">View Details</a>
    </div>
  `).join("");
}

async function uploadItem() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const category = document.getElementById("category").value;
  const location = document.getElementById("location").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();
  const message = document.getElementById("message");

  if (!title || !description || !category || !location) {
    message.innerText = "Please fill all required fields.";
    return;
  }

  const { error } = await supabaseClient
    .from("items")
    .insert([
      {
        title: title,
        description: description,
        category: category,
        location: location,
        image_url: imageUrl,
        user_id: user.id
      }
    ]);

  if (error) {
    message.innerText = error.message;
    return;
  }

  message.innerText = "Item uploaded successfully.";

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1200);
}

async function loadItemDetails() {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id");

  const { data: item, error } = await supabaseClient
    .from("items")
    .select("*")
    .eq("id", itemId)
    .single();

  const itemDetails = document.getElementById("itemDetails");

  if (error) {
    itemDetails.innerHTML = `<p>${error.message}</p>`;
    return;
  }

  itemDetails.innerHTML = `
    <div class="card">
      ${item.image_url ? `<img src="${item.image_url}" alt="${item.title}">` : ""}
      <h2>${item.title}</h2>
      <p><b>Description:</b> ${item.description}</p>
      <p><b>Category:</b> ${item.category}</p>
      <p><b>Found Location:</b> ${item.location}</p>
      <p><b>Status:</b> ${item.status}</p>
    </div>
  `;
}

async function submitClaim() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id");
  const proof = document.getElementById("proof").value.trim();
  const message = document.getElementById("message");

  if (!proof) {
    message.innerText = "Please enter proof before claiming.";
    return;
  }

  const { error } = await supabaseClient
    .from("claims")
    .insert([
      {
        item_id: itemId,
        claimant_id: user.id,
        proof: proof
      }
    ]);

  if (error) {
    message.innerText = error.message;
    return;
  }

  message.innerText = "Claim submitted successfully.";
}

async function loadClaims() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const { data: claims, error } = await supabaseClient
    .from("claims")
    .select(`
      id,
      proof,
      status,
      created_at,
      item_id,
      items (
        title,
        location,
        user_id
      )
    `)
    .order("created_at", { ascending: false });

  const claimsList = document.getElementById("claimsList");

  if (error) {
    claimsList.innerHTML = `<p>${error.message}</p>`;
    return;
  }

  if (!claims || claims.length === 0) {
    claimsList.innerHTML = "<p>No claims found.</p>";
    return;
  }

  claimsList.innerHTML = claims.map(claim => `
    <div class="card">
      <h3>${claim.items.title}</h3>
      <p><b>Location:</b> ${claim.items.location}</p>
      <p><b>Proof:</b> ${claim.proof}</p>
      <p><b>Status:</b> ${claim.status}</p>

      ${
        claim.items.user_id === user.id && claim.status === "pending"
        ? `
          <button onclick="updateClaimStatus(${claim.id}, 'accepted')">Accept</button>
          <button onclick="updateClaimStatus(${claim.id}, 'rejected')">Reject</button>
        `
        : ""
      }
    </div>
  `).join("");
}

async function updateClaimStatus(claimId, status) {
  const { error } = await supabaseClient
    .from("claims")
    .update({ status: status })
    .eq("id", claimId);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Claim updated.");
  loadClaims();
}