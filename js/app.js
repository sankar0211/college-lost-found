const CURRENT_USER_KEY = "clf_current_user";
const LANG_KEY = "clf_language";
const DARK_KEY = "clf_dark_mode";

let selectedComplaintId = null;
let selectedAdminComplaintId = null;

const translations = {
  en: {
    appName: "Campus Lost & Found",
    login: "Login",
    tag: "College Utility Website",
    heroTitle: "Find Lost Items. Report Found Items.",
    heroText: "A campus portal for students, faculty, parents, visitors and public users to report, search and claim lost items.",
    lostBtn: "I Lost an Item",
    foundBtn: "I Found an Item",
    searchItems: "Search Items",
    searchText: "Search found items by name, category, location and date.",
    uploadImages: "Upload Images",
    uploadText: "Upload from files or capture directly using mobile camera.",
    claimRequests: "Claim Requests",
    claimText: "Send proof and wait for reporter/admin approval.",
    lostDashboard: "Lost User Dashboard"
  },

  ta: {
    appName: "வளாக இழந்தது & கண்டது",
    login: "உள்நுழை",
    tag: "கல்லூரி பயன்பாட்டு இணையதளம்",
    heroTitle: "இழந்த பொருட்களை கண்டுபிடிக்கவும். கண்ட பொருட்களை பதிவிடவும்.",
    heroText: "மாணவர்கள், ஆசிரியர்கள், பெற்றோர், வருகையாளர்கள் மற்றும் பொதுமக்கள் பயன்படுத்தும் வளாக பொருள் தேடல் தளம்.",
    lostBtn: "நான் பொருள் இழந்தேன்",
    foundBtn: "நான் பொருள் கண்டேன்",
    searchItems: "பொருட்களை தேடு",
    searchText: "பெயர், வகை, இடம், தேதி மூலம் தேடலாம்.",
    uploadImages: "படங்களை பதிவேற்று",
    uploadText: "கோப்பிலிருந்து அல்லது மொபைல் கேமராவால் பதிவேற்றலாம்.",
    claimRequests: "உரிமை கோரிக்கை",
    claimText: "ஆதாரம் அனுப்பி அனுமதி பெறவும்.",
    lostDashboard: "இழந்த பயனர் பலகை"
  },

  hi: {
    appName: "Campus Lost & Found",
    login: "लॉगिन",
    tag: "कॉलेज उपयोगिता वेबसाइट",
    heroTitle: "खोई वस्तु खोजें। मिली वस्तु रिपोर्ट करें।",
    heroText: "छात्रों, शिक्षकों, अभिभावकों, आगंतुकों और सार्वजनिक उपयोगकर्ताओं के लिए पोर्टल।",
    lostBtn: "मेरी वस्तु खो गई",
    foundBtn: "मुझे वस्तु मिली",
    searchItems: "वस्तु खोजें",
    searchText: "नाम, श्रेणी, स्थान और तारीख से खोजें।",
    uploadImages: "चित्र अपलोड करें",
    uploadText: "फाइल से अपलोड करें या मोबाइल कैमरा से कैप्चर करें।",
    claimRequests: "क्लेम अनुरोध",
    claimText: "प्रमाण भेजें और अनुमति की प्रतीक्षा करें।",
    lostDashboard: "खोई वस्तु डैशबोर्ड"
  },

  te: {
    appName: "క్యాంపస్ లాస్ట్ & ఫౌండ్",
    login: "లాగిన్",
    tag: "కాలేజ్ యుటిలిటీ వెబ్‌సైట్",
    heroTitle: "పోయిన వస్తువులను కనుగొనండి. దొరికిన వస్తువులను నివేదించండి.",
    heroText: "విద్యార్థులు, ఉపాధ్యాయులు, తల్లిదండ్రులు, సందర్శకుల కోసం క్యాంపస్ పోర్టల్.",
    lostBtn: "నేను వస్తువు కోల్పోయాను",
    foundBtn: "నాకు వస్తువు దొరికింది",
    searchItems: "వస్తువులు వెతకండి",
    searchText: "పేరు, వర్గం, స్థలం, తేదీ ద్వారా వెతకండి.",
    uploadImages: "చిత్రాలు అప్లోడ్ చేయండి",
    uploadText: "ఫైల్ నుండి లేదా మొబైల్ కెమెరాతో అప్లోడ్ చేయండి.",
    claimRequests: "క్లెయిమ్ అభ్యర్థనలు",
    claimText: "ఆధారం పంపి ఆమోదం కోసం వేచి ఉండండి.",
    lostDashboard: "లాస్ట్ యూజర్ డ్యాష్‌బోర్డ్"
  },

  ml: {
    appName: "ക്യാമ്പസ് Lost & Found",
    login: "ലോഗിൻ",
    tag: "കോളേജ് യൂട്ടിലിറ്റി വെബ്സൈറ്റ്",
    heroTitle: "നഷ്ടപ്പെട്ട വസ്തുക്കൾ കണ്ടെത്തുക. കണ്ടെത്തിയ വസ്തുക്കൾ റിപ്പോർട്ട് ചെയ്യുക.",
    heroText: "വിദ്യാർത്ഥികൾ, അധ്യാപകർ, രക്ഷിതാക്കൾ, സന്ദർശകർ എന്നിവർക്ക് ഉപയോഗിക്കാവുന്ന പോർട്ടൽ.",
    lostBtn: "എനിക്ക് വസ്തു നഷ്ടപ്പെട്ടു",
    foundBtn: "എനിക്ക് വസ്തു കിട്ടി",
    searchItems: "വസ്തുക്കൾ തിരയുക",
    searchText: "പേര്, വിഭാഗം, സ്ഥലം, തീയതി ഉപയോഗിച്ച് തിരയുക.",
    uploadImages: "ചിത്രങ്ങൾ അപ്ലോഡ് ചെയ്യുക",
    uploadText: "ഫയലിൽ നിന്നോ മൊബൈൽ ക്യാമറ ഉപയോഗിച്ചോ അപ്ലോഡ് ചെയ്യുക.",
    claimRequests: "ക്ലെയിം അഭ്യർത്ഥനകൾ",
    claimText: "തെളിവ് അയച്ച് അംഗീകാരം കാത്തിരിക്കുക.",
    lostDashboard: "നഷ്ടപ്പെട്ട ഉപയോക്തൃ ഡാഷ്ബോർഡ്"
  },

  kn: {
    appName: "ಕ್ಯಾಂಪಸ್ Lost & Found",
    login: "ಲಾಗಿನ್",
    tag: "ಕಾಲೇಜು ಉಪಯೋಗಿ ವೆಬ್‌ಸೈಟ್",
    heroTitle: "ಕಳೆದುಹೋದ ವಸ್ತುಗಳನ್ನು ಹುಡುಕಿ. ಸಿಕ್ಕ ವಸ್ತುಗಳನ್ನು ವರದಿ ಮಾಡಿ.",
    heroText: "ವಿದ್ಯಾರ್ಥಿಗಳು, ಶಿಕ್ಷಕರು, ಪೋಷಕರು, ಭೇಟಿ ದಾರರು ಬಳಸಬಹುದಾದ ಕ್ಯಾಂಪಸ್ ಪೋರ್ಟಲ್.",
    lostBtn: "ನಾನು ವಸ್ತು ಕಳೆದುಕೊಂಡೆ",
    foundBtn: "ನನಗೆ ವಸ್ತು ಸಿಕ್ಕಿತು",
    searchItems: "ವಸ್ತುಗಳನ್ನು ಹುಡುಕಿ",
    searchText: "ಹೆಸರು, ವರ್ಗ, ಸ್ಥಳ, ದಿನಾಂಕದಿಂದ ಹುಡುಕಿ.",
    uploadImages: "ಚಿತ್ರಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    uploadText: "ಫೈಲ್‌ನಿಂದ ಅಥವಾ ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾ ಮೂಲಕ ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
    claimRequests: "ಹಕ್ಕು ವಿನಂತಿಗಳು",
    claimText: "ಸಾಕ್ಷಿ ಕಳುಹಿಸಿ ಅನುಮೋದನೆಗಾಗಿ ಕಾಯಿರಿ.",
    lostDashboard: "ಕಳೆದುಹೋದ ಬಳಕೆದಾರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  applyDarkMode();
  setupThemeToggle();
  applyLanguage();
  setupLanguageMenu();
  setupLogout();
  showUserInfo();

  const page = document.body.dataset.page;

  if (page === "home") initHome();
  if (page === "login") initAuthPage();
  if (page === "lostDashboard") await initLostDashboard();
  if (page === "foundDashboard") await initFoundDashboard();
  if (page === "upload") initUploadPage();
  if (page === "itemDetails") await initItemDetails();
  if (page === "complaints") await initComplaints();
  if (page === "adminDashboard") await initAdminDashboard();
  if (page === "adminUsers") await initAdminUsers();
  if (page === "adminItems") await initAdminItems();
  if (page === "adminComplaints") await initAdminComplaints();
});

