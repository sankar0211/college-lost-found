const CURRENT_USER_KEY = "clf_current_user";
const LANG_KEY = "clf_language";
const DARK_KEY = "clf_dark_mode";

let selectedComplaintId = null;
let selectedAdminComplaintId = null;
let editingItemId = null;
let editingOldImageUrl = "";

const translations = {
  en: {
    appName: "Campus Lost & Found",
    language: "Language",
    login: "Login",
    register: "Register",
    backHome: "← Back to Home",
    loginNote: "Use your User ID and password.",
    whatDo: "What do you want to do?",
    searchAction: "Search Items",
    reportLost: "Report Lost Item",
    reportFound: "Report Found Item",
    tag: "College Utility Website",
    heroTitle: "Find Lost Items. Report Found Items.",
    heroText: "A campus portal for students, faculty, parents, visitors and public users to report, search and claim lost items.",
    getStarted: "Get Started",
    reportNow: "Report / Search Item",
    lostBtn: "I Lost an Item",
    foundBtn: "I Found an Item",
    searchItems: "Search Items",
    searchText: "Search lost and found items by name, category, location and date.",
    uploadImages: "Upload Images",
    uploadText: "Upload from files or capture directly using mobile camera.",
    claimRequests: "Claim Requests",
    claimText: "Send proof and wait for reporter or admin approval.",
    userDashboard: "User Dashboard",
    lostDashboard: "User Dashboard",
    foundDashboard: "My Reports Dashboard",
    dashboard: "Dashboard",
    logout: "Logout",
    messages: "Messages",
    uploadTitle: "Upload Item",
    editTitle: "Edit Uploaded Request",
    itemDetails: "Item Details",
    itemType: "Item Type",
    foundItem: "Found Item",
    lostItem: "Lost Item",
    itemName: "Item Name",
    category: "Category",
    description: "Description",
    locationName: "Location Name",
    useLocation: "Use My Current Location",
    mapsLink: "Google Maps Link",
    date: "Date",
    contact: "Contact Number",
    imageUpload: "Upload Image / Capture Using Camera",
    submitItem: "Submit Item",
    updateItem: "Update Request",
    imagePreview: "Image Preview",
    cameraNote: "Mobile users can capture item photo directly using camera.",
    uploadFoundItem: "Report an Item",
    uploadFoundText: "Upload image, location, map link and contact details.",
    uploadItem: "Upload Item",
    availableItems: "Available Items",
    myUploads: "My Uploads",
    totalUploads: "Total Uploads",
    pendingRequests: "Pending Requests",
    claimThisItem: "Claim This Item",
    proofText: "Enter proof to show that this item belongs to you.",
    sendClaim: "Send Claim Request",
    editRequest: "Edit Request",
    fullName: "Full Name",
    userId: "User ID / Register No / Staff ID / Visitor ID",
    phone: "Phone Number",
    password: "Password",
    userType: "User Type",
    selectUserType: "Select User Type",
    student: "Student",
    faculty: "Faculty",
    assistantProfessor: "Assistant Professor",
    professor: "Professor",
    parent: "Parent",
    visitor: "Visitor",
    staff: "Security / Staff",
    publicUser: "General Public",
    createPassword: "Create Password",
    confirmPassword: "Confirm Password",
    createAccount: "Create Account",
    selectCategory: "Select Category",
    allCategories: "All Categories",
    loadingItem: "Loading item details...",
    raiseComplaint: "Raise Complaint",
    subject: "Subject",
    message: "Message",
    sendComplaint: "Send Complaint",
    myComplaints: "My Complaints",
    chatWithAdmin: "Chat With Admin",
    sendReply: "Send Reply",
    adminDashboard: "Admin Dashboard",
    manageUsers: "Users",
    manageItems: "Items",
    complaints: "Complaints",
    totalUsers: "Total Users",
    totalItems: "Total Items",
    pendingItems: "Pending Items",
    totalClaims: "Total Claims",
    openComplaints: "Open Complaints",
    returnedItems: "Returned Items",
    allUsers: "All Registered Users",
    uploadedItems: "Uploaded Items",
    allComplaints: "All Complaints",
    chatWithUser: "Chat With User",
    userIdPlaceholder: "Example: 24I355",
    passwordPlaceholder: "Enter password",
    namePlaceholder: "Enter your name",
    phonePlaceholder: "Example: 9876543210",
    createPasswordPlaceholder: "Minimum 8 characters",
    confirmPasswordPlaceholder: "Re-enter password",
    searchPlaceholder: "Search by item name...",
    locationPlaceholder: "Location",
    itemNamePlaceholder: "Example: Black Wallet",
    descriptionPlaceholder: "Mention color, brand, unique marks...",
    locationNamePlaceholder: "Example: Library entrance",
    mapsPlaceholder: "Paste Google Maps link or use current location",
    proofPlaceholder: "Example: My calculator has a blue sticker on the back.",
    subjectPlaceholder: "Example: Wrong item approval",
    messagePlaceholder: "Describe your issue...",
    replyPlaceholder: "Type your reply..."
  },

  ta: {
    appName: "வளாக இழந்தது & கண்டது",
    language: "மொழி",
    login: "உள்நுழை",
    register: "பதிவு",
    backHome: "← முகப்பிற்கு செல்",
    loginNote: "உங்கள் பயனர் ID மற்றும் கடவுச்சொல்லை பயன்படுத்தவும்.",
    whatDo: "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
    searchAction: "பொருட்களை தேடு",
    reportLost: "இழந்த பொருளை பதிவு செய்",
    reportFound: "கண்ட பொருளை பதிவு செய்",
    tag: "கல்லூரி பயன்பாட்டு இணையதளம்",
    heroTitle: "இழந்த பொருட்களை கண்டுபிடிக்கவும். கண்ட பொருட்களை பதிவிடவும்.",
    heroText: "மாணவர்கள், ஆசிரியர்கள், பெற்றோர், வருகையாளர்கள் மற்றும் பொதுமக்கள் பயன்படுத்தும் வளாக பொருள் தேடல் தளம்.",
    getStarted: "தொடங்கு",
    reportNow: "பதிவு / தேடல்",
    lostBtn: "நான் பொருள் இழந்தேன்",
    foundBtn: "நான் பொருள் கண்டேன்",
    searchItems: "பொருட்களை தேடு",
    searchText: "பெயர், வகை, இடம், தேதி மூலம் தேடலாம்.",
    uploadImages: "படங்களை பதிவேற்று",
    uploadText: "கோப்பிலிருந்து அல்லது மொபைல் கேமராவால் பதிவேற்றலாம்.",
    claimRequests: "உரிமை கோரிக்கை",
    claimText: "ஆதாரம் அனுப்பி அனுமதி பெறவும்.",
    userDashboard: "பயனர் பலகை",
    lostDashboard: "பயனர் பலகை",
    foundDashboard: "என் பதிவுகள்",
    dashboard: "பலகை",
    logout: "வெளியேறு",
    messages: "செய்திகள்",
    uploadTitle: "பொருள் பதிவேற்று",
    editTitle: "பதிவை திருத்து",
    itemDetails: "பொருள் விவரங்கள்",
    itemType: "பொருள் வகை",
    foundItem: "கண்ட பொருள்",
    lostItem: "இழந்த பொருள்",
    itemName: "பொருள் பெயர்",
    category: "வகை",
    description: "விளக்கம்",
    locationName: "இடத்தின் பெயர்",
    useLocation: "என் தற்போதைய இடத்தை பயன்படுத்து",
    mapsLink: "Google Maps இணைப்பு",
    date: "தேதி",
    contact: "தொடர்பு எண்",
    imageUpload: "படம் பதிவேற்று / கேமராவில் எடு",
    submitItem: "பொருளை சமர்ப்பி",
    updateItem: "பதிவை புதுப்பி",
    imagePreview: "பட முன்னோட்டம்",
    cameraNote: "மொபைல் பயனர்கள் கேமரா மூலம் நேரடியாக படம் எடுக்கலாம்.",
    uploadFoundItem: "பொருளை பதிவு செய்",
    uploadFoundText: "படம், இடம், வரைபட இணைப்பு மற்றும் தொடர்பு விவரங்களை சேர்க்கவும்.",
    uploadItem: "பதிவேற்று",
    availableItems: "கிடைக்கும் பொருட்கள்",
    myUploads: "என் பதிவுகள்",
    totalUploads: "மொத்த பதிவுகள்",
    pendingRequests: "நிலுவையில் உள்ள கோரிக்கைகள்",
    claimThisItem: "இந்த பொருளை கோரு",
    proofText: "இந்த பொருள் உங்களுடையது என்பதை நிரூபிக்கும் ஆதாரம் எழுதவும்.",
    sendClaim: "கோரிக்கை அனுப்பு",
    editRequest: "திருத்து",
    fullName: "முழுப் பெயர்",
    userId: "பயனர் ID / பதிவு எண் / பணியாளர் ID / பார்வையாளர் ID",
    phone: "தொலைபேசி எண்",
    password: "கடவுச்சொல்",
    userType: "பயனர் வகை",
    selectUserType: "பயனர் வகையை தேர்வு செய்க",
    student: "மாணவர்",
    faculty: "ஆசிரியர்",
    assistantProfessor: "உதவி பேராசிரியர்",
    professor: "பேராசிரியர்",
    parent: "பெற்றோர்",
    visitor: "பார்வையாளர்",
    staff: "பாதுகாப்பு / பணியாளர்",
    publicUser: "பொது பயனர்",
    createPassword: "கடவுச்சொல் உருவாக்கு",
    confirmPassword: "கடவுச்சொல் உறுதி செய்",
    createAccount: "கணக்கு உருவாக்கு",
    selectCategory: "வகையை தேர்வு செய்க",
    allCategories: "அனைத்து வகைகள்",
    loadingItem: "பொருள் விவரங்கள் ஏற்றப்படுகிறது...",
    raiseComplaint: "புகார் அளி",
    subject: "தலைப்பு",
    message: "செய்தி",
    sendComplaint: "புகார் அனுப்பு",
    myComplaints: "என் புகார்கள்",
    chatWithAdmin: "நிர்வாகியுடன் உரையாடு",
    sendReply: "பதில் அனுப்பு",
    adminDashboard: "நிர்வாக பலகை",
    manageUsers: "பயனர்கள்",
    manageItems: "பொருட்கள்",
    complaints: "புகார்கள்",
    totalUsers: "மொத்த பயனர்கள்",
    totalItems: "மொத்த பொருட்கள்",
    pendingItems: "நிலுவை பொருட்கள்",
    totalClaims: "மொத்த கோரிக்கைகள்",
    openComplaints: "திறந்த புகார்கள்",
    returnedItems: "திருப்பி கொடுக்கப்பட்டவை",
    allUsers: "அனைத்து பயனர்கள்",
    uploadedItems: "பதிவேற்றப்பட்ட பொருட்கள்",
    allComplaints: "அனைத்து புகார்கள்",
    chatWithUser: "பயனருடன் உரையாடு",
    userIdPlaceholder: "உதாரணம்: 24I355",
    passwordPlaceholder: "கடவுச்சொல் உள்ளிடுக",
    namePlaceholder: "உங்கள் பெயரை உள்ளிடுக",
    phonePlaceholder: "உதாரணம்: 9876543210",
    createPasswordPlaceholder: "குறைந்தது 8 எழுத்துகள்",
    confirmPasswordPlaceholder: "மீண்டும் கடவுச்சொல் உள்ளிடுக",
    searchPlaceholder: "பொருள் பெயரைத் தேடு...",
    locationPlaceholder: "இடம்",
    itemNamePlaceholder: "உதாரணம்: கருப்பு பணப்பை",
    descriptionPlaceholder: "நிறம், பிராண்ட், தனிப்பட்ட அடையாளங்களை குறிப்பிடவும்...",
    locationNamePlaceholder: "உதாரணம்: நூலக நுழைவாயில்",
    mapsPlaceholder: "Google Maps இணைப்பை ஒட்டவும்",
    proofPlaceholder: "உதாரணம்: என் கால்குலேட்டரின் பின்புறம் நீல ஸ்டிக்கர் உள்ளது.",
    subjectPlaceholder: "உதாரணம்: தவறான பொருள் அனுமதி",
    messagePlaceholder: "உங்கள் பிரச்சனையை விவரிக்கவும்...",
    replyPlaceholder: "உங்கள் பதிலை தட்டச்சு செய்யவும்..."
  }
};

["hi", "te", "ml", "kn"].forEach((lang) => {
  translations[lang] = { ...translations.en, ...translations[lang] };
});

document.addEventListener("DOMContentLoaded", async () => {
  applyDarkMode();
  setupThemeToggle();
  removeDuplicateLanguageControls();
  injectLanguageSwitcher();
  setupLanguageMenu();
  applyLanguage();
  setupLogout();
  showUserInfo();

  const page = document.body.dataset.page;

  if (page === "home") initHome();
  if (page === "login") initAuthPage();
  if (page === "lostDashboard") await initLostDashboard();
  if (page === "foundDashboard") await initFoundDashboard();
  if (page === "upload") await initUploadPage();
  if (page === "itemDetails") await initItemDetails();
  if (page === "complaints") await initComplaints();
  if (page === "adminDashboard") await initAdminDashboard();
  if (page === "adminUsers") await initAdminUsers();
  if (page === "adminItems") await initAdminItems();
  if (page === "adminComplaints") await initAdminComplaints();
});

/* LANGUAGE */

function initHome() {
  const lang = localStorage.getItem(LANG_KEY);
  const screen = document.getElementById("languageScreen");
  if (!lang && screen) screen.style.display = "flex";
}

function removeDuplicateLanguageControls() {
  const oldSelect = document.getElementById("languageSelect");
  if (oldSelect) oldSelect.remove();

  document.querySelectorAll(".custom-language").forEach((el, index) => {
    if (index > 0) el.remove();
  });
}