/* ---------------- LANGUAGE ---------------- */

function initHome() {
  const lang = localStorage.getItem(LANG_KEY);
  const screen = document.getElementById("languageScreen");

  if (!lang && screen) {
    screen.style.display = "flex";
  }
}

function setupLanguageMenu() {
  const btn = document.getElementById("languageBtn");
  const menu = document.getElementById("languageMenu");

  if (!btn || !menu) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  });

  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    menu.classList.remove("open");
  });
}

function setLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang);

  const screen = document.getElementById("languageScreen");
  if (screen) screen.style.display = "none";

  const menu = document.getElementById("languageMenu");
  if (menu) menu.classList.remove("open");

  applyLanguage();
}

function applyLanguage() {
  const lang = localStorage.getItem(LANG_KEY) || "en";
  const dict = translations[lang] || translations.en;

  const select = document.getElementById("languageSelect");
  if (select) select.value = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
}

/* ---------------- DARK MODE ---------------- */

function toggleDarkMode() {
  const current = localStorage.getItem(DARK_KEY) === "true";
  localStorage.setItem(DARK_KEY, String(!current));
  applyDarkMode();
  setupThemeToggle();
}

function applyDarkMode() {
  const enabled = localStorage.getItem(DARK_KEY) === "true";
  document.body.classList.toggle("dark", enabled);
}

function setupThemeToggle() {
  const toggle = document.getElementById("themeToggle");

  if (toggle) {
    toggle.checked = localStorage.getItem(DARK_KEY) === "true";

    toggle.onchange = () => {
      localStorage.setItem(DARK_KEY, String(toggle.checked));
      applyDarkMode();
    };
  }
}

/* ---------------- COMMON ---------------- */

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
  if (logoutBtn) logoutBtn.addEventListener("click", logoutUser);
}

function showUserInfo() {
  const userInfo = document.getElementById("userInfo");
  const user = getCurrentUser();

  if (userInfo && user) {
    userInfo.textContent =
      `${user.full_name} | ID: ${user.user_id} | Type: ${user.user_type}`;
  }
}

function requireLogin() {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  return user;
}

function requireAdmin() {
  const user = getCurrentUser();

  if (!user || user.user_type !== "admin") {
    alert("Admin access only.");
    window.location.href = "login.html";
    return null;
  }

  return user;
}

function goDashboard() {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  if (user.user_type === "admin") {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "lost-dashboard.html";
  }
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
  return text.length <= limit ? text : text.substring(0, limit) + "...";
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  input.type = input.type === "password" ? "text" : "password";
}

function setButtonLoading(button, loading, text) {
  if (!button) return;

  if (loading) {
    button.disabled = true;
    button.innerHTML = `<div class="loader"></div>`;
  } else {
    button.disabled = false;
    button.innerHTML = `<span class="btn-text">${text}</span>`;
  }
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
  if (status === "Returned" || status === "Rejected") return "danger-status";
  if (status === "Pending Approval" || status === "Claim Pending") return "pending-status";
  return "status";
}