function injectLanguageSwitcher() {
  const navActions = document.querySelector(".nav-actions");
  if (!navActions) return;

  if (document.getElementById("languageBtn")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "custom-language";

  wrapper.innerHTML = `
    <button type="button" id="languageBtn">🌐 <span data-i18n="language">Language</span></button>
    <div id="languageMenu" class="language-menu">
      <button type="button" data-lang="en">English</button>
      <button type="button" data-lang="ta">தமிழ்</button>
      <button type="button" data-lang="hi">हिन्दी</button>
      <button type="button" data-lang="te">తెలుగు</button>
      <button type="button" data-lang="ml">മലയാളം</button>
      <button type="button" data-lang="kn">ಕನ್ನಡ</button>
    </div>
  `;

  navActions.prepend(wrapper);
}

function setupLanguageMenu() {
  const btn = document.getElementById("languageBtn");
  const menu = document.getElementById("languageMenu");

  if (!btn || !menu) return;

  btn.onclick = (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  };

  menu.querySelectorAll("[data-lang]").forEach((button) => {
    button.onclick = (e) => {
      e.stopPropagation();
      setLanguage(button.dataset.lang);
    };
  });

  document.addEventListener("click", () => {
    menu.classList.remove("open");
  });
}

function setLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang);

  const user = getCurrentUser();
  if (user) {
    user.preferred_language = lang;
    setCurrentUser(user);
    supabaseClient
      .from("profiles")
      .update({ preferred_language: lang })
      .eq("user_id", user.user_id);
  }

  const screen = document.getElementById("languageScreen");
  if (screen) screen.style.display = "none";

  const menu = document.getElementById("languageMenu");
  if (menu) menu.classList.remove("open");

  applyLanguage();
}