/* ---------------- AUTH ---------------- */

function initAuthPage() {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const authTitle = document.getElementById("authTitle");

  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    authTitle.textContent = "Login";
    clearMessage();
  });

  registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    authTitle.textContent = "Register";
    clearMessage();
  });

  loginForm.addEventListener("submit", loginUser);
  registerForm.addEventListener("submit", registerUser);
}

function clearMessage() {
  const msg = document.getElementById("authMessage");
  if (msg) {
    msg.textContent = "";
    msg.style.color = "";
  }
}

function showAuthMessage(text, color = "red") {
  const msg = document.getElementById("authMessage");
  msg.textContent = text;
  msg.style.color = color;
}

async function registerUser(e) {
  e.preventDefault();

  const button = e.target.querySelector("button[type='submit']");
  setButtonLoading(button, true, "Create Account");

  const fullName = document.getElementById("regName").value.trim();
  const userId = document.getElementById("regUserId").value.trim().toUpperCase();
  const phone = document.getElementById("regPhone").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const userType = document.getElementById("regUserType").value;

  try {
    if (!fullName || !userId || !phone || !password || !confirmPassword || !userType) {
      throw new Error("Please fill all fields.");
    }

    if (!/^[A-Z0-9_-]{3,30}$/.test(userId)) {
      throw new Error("User ID must contain only letters, numbers, underscore or hyphen.");
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      throw new Error("Phone number must be exactly 10 digits.");
    }

    if (password.length < 8) {
      throw new Error("Password must contain at least 8 characters.");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    const { data: existingUser, error: checkError } = await supabaseClient
      .from("profiles")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingUser) {
      throw new Error("This User ID already exists. Please login.");
    }

    const newUser = {
      user_id: userId,
      full_name: fullName,
      phone,
      password,
      user_type: userType,
      preferred_language: localStorage.getItem(LANG_KEY) || "en",
      dark_mode: localStorage.getItem(DARK_KEY) === "true"
    };

    const { data: createdUser, error } = await supabaseClient
      .from("profiles")
      .insert(newUser)
      .select()
      .single();

    if (error) throw error;

    setCurrentUser(createdUser);
    showAuthMessage("Account created successfully. Redirecting...", "green");

    setTimeout(() => {
      if (createdUser.user_type === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "lost-dashboard.html";
      }
    }, 900);

  } catch (error) {
    showAuthMessage(error.message, "red");
    setButtonLoading(button, false, "Create Account");
  }
}

async function loginUser(e) {
  e.preventDefault();

  const button = e.target.querySelector("button[type='submit']");
  setButtonLoading(button, true, "Login");

  const userId = document.getElementById("loginUserId").value.trim().toUpperCase();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    if (!userId || !password) {
      throw new Error("Please enter User ID and password.");
    }

    const { data: user, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      throw new Error("Account not found. Please register first.");
    }

    if (user.password !== password) {
      throw new Error("Wrong password.");
    }

    setCurrentUser(user);
    showAuthMessage("Login successful. Redirecting...", "green");

    setTimeout(() => {
      if (user.user_type === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "lost-dashboard.html";
      }
    }, 700);

  } catch (error) {
    showAuthMessage(error.message, "red");
    setButtonLoading(button, false, "Login");
  }
}

/* ---------------- FETCH ---------------- */

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

async function fetchUsers() {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    alert("Error loading users: " + error.message);
    return [];
  }

  return data || [];
}

async function fetchComplaints() {
  const { data, error } = await supabaseClient
    .from("complaints")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    alert("Error loading complaints: " + error.message);
    return [];
  }

  return data || [];
}

/* ---------------- LOST DASHBOARD ---------------- */

async function initLostDashboard() {
  const user = requireLogin();
  if (!user) return;

  document.getElementById("searchInput").addEventListener("input", renderLostItems);
  document.getElementById("categoryFilter").addEventListener("change", renderLostItems);
  document.getElementById("locationFilter").addEventListener("input", renderLostItems);
  document.getElementById("dateFilter").addEventListener("change", renderLostItems);

  await renderLostItems();
}

async function renderLostItems() {
  const grid = document.getElementById("itemsGrid");
  grid.innerHTML = `<div class="empty">Loading items...</div>`;

  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const location = document.getElementById("locationFilter").value.toLowerCase();
  const date = document.getElementById("dateFilter").value;

  let items = await fetchItems();

  items = items.filter(item =>
    item.admin_status === "Approved" &&
    item.status !== "Returned"
  );

  items = items.filter(item => {
    const text = `${item.title} ${item.category} ${item.description} ${item.location_name}`.toLowerCase();

    return (
      text.includes(search) &&
      (category === "" || item.category === category) &&
      (location === "" || (item.location_name || "").toLowerCase().includes(location)) &&
      (date === "" || item.found_date === date)
    );
  });

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty">No matching items available.</div>`;
    return;
  }

  grid.innerHTML = items.map(item => createItemCard(item, true)).join("");
}

/* ---------------- FOUND DASHBOARD ---------------- */

async function initFoundDashboard() {
  const user = requireLogin();
  if (!user) return;

  await renderFoundDashboard(user);
}

async function renderFoundDashboard(user) {
  const items = await fetchItems();
  const claims = await fetchClaims();

  const myItems = items.filter(item => item.reporter_id === user.user_id);
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

  const { error } = await supabaseClient
    .from("claims")
    .update({ status })
    .eq("id", claimId);

  if (error) {
    alert(error.message);
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
  location.reload();
}

/* ---------------- UPLOAD ---------------- */

function initUploadPage() {
  const user = requireLogin();
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
    const message = document.getElementById("uploadMessage");

    setButtonLoading(submitBtn, true, "Submit Item");

    try {
      const itemTypeElement = document.getElementById("itemType");

      const itemType = itemTypeElement ? itemTypeElement.value : "found";
      const title = document.getElementById("itemName").value.trim();
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value.trim();
      const locationName = document.getElementById("locationName").value.trim();
      const date = document.getElementById("date").value;
      const contact = document.getElementById("contact").value.trim();
      const latitude = document.getElementById("latitude").value;
      const longitude = document.getElementById("longitude").value;
      const mapsLink = document.getElementById("mapsLink").value.trim();

      let imageUrl = createPlaceholderImage(category);

      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const safeId = user.user_id.replace(/[^A-Za-z0-9]/g, "");
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
        item_type: itemType,
        title,
        category,
        description,
        found_date: date,
        location_name: locationName,
        latitude,
        longitude,
        maps_link: mapsLink,
        contact_number: contact,
        image_url: imageUrl,
        reporter_id: user.user_id,
        reporter_name: user.full_name,
        status: "Pending Approval",
        admin_status: "Pending"
      };

      const { error } = await supabaseClient
        .from("items")
        .insert(newItem);

      if (error) throw error;

      message.textContent = "Item submitted. Waiting for admin approval.";
      message.style.color = "green";

      setTimeout(() => {
        window.location.href = "found-dashboard.html";
      }, 1200);

    } catch (error) {
      alert("Upload failed: " + error.message);
      setButtonLoading(submitBtn, false, "Submit Item");
    }
  });
}

function getCurrentLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported in this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const link = `https://www.google.com/maps?q=${lat},${lon}`;

      document.getElementById("latitude").value = lat;
      document.getElementById("longitude").value = lon;
      document.getElementById("mapsLink").value = link;

      alert("Location captured successfully.");
    },
    () => {
      alert("Location permission denied or unavailable.");
    }
  );
}