function t(key) {
  const lang = localStorage.getItem(LANG_KEY) || "en";
  return translations[lang]?.[key] || translations.en[key] || key;
}

function applyLanguage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });

  translateDynamicPageText();
}

function translateDynamicPageText() {
  if (document.body.dataset.page === "upload") {
    const title = document.querySelector("h2");
    const submit = document.getElementById("submitItemBtn");

    if (title) title.textContent = editingItemId ? t("editTitle") : t("uploadTitle");
    if (submit) submit.textContent = editingItemId ? t("updateItem") : t("submitItem");
  }
}

/* DARK MODE */

function toggleDarkMode() {
  const current = localStorage.getItem(DARK_KEY) === "true";
  localStorage.setItem(DARK_KEY, String(!current));
  applyDarkMode();
  setupThemeToggle();
}

function applyDarkMode() {
  document.body.classList.toggle("dark", localStorage.getItem(DARK_KEY) === "true");
}

function setupThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.checked = localStorage.getItem(DARK_KEY) === "true";

  toggle.onchange = () => {
    localStorage.setItem(DARK_KEY, String(toggle.checked));
    applyDarkMode();

    const user = getCurrentUser();
    if (user) {
      user.dark_mode = toggle.checked;
      setCurrentUser(user);
      supabaseClient
        .from("profiles")
        .update({ dark_mode: toggle.checked })
        .eq("user_id", user.user_id);
    }
  };
}