/* ---------------- ITEM DETAILS ---------------- */

async function initItemDetails() {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const itemId = new URLSearchParams(window.location.search).get("id");
  const detailsBox = document.getElementById("detailsBox");
  const claimSection = document.getElementById("claimSection");

  const { data: item, error } = await supabaseClient
    .from("items")
    .select("*")
    .eq("id", itemId)
    .single();

  if (error || !item) {
    detailsBox.innerHTML = `<div class="empty">Item not found.</div>`;
    claimSection.style.display = "none";
    return;
  }

  const statusClass = getStatusClass(item.status);

  detailsBox.innerHTML = `
    <img src="${escapeHTML(item.image_url)}" alt="${escapeHTML(item.title)}">

    <div class="details-info">
      <span class="badge">${escapeHTML(item.item_type || "found")}</span>
      <span class="badge">${escapeHTML(item.category)}</span>
      <span class="badge ${statusClass}">${escapeHTML(item.status)}</span>

      <h2>${escapeHTML(item.title)}</h2>

      <p><b>Description:</b> ${escapeHTML(item.description)}</p>
      <p><b>Location:</b> ${escapeHTML(item.location_name)}</p>
      <p><b>Date:</b> ${escapeHTML(item.found_date)}</p>
      <p><b>Reporter Name:</b> ${escapeHTML(item.reporter_name)}</p>
      <p><b>Reporter ID:</b> ${escapeHTML(item.reporter_id)}</p>
      <p><b>Contact:</b> ${escapeHTML(item.contact_number)}</p>
      ${
        item.maps_link
        ? `<p><a class="btn secondary" target="_blank" href="${escapeHTML(item.maps_link)}">Open Google Maps Location</a></p>`
        : ""
      }
    </div>
  `;

  if (item.status === "Returned" || user.user_id === item.reporter_id) {
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
           c.claimant_id === user.user_id &&
           c.status === "Pending"
    );

    if (alreadyClaimed) {
      document.getElementById("claimMessage").textContent =
        "You already sent a pending request for this item.";
      document.getElementById("claimMessage").style.color = "red";
      return;
    }

    const newClaim = {
      item_id: item.id,
      claimant_id: user.user_id,
      claimant_name: user.full_name,
      proof,
      status: "Pending"
    };

    const { error: claimError } = await supabaseClient
      .from("claims")
      .insert(newClaim);

    if (claimError) {
      alert("Request failed: " + claimError.message);
      return;
    }

    await supabaseClient
      .from("items")
      .update({ status: "Claim Pending" })
      .eq("id", item.id);

    document.getElementById("claimMessage").textContent =
      "Request sent successfully.";
    document.getElementById("claimMessage").style.color = "green";

    claimForm.reset();
  });
}

/* ---------------- COMPLAINTS ---------------- */

async function initComplaints() {
  const user = requireLogin();
  if (!user) return;

  document.getElementById("complaintForm").addEventListener("submit", createComplaint);
  document.getElementById("replyForm").addEventListener("submit", sendUserReply);

  await renderUserComplaints();
}

async function createComplaint(e) {
  e.preventDefault();

  const user = getCurrentUser();
  const subject = document.getElementById("complaintSubject").value.trim();
  const message = document.getElementById("complaintMessageInput").value.trim();

  const { data: complaint, error } = await supabaseClient
    .from("complaints")
    .insert({
      user_id: user.user_id,
      user_name: user.full_name,
      subject,
      status: "Open"
    })
    .select()
    .single();

  if (error) {
    alert(error.message);
    return;
  }

  await supabaseClient.from("complaint_messages").insert({
    complaint_id: complaint.id,
    sender_id: user.user_id,
    sender_name: user.full_name,
    sender_role: user.user_type,
    message
  });

  e.target.reset();
  await renderUserComplaints();
}

async function renderUserComplaints() {
  const user = getCurrentUser();
  const list = document.getElementById("complaintsList");

  const { data } = await supabaseClient
    .from("complaints")
    .select("*")
    .eq("user_id", user.user_id)
    .order("created_at", { ascending: false });

  if (!data || data.length === 0) {
    list.innerHTML = `<div class="empty">No complaints yet.</div>`;
    return;
  }

  list.innerHTML = data.map(c => `
    <div class="claim-card" onclick="openComplaint(${c.id})">
      <h4>${escapeHTML(c.subject)}</h4>
      <p>Status: ${escapeHTML(c.status)}</p>
    </div>
  `).join("");
}

async function openComplaint(id) {
  selectedComplaintId = id;

  const { data } = await supabaseClient
    .from("complaint_messages")
    .select("*")
    .eq("complaint_id", id)
    .order("created_at", { ascending: true });

  const box = document.getElementById("chatMessages");

  box.innerHTML = data.map(m => `
    <div class="chat-message ${m.sender_role === "admin" ? "chat-admin" : "chat-user"}">
      <b>${escapeHTML(m.sender_name)}:</b>
      <p>${escapeHTML(m.message)}</p>
    </div>
  `).join("");
}

async function sendUserReply(e) {
  e.preventDefault();

  if (!selectedComplaintId) {
    alert("Select a complaint first.");
    return;
  }

  const user = getCurrentUser();
  const text = document.getElementById("replyText").value.trim();

  if (!text) return;

  await supabaseClient.from("complaint_messages").insert({
    complaint_id: selectedComplaintId,
    sender_id: user.user_id,
    sender_name: user.full_name,
    sender_role: user.user_type,
    message: text
  });

  document.getElementById("replyText").value = "";
  await openComplaint(selectedComplaintId);
}

/* ---------------- ADMIN ---------------- */

async function initAdminDashboard() {
  const admin = requireAdmin();
  if (!admin) return;

  const users = await fetchUsers();
  const items = await fetchItems();
  const claims = await fetchClaims();
  const complaints = await fetchComplaints();

  document.getElementById("totalUsers").textContent = users.length;
  document.getElementById("totalItems").textContent = items.length;
  document.getElementById("pendingItems").textContent =
    items.filter(i => i.admin_status === "Pending").length;
  document.getElementById("totalClaims").textContent = claims.length;
  document.getElementById("openComplaints").textContent =
    complaints.filter(c => c.status === "Open").length;
  document.getElementById("returnedItems").textContent =
    items.filter(i => i.status === "Returned").length;
}

async function initAdminUsers() {
  const admin = requireAdmin();
  if (!admin) return;

  const users = await fetchUsers();
  const list = document.getElementById("adminUsersList");

  list.innerHTML = users.map(u => `
    <div class="admin-row">
      <h4>${escapeHTML(u.full_name)}</h4>
      <p><b>ID:</b> ${escapeHTML(u.user_id)}</p>
      <p><b>Type:</b> ${escapeHTML(u.user_type)}</p>
      <p><b>Phone:</b> ${escapeHTML(u.phone)}</p>
    </div>
  `).join("");
}