/* COMMON */

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
    userInfo.textContent = `${user.full_name} | ID: ${user.user_id} | Type: ${user.user_type}`;
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

  window.location.href = user.user_type === "admin"
    ? "admin-dashboard.html"
    : "lost-dashboard.html";
}

function getNextActionUrl() {
  const selected = document.querySelector('input[name="nextAction"]:checked');
  const action = selected ? selected.value : "browse";

  if (action === "lost") return "upload.html?type=lost";
  if (action === "found") return "upload.html?type=found";
  return "lost-dashboard.html";
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
    button.textContent = text;
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

/* AUTH */

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
    if (authTitle) authTitle.textContent = t("login");
    clearMessage();
  });

  registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    if (authTitle) authTitle.textContent = t("register");
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
  setButtonLoading(button, true, t("createAccount"));

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
    if (existingUser) throw new Error("This User ID already exists. Please login.");

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
      window.location.href = createdUser.user_type === "admin"
        ? "admin-dashboard.html"
        : getNextActionUrl();
    }, 900);
  } catch (error) {
    showAuthMessage(error.message, "red");
    setButtonLoading(button, false, t("createAccount"));
  }
}

async function loginUser(e) {
  e.preventDefault();

  const button = e.target.querySelector("button[type='submit']");
  setButtonLoading(button, true, t("login"));

  const userId = document.getElementById("loginUserId").value.trim().toUpperCase();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    if (!userId || !password) throw new Error("Please enter User ID and password.");

    const { data: user, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    if (!user) throw new Error("Account not found. Please register first.");
    if (user.password !== password) throw new Error("Wrong password.");

    setCurrentUser(user);

    if (user.preferred_language) localStorage.setItem(LANG_KEY, user.preferred_language);
    if (typeof user.dark_mode === "boolean") localStorage.setItem(DARK_KEY, String(user.dark_mode));

    showAuthMessage("Login successful. Redirecting...", "green");

    setTimeout(() => {
      window.location.href = user.user_type === "admin"
        ? "admin-dashboard.html"
        : getNextActionUrl();
    }, 700);
  } catch (error) {
    showAuthMessage(error.message, "red");
    setButtonLoading(button, false, t("login"));
  }
}

/* FETCH */

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

/* LOST DASHBOARD */

async function initLostDashboard() {
  const user = requireLogin();
  if (!user) return;

  ["searchInput", "categoryFilter", "locationFilter", "dateFilter"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", renderLostItems);
      el.addEventListener("change", renderLostItems);
    }
  });

  await renderLostItems();
}

async function renderLostItems() {
  const grid = document.getElementById("itemsGrid");
  if (!grid) return;

  grid.innerHTML = `<div class="empty">Loading items...</div>`;

  const search = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const category = document.getElementById("categoryFilter")?.value || "";
  const location = (document.getElementById("locationFilter")?.value || "").toLowerCase();
  const date = document.getElementById("dateFilter")?.value || "";

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

  grid.innerHTML = items.length
    ? items.map(item => createItemCard(item, true)).join("")
    : `<div class="empty">No matching items available.</div>`;
}

/* FOUND DASHBOARD */

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

  if (document.getElementById("uploadCount")) document.getElementById("uploadCount").textContent = myItems.length;
  if (document.getElementById("claimCount")) document.getElementById("claimCount").textContent = myClaims.length;
  if (document.getElementById("pendingCount")) document.getElementById("pendingCount").textContent = pendingClaims.length;

  renderClaimsList(myClaims, items);
  renderMyUploadedItems(myItems);
}

function renderClaimsList(claims, items) {
  const claimsList = document.getElementById("claimsList");
  if (!claimsList) return;

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
            ? `<div class="claim-actions">
                <button class="btn accept" onclick="updateClaimStatus(${claim.id}, 'Accepted')">Accept</button>
                <button class="btn reject" onclick="updateClaimStatus(${claim.id}, 'Rejected')">Reject</button>
              </div>`
            : ""
        }
      </div>
    `;
  }).join("");
}

function renderMyUploadedItems(items) {
  const grid = document.getElementById("myItemsGrid");
  if (!grid) return;

  grid.innerHTML = items.length
    ? items.map(item => createItemCard(item, false)).join("")
    : `<div class="empty">You have not uploaded any item yet.</div>`;
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

/* UPLOAD + EDIT */

async function initUploadPage() {
  const user = requireLogin();
  if (!user) return;

  const uploadForm = document.getElementById("uploadForm");
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  const itemTypeElement = document.getElementById("itemType");

  const params = new URLSearchParams(window.location.search);
  const urlType = params.get("type");
  const editId = params.get("edit");

  if (itemTypeElement && (urlType === "lost" || urlType === "found")) {
    itemTypeElement.value = urlType;
  }

  if (editId) await loadItemForEdit(editId, user);

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

    const submitBtn = document.getElementById("submitItemBtn");
    const message = document.getElementById("uploadMessage");
    const buttonText = editingItemId ? t("updateItem") : t("submitItem");

    setButtonLoading(submitBtn, true, buttonText);

    try {
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

      let imageUrl = editingOldImageUrl || createPlaceholderImage(category);

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

        imageUrl = supabaseClient.storage
          .from("lost-found-images")
          .getPublicUrl(filePath).data.publicUrl;
      }

      const itemData = {
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

      if (editingItemId) {
        const { error } = await supabaseClient
          .from("items")
          .update(itemData)
          .eq("id", editingItemId)
          .eq("reporter_id", user.user_id);

        if (error) throw error;
        message.textContent = "Request updated. Waiting for admin approval again.";
      } else {
        const { error } = await supabaseClient
          .from("items")
          .insert(itemData);

        if (error) throw error;
        message.textContent = "Item submitted. Waiting for admin approval.";
      }

      message.style.color = "green";

      setTimeout(() => {
        window.location.href = "found-dashboard.html";
      }, 1200);

    } catch (error) {
      alert("Upload failed: " + error.message);
      setButtonLoading(submitBtn, false, buttonText);
    }
  });
}

async function loadItemForEdit(itemId, user) {
  const { data: item, error } = await supabaseClient
    .from("items")
    .select("*")
    .eq("id", itemId)
    .single();

  if (error || !item) {
    alert("Item not found.");
    window.location.href = "found-dashboard.html";
    return;
  }

  if (item.reporter_id !== user.user_id) {
    alert("You can edit only your own uploaded request.");
    window.location.href = "found-dashboard.html";
    return;
  }

  editingItemId = item.id;
  editingOldImageUrl = item.image_url || "";

  document.getElementById("itemType").value = item.item_type || "found";
  document.getElementById("itemName").value = item.title || "";
  document.getElementById("category").value = item.category || "";
  document.getElementById("description").value = item.description || "";
  document.getElementById("locationName").value = item.location_name || "";
  document.getElementById("date").value = item.found_date || "";
  document.getElementById("contact").value = item.contact_number || "";
  document.getElementById("latitude").value = item.latitude || "";
  document.getElementById("longitude").value = item.longitude || "";
  document.getElementById("mapsLink").value = item.maps_link || "";

  if (item.image_url) document.getElementById("imagePreview").src = item.image_url;

  applyLanguage();
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
    () => alert("Location permission denied or unavailable.")
  );
}

/* ITEM DETAILS */

async function initItemDetails() {
  const user = requireLogin();
  if (!user) return;

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
  const isOwner = user.user_id === item.reporter_id;

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
      ${item.maps_link ? `<p><a class="btn secondary" target="_blank" href="${escapeHTML(item.maps_link)}">Open Google Maps Location</a></p>` : ""}
      ${isOwner ? `<p><a class="btn primary" href="upload.html?edit=${encodeURIComponent(item.id)}">${t("editRequest")}</a></p>` : ""}
    </div>
  `;

  if (item.status === "Returned" || isOwner) {
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

    const { error: claimError } = await supabaseClient.from("claims").insert({
      item_id: item.id,
      claimant_id: user.user_id,
      claimant_name: user.full_name,
      proof,
      status: "Pending"
    });

    if (claimError) {
      alert("Request failed: " + claimError.message);
      return;
    }

    await supabaseClient.from("items").update({ status: "Claim Pending" }).eq("id", item.id);

    document.getElementById("claimMessage").textContent = "Request sent successfully.";
    document.getElementById("claimMessage").style.color = "green";
    claimForm.reset();
  });
}