async function initAdminItems() {
  const admin = requireAdmin();
  if (!admin) return;

  const items = await fetchItems();
  const grid = document.getElementById("adminItemsGrid");

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty">No uploaded items yet.</div>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="item-card">
      <img src="${escapeHTML(item.image_url)}" alt="${escapeHTML(item.title)}">
      <div class="item-content">
        <span class="badge">${escapeHTML(item.item_type || "found")}</span>
        <span class="badge">${escapeHTML(item.category)}</span>
        <span class="badge ${getStatusClass(item.status)}">${escapeHTML(item.status)}</span>

        <h3>${escapeHTML(item.title)}</h3>
        <p><b>Reporter:</b> ${escapeHTML(item.reporter_name)}</p>
        <p><b>Location:</b> ${escapeHTML(item.location_name)}</p>
        <p><b>Admin Status:</b> ${escapeHTML(item.admin_status)}</p>

        <div class="card-actions">
          <button class="btn accept" onclick="approveItem(${item.id})">Approve</button>
          <button class="btn reject" onclick="rejectItem(${item.id})">Reject</button>
        </div>

        <button class="btn secondary full" onclick="deleteItem(${item.id})">Delete</button>
      </div>
    </div>
  `).join("");
}

async function approveItem(id) {
  await supabaseClient
    .from("items")
    .update({
      admin_status: "Approved",
      status: "Available"
    })
    .eq("id", id);

  location.reload();
}

async function rejectItem(id) {
  await supabaseClient
    .from("items")
    .update({
      admin_status: "Rejected",
      status: "Rejected"
    })
    .eq("id", id);

  location.reload();
}

async function deleteItem(id) {
  const confirmDelete = confirm("Delete this item permanently?");
  if (!confirmDelete) return;

  await supabaseClient
    .from("items")
    .delete()
    .eq("id", id);

  location.reload();
}

async function initAdminComplaints() {
  const admin = requireAdmin();
  if (!admin) return;

  document.getElementById("adminReplyForm").addEventListener("submit", sendAdminReply);

  await renderAdminComplaints();
}

async function renderAdminComplaints() {
  const complaints = await fetchComplaints();
  const list = document.getElementById("adminComplaintsList");

  if (complaints.length === 0) {
    list.innerHTML = `<div class="empty">No complaints.</div>`;
    return;
  }

  list.innerHTML = complaints.map(c => `
    <div class="claim-card" onclick="openAdminComplaint(${c.id})">
      <h4>${escapeHTML(c.subject)}</h4>
      <p><b>User:</b> ${escapeHTML(c.user_name)} (${escapeHTML(c.user_id)})</p>
      <p><b>Status:</b> ${escapeHTML(c.status)}</p>
      <button class="btn secondary" onclick="closeComplaint(event, ${c.id})">Close</button>
    </div>
  `).join("");
}

async function openAdminComplaint(id) {
  selectedAdminComplaintId = id;

  const { data } = await supabaseClient
    .from("complaint_messages")
    .select("*")
    .eq("complaint_id", id)
    .order("created_at", { ascending: true });

  const box = document.getElementById("adminChatMessages");

  box.innerHTML = data.map(m => `
    <div class="chat-message ${m.sender_role === "admin" ? "chat-admin" : "chat-user"}">
      <b>${escapeHTML(m.sender_name)}:</b>
      <p>${escapeHTML(m.message)}</p>
    </div>
  `).join("");
}

async function sendAdminReply(e) {
  e.preventDefault();

  if (!selectedAdminComplaintId) {
    alert("Select a complaint first.");
    return;
  }

  const admin = getCurrentUser();
  const text = document.getElementById("adminReplyText").value.trim();

  if (!text) return;

  await supabaseClient.from("complaint_messages").insert({
    complaint_id: selectedAdminComplaintId,
    sender_id: admin.user_id,
    sender_name: admin.full_name,
    sender_role: "admin",
    message: text
  });

  document.getElementById("adminReplyText").value = "";
  await openAdminComplaint(selectedAdminComplaintId);
}

async function closeComplaint(event, id) {
  event.stopPropagation();

  await supabaseClient
    .from("complaints")
    .update({ status: "Closed" })
    .eq("id", id);

  location.reload();
}

/* ---------------- CARD ---------------- */

function createItemCard(item, showClaimButton) {
  const statusClass = getStatusClass(item.status);

  return `
    <div class="item-card">
      <img src="${escapeHTML(item.image_url)}" alt="${escapeHTML(item.title)}">

      <div class="item-content">
        <span class="badge">${escapeHTML(item.item_type || "found")}</span>
        <span class="badge">${escapeHTML(item.category)}</span>
        <span class="badge ${statusClass}">${escapeHTML(item.status)}</span>

        <h3>${escapeHTML(item.title)}</h3>
        <p><b>Location:</b> ${escapeHTML(item.location_name)}</p>
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