/* COMPLAINTS */

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

  document.getElementById("chatMessages").innerHTML = data.map(m => `
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

/* ADMIN */

async function initAdminDashboard() {
  const admin = requireAdmin();
  if (!admin) return;

  const users = await fetchUsers();
  const items = await fetchItems();
  const claims = await fetchClaims();
  const complaints = await fetchComplaints();

  document.getElementById("totalUsers").textContent = users.length;
  document.getElementById("totalItems").textContent = items.length;
  document.getElementById("pendingItems").textContent = items.filter(i => i.admin_status === "Pending").length;
  document.getElementById("totalClaims").textContent = claims.length;
  document.getElementById("openComplaints").textContent = complaints.filter(c => c.status === "Open").length;
  document.getElementById("returnedItems").textContent = items.filter(i => i.status === "Returned").length;
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
  await supabaseClient.from("items").update({ admin_status: "Approved", status: "Available" }).eq("id", id);
  location.reload();
}

async function rejectItem(id) {
  await supabaseClient.from("items").update({ admin_status: "Rejected", status: "Rejected" }).eq("id", id);
  location.reload();
}

async function deleteItem(id) {
  if (!confirm("Delete this item permanently?")) return;
  await supabaseClient.from("items").delete().eq("id", id);
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

  document.getElementById("adminChatMessages").innerHTML = data.map(m => `
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
  await supabaseClient.from("complaints").update({ status: "Closed" }).eq("id", id);
  location.reload();
}

/* CARD */

function createItemCard(item, showClaimButton) {
  const statusClass = getStatusClass(item.status);
  const user = getCurrentUser();
  const isOwner = user && user.user_id === item.reporter_id;

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
            isOwner
              ? `<a class="btn secondary" href="upload.html?edit=${encodeURIComponent(item.id)}">${t("editRequest")}</a>`
              : showClaimButton
                ? `<a class="btn secondary" href="item-details.html?id=${encodeURIComponent(item.id)}">Claim</a>`
                : ""
          }
        </div>
      </div>
    </div>
  `;
}