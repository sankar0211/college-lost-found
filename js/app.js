const CURRENT_USER_KEY = "clf_current_user";
const LANG_KEY = "clf_language";
const DARK_KEY = "clf_dark_mode";

let selectedComplaintId = null;
let selectedAdminComplaintId = null;
let editingItemId = null;
let editingOldImageUrl = "";

/* ---------------- TRANSLATIONS ---------------- */

const translations = {
  en: {
    language: "Language",
    appName: "Campus Lost & Found",
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
    deleteUser: "Delete User",
    currentAdmin: "Current admin account",
    userDeleted: "User deleted successfully.",
    loginSuccess: "Login successful.",
    logoutSuccess: "Logout successful.",
    registerSuccess: "Registered successfully.",
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
    language: "மொழி",
    appName: "வளாக இழந்தது & கண்டது",
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
    searchItems: "பொருட்களை தேடு",
    searchText: "பெயர், வகை, இடம், தேதி மூலம் தேடலாம்.",
    uploadImages: "படங்களை பதிவேற்று",
    uploadText: "கோப்பிலிருந்து அல்லது மொபைல் கேமராவால் பதிவேற்றலாம்.",
    claimRequests: "உரிமை கோரிக்கை",
    claimText: "ஆதாரம் அனுப்பி அனுமதி பெறவும்.",
    userDashboard: "பயனர் பலகை",
    lostDashboard: "பயனர் பலகை",
    foundDashboard: "என் பதிவுகள் பலகை",
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
    deleteUser: "பயனரை நீக்கு",
    currentAdmin: "தற்போதைய நிர்வாக கணக்கு",
    userDeleted: "பயனர் வெற்றிகரமாக நீக்கப்பட்டார்.",
    loginSuccess: "உள்நுழைவு வெற்றிகரமாக முடிந்தது.",
    logoutSuccess: "வெளியேற்றம் வெற்றிகரமாக முடிந்தது.",
    registerSuccess: "பதிவு வெற்றிகரமாக முடிந்தது.",
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
    proofPlaceholder: "உதாரணம்: என் பொருளில் தனிப்பட்ட அடையாளம் உள்ளது.",
    subjectPlaceholder: "உதாரணம்: தவறான பொருள் அனுமதி",
    messagePlaceholder: "உங்கள் பிரச்சனையை விவரிக்கவும்...",
    replyPlaceholder: "உங்கள் பதிலை தட்டச்சு செய்யவும்..."
  },

  hi: {
    language: "भाषा",
    appName: "कैंपस खोया और पाया",
    login: "लॉगिन",
    register: "रजिस्टर",
    backHome: "← होम पर वापस जाएं",
    loginNote: "अपना यूज़र ID और पासवर्ड उपयोग करें।",
    whatDo: "आप क्या करना चाहते हैं?",
    searchAction: "वस्तु खोजें",
    reportLost: "खोई वस्तु रिपोर्ट करें",
    reportFound: "मिली वस्तु रिपोर्ट करें",
    tag: "कॉलेज उपयोगिता वेबसाइट",
    heroTitle: "खोई वस्तु खोजें। मिली वस्तु रिपोर्ट करें।",
    heroText: "छात्रों, शिक्षकों, अभिभावकों, आगंतुकों और सार्वजनिक उपयोगकर्ताओं के लिए कैंपस पोर्टल।",
    getStarted: "शुरू करें",
    reportNow: "रिपोर्ट / खोज",
    searchItems: "वस्तु खोजें",
    searchText: "नाम, श्रेणी, स्थान और तारीख से खोजें।",
    uploadImages: "चित्र अपलोड करें",
    uploadText: "फाइल से अपलोड करें या मोबाइल कैमरा से कैप्चर करें।",
    claimRequests: "क्लेम अनुरोध",
    claimText: "प्रमाण भेजें और स्वीकृति की प्रतीक्षा करें।",
    userDashboard: "यूज़र डैशबोर्ड",
    lostDashboard: "यूज़र डैशबोर्ड",
    foundDashboard: "मेरे रिपोर्ट डैशबोर्ड",
    dashboard: "डैशबोर्ड",
    logout: "लॉगआउट",
    messages: "संदेश",
    uploadTitle: "वस्तु अपलोड करें",
    editTitle: "अपलोड अनुरोध संपादित करें",
    itemDetails: "वस्तु विवरण",
    itemType: "वस्तु प्रकार",
    foundItem: "मिली वस्तु",
    lostItem: "खोई वस्तु",
    itemName: "वस्तु नाम",
    category: "श्रेणी",
    description: "विवरण",
    locationName: "स्थान नाम",
    useLocation: "मेरी वर्तमान लोकेशन उपयोग करें",
    mapsLink: "Google Maps लिंक",
    date: "तारीख",
    contact: "संपर्क नंबर",
    imageUpload: "चित्र अपलोड / कैमरा से कैप्चर करें",
    submitItem: "वस्तु सबमिट करें",
    updateItem: "अनुरोध अपडेट करें",
    imagePreview: "चित्र पूर्वावलोकन",
    cameraNote: "मोबाइल यूज़र सीधे कैमरा से फोटो ले सकते हैं।",
    uploadFoundItem: "वस्तु रिपोर्ट करें",
    uploadFoundText: "चित्र, स्थान, मैप लिंक और संपर्क जानकारी अपलोड करें।",
    uploadItem: "अपलोड करें",
    availableItems: "उपलब्ध वस्तुएं",
    myUploads: "मेरे अपलोड",
    totalUploads: "कुल अपलोड",
    pendingRequests: "लंबित अनुरोध",
    claimThisItem: "इस वस्तु पर दावा करें",
    proofText: "यह वस्तु आपकी है, इसका प्रमाण लिखें।",
    sendClaim: "क्लेम भेजें",
    editRequest: "संपादित करें",
    fullName: "पूरा नाम",
    userId: "यूज़र ID / रजिस्टर नंबर / स्टाफ ID / विज़िटर ID",
    phone: "फोन नंबर",
    password: "पासवर्ड",
    userType: "यूज़र प्रकार",
    selectUserType: "यूज़र प्रकार चुनें",
    student: "छात्र",
    faculty: "फैकल्टी",
    assistantProfessor: "असिस्टेंट प्रोफेसर",
    professor: "प्रोफेसर",
    parent: "अभिभावक",
    visitor: "विज़िटर",
    staff: "सुरक्षा / स्टाफ",
    publicUser: "सामान्य उपयोगकर्ता",
    createPassword: "पासवर्ड बनाएं",
    confirmPassword: "पासवर्ड पुष्टि करें",
    createAccount: "खाता बनाएं",
    selectCategory: "श्रेणी चुनें",
    allCategories: "सभी श्रेणियां",
    loadingItem: "वस्तु विवरण लोड हो रहा है...",
    raiseComplaint: "शिकायत दर्ज करें",
    subject: "विषय",
    message: "संदेश",
    sendComplaint: "शिकायत भेजें",
    myComplaints: "मेरी शिकायतें",
    chatWithAdmin: "एडमिन से चैट करें",
    sendReply: "जवाब भेजें",
    adminDashboard: "एडमिन डैशबोर्ड",
    manageUsers: "यूज़र्स",
    manageItems: "वस्तुएं",
    complaints: "शिकायतें",
    totalUsers: "कुल यूज़र्स",
    totalItems: "कुल वस्तुएं",
    pendingItems: "लंबित वस्तुएं",
    totalClaims: "कुल क्लेम",
    openComplaints: "खुली शिकायतें",
    returnedItems: "वापस की गई वस्तुएं",
    allUsers: "सभी रजिस्टर्ड यूज़र्स",
    uploadedItems: "अपलोड की गई वस्तुएं",
    allComplaints: "सभी शिकायतें",
    chatWithUser: "यूज़र से चैट करें",
    deleteUser: "यूज़र हटाएं",
    currentAdmin: "वर्तमान एडमिन अकाउंट",
    userDeleted: "यूज़र सफलतापूर्वक हटाया गया।",
    loginSuccess: "लॉगिन सफल हुआ।",
    logoutSuccess: "लॉगआउट सफल हुआ।",
    registerSuccess: "रजिस्ट्रेशन सफल हुआ।",
    userIdPlaceholder: "उदाहरण: 24I355",
    passwordPlaceholder: "पासवर्ड दर्ज करें",
    namePlaceholder: "अपना नाम दर्ज करें",
    phonePlaceholder: "उदाहरण: 9876543210",
    createPasswordPlaceholder: "कम से कम 8 अक्षर",
    confirmPasswordPlaceholder: "पासवर्ड फिर से दर्ज करें",
    searchPlaceholder: "वस्तु नाम से खोजें...",
    locationPlaceholder: "स्थान",
    itemNamePlaceholder: "उदाहरण: काला वॉलेट",
    descriptionPlaceholder: "रंग, ब्रांड, विशेष निशान लिखें...",
    locationNamePlaceholder: "उदाहरण: लाइब्रेरी प्रवेश द्वार",
    mapsPlaceholder: "Google Maps लिंक पेस्ट करें",
    proofPlaceholder: "उदाहरण: मेरी वस्तु पर खास निशान है।",
    subjectPlaceholder: "उदाहरण: गलत वस्तु स्वीकृति",
    messagePlaceholder: "अपनी समस्या लिखें...",
    replyPlaceholder: "अपना जवाब लिखें..."
  },

  te: {
    language: "భాష",
    appName: "క్యాంపస్ లాస్ట్ & ఫౌండ్",
    login: "లాగిన్",
    register: "రిజిస్టర్",
    backHome: "← హోమ్‌కు తిరిగి వెళ్ళు",
    loginNote: "మీ యూజర్ ID మరియు పాస్‌వర్డ్ ఉపయోగించండి.",
    whatDo: "మీరు ఏమి చేయాలనుకుంటున్నారు?",
    searchAction: "వస్తువులు వెతకండి",
    reportLost: "పోయిన వస్తువు నివేదించండి",
    reportFound: "దొరికిన వస్తువు నివేదించండి",
    tag: "కాలేజ్ యుటిలిటీ వెబ్‌సైట్",
    heroTitle: "పోయిన వస్తువులను కనుగొనండి. దొరికిన వస్తువులను నివేదించండి.",
    heroText: "విద్యార్థులు, ఉపాధ్యాయులు, తల్లిదండ్రులు, సందర్శకుల కోసం క్యాంపస్ పోర్టల్.",
    getStarted: "ప్రారంభించండి",
    reportNow: "నివేదించండి / వెతకండి",
    searchItems: "వస్తువులు వెతకండి",
    searchText: "పేరు, వర్గం, స్థానం, తేదీ ద్వారా వెతకండి.",
    uploadImages: "చిత్రాలు అప్లోడ్ చేయండి",
    uploadText: "ఫైల్ నుండి లేదా మొబైల్ కెమెరాతో అప్లోడ్ చేయండి.",
    claimRequests: "క్లెయిమ్ అభ్యర్థనలు",
    claimText: "ఆధారం పంపి ఆమోదం కోసం వేచి ఉండండి.",
    userDashboard: "యూజర్ డ్యాష్‌బోర్డ్",
    lostDashboard: "యూజర్ డ్యాష్‌బోర్డ్",
    foundDashboard: "నా రిపోర్ట్స్ డ్యాష్‌బోర్డ్",
    dashboard: "డ్యాష్‌బోర్డ్",
    logout: "లాగౌట్",
    messages: "సందేశాలు",
    uploadTitle: "వస్తువు అప్లోడ్ చేయండి",
    editTitle: "అప్లోడ్ అభ్యర్థన సవరించండి",
    itemDetails: "వస్తువు వివరాలు",
    itemType: "వస్తువు రకం",
    foundItem: "దొరికిన వస్తువు",
    lostItem: "పోయిన వస్తువు",
    itemName: "వస్తువు పేరు",
    category: "వర్గం",
    description: "వివరణ",
    locationName: "స్థానం పేరు",
    useLocation: "నా ప్రస్తుత స్థానం ఉపయోగించు",
    mapsLink: "Google Maps లింక్",
    date: "తేదీ",
    contact: "సంప్రదింపు నంబర్",
    imageUpload: "చిత్రం అప్లోడ్ / కెమెరాతో తీసుకోండి",
    submitItem: "వస్తువు సమర్పించు",
    updateItem: "అభ్యర్థన నవీకరించు",
    imagePreview: "చిత్రం ప్రివ్యూ",
    cameraNote: "మొబైల్ వినియోగదారులు కెమెరాతో నేరుగా ఫోటో తీసుకోవచ్చు.",
    uploadFoundItem: "వస్తువును నివేదించండి",
    uploadFoundText: "చిత్రం, స్థానం, మ్యాప్ లింక్ మరియు సంప్రదింపు వివరాలు అప్లోడ్ చేయండి.",
    uploadItem: "అప్లోడ్",
    availableItems: "అందుబాటులో ఉన్న వస్తువులు",
    myUploads: "నా అప్లోడ్లు",
    totalUploads: "మొత్తం అప్లోడ్లు",
    pendingRequests: "పెండింగ్ అభ్యర్థనలు",
    claimThisItem: "ఈ వస్తువును క్లెయిమ్ చేయండి",
    proofText: "ఈ వస్తువు మీదేనని ఆధారం ఇవ్వండి.",
    sendClaim: "క్లెయిమ్ పంపు",
    editRequest: "సవరించు",
    deleteUser: "యూజర్‌ను తొలగించు",
    currentAdmin: "ప్రస్తుత అడ్మిన్ ఖాతా",
    userDeleted: "యూజర్ విజయవంతంగా తొలగించబడ్డాడు.",
    loginSuccess: "లాగిన్ విజయవంతం.",
    logoutSuccess: "లాగౌట్ విజయవంతం.",
    registerSuccess: "రిజిస్ట్రేషన్ విజయవంతం."
  },

  ml: {
    language: "ഭാഷ",
    appName: "ക്യാമ്പസ് Lost & Found",
    login: "ലോഗിൻ",
    register: "രജിസ്റ്റർ",
    backHome: "← ഹോമിലേക്ക് മടങ്ങുക",
    loginNote: "നിങ്ങളുടെ യൂസർ IDയും പാസ്‌വേഡും ഉപയോഗിക്കുക.",
    whatDo: "നിങ്ങൾ എന്ത് ചെയ്യാൻ ആഗ്രഹിക്കുന്നു?",
    searchAction: "വസ്തുക്കൾ തിരയുക",
    reportLost: "നഷ്ടപ്പെട്ട വസ്തു റിപ്പോർട്ട് ചെയ്യുക",
    reportFound: "കണ്ടെത്തിയ വസ്തു റിപ്പോർട്ട് ചെയ്യുക",
    tag: "കോളേജ് യൂട്ടിലിറ്റി വെബ്സൈറ്റ്",
    heroTitle: "നഷ്ടപ്പെട്ട വസ്തുക്കൾ കണ്ടെത്തുക. കണ്ടെത്തിയ വസ്തുക്കൾ റിപ്പോർട്ട് ചെയ്യുക.",
    heroText: "വിദ്യാർത്ഥികൾ, അധ്യാപകർ, രക്ഷിതാക്കൾ, സന്ദർശകർ എന്നിവർക്ക് ഉപയോഗിക്കാവുന്ന പോർട്ടൽ.",
    getStarted: "തുടങ്ങുക",
    reportNow: "റിപ്പോർട്ട് / തിരയുക",
    searchItems: "വസ്തുക്കൾ തിരയുക",
    userDashboard: "ഉപയോക്തൃ ഡാഷ്ബോർഡ്",
    foundDashboard: "എന്റെ റിപ്പോർട്ടുകൾ",
    dashboard: "ഡാഷ്ബോർഡ്",
    logout: "ലോഗൗട്ട്",
    messages: "സന്ദേശങ്ങൾ",
    uploadTitle: "വസ്തു അപ്ലോഡ് ചെയ്യുക",
    editTitle: "അപ്ലോഡ് അപേക്ഷ തിരുത്തുക",
    itemDetails: "വസ്തു വിവരങ്ങൾ",
    itemType: "വസ്തു തരം",
    foundItem: "കണ്ടെത്തിയ വസ്തു",
    lostItem: "നഷ്ടപ്പെട്ട വസ്തു",
    itemName: "വസ്തു പേര്",
    category: "വിഭാഗം",
    description: "വിവരണം",
    locationName: "സ്ഥലത്തിന്റെ പേര്",
    useLocation: "എന്റെ നിലവിലെ സ്ഥാനം ഉപയോഗിക്കുക",
    mapsLink: "Google Maps ലിങ്ക്",
    date: "തീയതി",
    contact: "ബന്ധപ്പെടേണ്ട നമ്പർ",
    submitItem: "വസ്തു സമർപ്പിക്കുക",
    updateItem: "അപേക്ഷ പുതുക്കുക",
    myUploads: "എന്റെ അപ്ലോഡുകൾ",
    claimRequests: "ക്ലെയിം അഭ്യർത്ഥനകൾ",
    availableItems: "ലഭ്യമായ വസ്തുക്കൾ",
    claimThisItem: "ഈ വസ്തു ക്ലെയിം ചെയ്യുക",
    sendClaim: "ക്ലെയിം അയക്കുക",
    editRequest: "തിരുത്തുക",
    deleteUser: "ഉപയോക്താവിനെ നീക്കം ചെയ്യുക",
    currentAdmin: "നിലവിലെ അഡ്മിൻ അക്കൗണ്ട്",
    userDeleted: "ഉപയോക്താവ് വിജയകരമായി നീക്കം ചെയ്തു.",
    loginSuccess: "ലോഗിൻ വിജയകരമായി.",
    logoutSuccess: "ലോഗൗട്ട് വിജയകരമായി.",
    registerSuccess: "രജിസ്ട്രേഷൻ വിജയകരമായി."
  },

  kn: {
    language: "ಭಾಷೆ",
    appName: "ಕ್ಯಾಂಪಸ್ Lost & Found",
    login: "ಲಾಗಿನ್",
    register: "ರಿಜಿಸ್ಟರ್",
    backHome: "← ಮನೆಗೆ ಹಿಂತಿರುಗಿ",
    loginNote: "ನಿಮ್ಮ ಯೂಸರ್ ID ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಬಳಸಿ.",
    whatDo: "ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?",
    searchAction: "ವಸ್ತುಗಳನ್ನು ಹುಡುಕಿ",
    reportLost: "ಕಳೆದುಹೋದ ವಸ್ತು ವರದಿ ಮಾಡಿ",
    reportFound: "ಸಿಕ್ಕ ವಸ್ತು ವರದಿ ಮಾಡಿ",
    tag: "ಕಾಲೇಜು ಉಪಯೋಗಿ ವೆಬ್‌ಸೈಟ್",
    heroTitle: "ಕಳೆದುಹೋದ ವಸ್ತುಗಳನ್ನು ಹುಡುಕಿ. ಸಿಕ್ಕ ವಸ್ತುಗಳನ್ನು ವರದಿ ಮಾಡಿ.",
    heroText: "ವಿದ್ಯಾರ್ಥಿಗಳು, ಶಿಕ್ಷಕರು, ಪೋಷಕರು, ಭೇಟಿ ದಾರರು ಬಳಸಬಹುದಾದ ಕ್ಯಾಂಪಸ್ ಪೋರ್ಟಲ್.",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    reportNow: "ವರದಿ / ಹುಡುಕಿ",
    searchItems: "ವಸ್ತುಗಳನ್ನು ಹುಡುಕಿ",
    userDashboard: "ಬಳಕೆದಾರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    foundDashboard: "ನನ್ನ ವರದಿಗಳು",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    logout: "ಲಾಗೌಟ್",
    messages: "ಸಂದೇಶಗಳು",
    uploadTitle: "ವಸ್ತು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    editTitle: "ಅಪ್ಲೋಡ್ ವಿನಂತಿ ತಿದ್ದು",
    itemDetails: "ವಸ್ತು ವಿವರಗಳು",
    itemType: "ವಸ್ತು ಪ್ರಕಾರ",
    foundItem: "ಸಿಕ್ಕ ವಸ್ತು",
    lostItem: "ಕಳೆದುಹೋದ ವಸ್ತು",
    itemName: "ವಸ್ತು ಹೆಸರು",
    category: "ವರ್ಗ",
    description: "ವಿವರಣೆ",
    locationName: "ಸ್ಥಳದ ಹೆಸರು",
    useLocation: "ನನ್ನ ಪ್ರಸ್ತುತ ಸ್ಥಳ ಬಳಸಿ",
    mapsLink: "Google Maps ಲಿಂಕ್",
    date: "ದಿನಾಂಕ",
    contact: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
    submitItem: "ವಸ್ತು ಸಲ್ಲಿಸಿ",
    updateItem: "ವಿನಂತಿ ನವೀಕರಿಸಿ",
    myUploads: "ನನ್ನ ಅಪ್ಲೋಡ್‌ಗಳು",
    claimRequests: "ಹಕ್ಕು ವಿನಂತಿಗಳು",
    availableItems: "ಲಭ್ಯವಿರುವ ವಸ್ತುಗಳು",
    claimThisItem: "ಈ ವಸ್ತು ಕ್ಲೇಮ್ ಮಾಡಿ",
    sendClaim: "ಕ್ಲೇಮ್ ಕಳುಹಿಸಿ",
    editRequest: "ತಿದ್ದು",
    deleteUser: "ಬಳಕೆದಾರರನ್ನು ಅಳಿಸಿ",
    currentAdmin: "ಪ್ರಸ್ತುತ ಅಡ್ಮಿನ್ ಖಾತೆ",
    userDeleted: "ಬಳಕೆದಾರರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ.",
    loginSuccess: "ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ.",
    logoutSuccess: "ಲಾಗೌಟ್ ಯಶಸ್ವಿಯಾಗಿದೆ.",
    registerSuccess: "ರಿಜಿಸ್ಟರ್ ಯಶಸ್ವಿಯಾಗಿದೆ."
  }
};

["te", "ml", "kn"].forEach((lang) => {
  translations[lang] = { ...translations.en, ...translations[lang] };
});

/* ---------------- PAGE START ---------------- */

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

/* ---------------- LANGUAGE ---------------- */

function initHome() {
  const lang = localStorage.getItem(LANG_KEY);
  const screen = document.getElementById("languageScreen");
  if (!lang && screen) screen.style.display = "flex";
}

function removeDuplicateLanguageControls() {
  const oldSelect = document.getElementById("languageSelect");
  if (oldSelect) oldSelect.remove();

  const languageBlocks = document.querySelectorAll(".custom-language");
  languageBlocks.forEach((block, index) => {
    if (index > 0) block.remove();
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
  if (!translations[lang]) lang = "en";

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
  const page = document.body.dataset.page;

  if (page === "upload") {
    const title = document.querySelector("h2");
    const submit = document.getElementById("submitItemBtn");

    if (title) title.textContent = editingItemId ? t("editTitle") : t("uploadTitle");
    if (submit) submit.textContent = editingItemId ? t("updateItem") : t("submitItem");
  }

  if (page === "login") {
    const authTitle = document.getElementById("authTitle");
    const registerForm = document.getElementById("registerForm");

    if (authTitle) {
      const isRegister = registerForm && !registerForm.classList.contains("hidden");
      authTitle.textContent = isRegister ? t("register") : t("login");
    }
  }
}

/* ---------------- TOAST ---------------- */

function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = "toast show";

  setTimeout(() => {
    toast.className = "toast";
  }, 2200);
}

/* ---------------- DARK MODE ---------------- */

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

/* ---------------- COMMON ---------------- */

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
  showToast(t("logoutSuccess"));

  setTimeout(() => {
    window.location.href = "index.html";
  }, 900);
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

  window.location.href =
    user.user_type === "admin"
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
  if (!input) return;
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

/* ---------------- AUTH ---------------- */

function initAuthPage() {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const authTitle = document.getElementById("authTitle");

  if (!loginTab || !registerTab || !loginForm || !registerForm) return;

  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    if (authTitle) authTitle.textContent = t("login");

    clearMessage();
    applyLanguage();
  });

  registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    if (authTitle) authTitle.textContent = t("register");

    clearMessage();
    applyLanguage();
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

  if (!msg) return;

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
  const selectedLanguage = localStorage.getItem(LANG_KEY) || "en";
  const darkMode = localStorage.getItem(DARK_KEY) === "true";

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
      preferred_language: selectedLanguage,
      dark_mode: darkMode
    };

    const { data: createdUser, error } = await supabaseClient
      .from("profiles")
      .insert(newUser)
      .select()
      .single();

    if (error) throw error;

    setCurrentUser(createdUser);

    showToast(t("registerSuccess"));
    showAuthMessage(t("registerSuccess"), "green");

    setTimeout(() => {
      window.location.href =
        createdUser.user_type === "admin"
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

    const selectedBeforeLogin = localStorage.getItem(LANG_KEY) || "en";

    if (!user.preferred_language) {
      user.preferred_language = selectedBeforeLogin;

      await supabaseClient
        .from("profiles")
        .update({ preferred_language: selectedBeforeLogin })
        .eq("user_id", user.user_id);
    }

    localStorage.setItem(LANG_KEY, user.preferred_language || selectedBeforeLogin);

    if (typeof user.dark_mode === "boolean") {
      localStorage.setItem(DARK_KEY, String(user.dark_mode));
    }

    setCurrentUser(user);
    applyLanguage();
    applyDarkMode();

    showToast(t("loginSuccess"));
    showAuthMessage(t("loginSuccess"), "green");

    setTimeout(() => {
      window.location.href =
        user.user_type === "admin"
          ? "admin-dashboard.html"
          : getNextActionUrl();
    }, 700);

  } catch (error) {
    showAuthMessage(error.message, "red");
    setButtonLoading(button, false, t("login"));
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
    item.status !== "Hidden" &&
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

  const uploadCount = document.getElementById("uploadCount");
  const claimCount = document.getElementById("claimCount");
  const pendingCount = document.getElementById("pendingCount");

  if (uploadCount) uploadCount.textContent = myItems.length;
  if (claimCount) claimCount.textContent = myClaims.length;
  if (pendingCount) pendingCount.textContent = pendingClaims.length;

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

  showToast(`Claim ${status}`);
  location.reload();
}
/* ---------------- UPLOAD + EDIT ---------------- */

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

  if (editId) {
    await loadItemForEdit(editId, user);
  }

  let selectedFile = null;

  if (imageInput) {
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

      if (imagePreview) {
        imagePreview.src = URL.createObjectURL(selectedFile);
      }
    });
  }

  if (!uploadForm) return;

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
        status: "Active",
        admin_status: "Visible"
      };

      if (editingItemId) {
        const { error } = await supabaseClient
          .from("items")
          .update(itemData)
          .eq("id", editingItemId)
          .eq("reporter_id", user.user_id);

        if (error) throw error;

        if (message) {
          message.textContent = "Request updated. Waiting for admin approval again.";
          message.style.color = "green";
        }

        showToast("Request updated successfully.");
      } else {
        const { error } = await supabaseClient
          .from("items")
          .insert(itemData);

        if (error) throw error;

        if (message) {
          message.textContent = "Item submitted. Waiting for admin approval.";
          message.style.color = "green";
        }

        showToast("Item submitted successfully.");
      }

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

  const preview = document.getElementById("imagePreview");

  if (preview && item.image_url) {
    preview.src = item.image_url;
  }

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

      showToast("Location captured successfully.");
    },
    () => {
      alert("Location permission denied or unavailable.");
    }
  );
}

/* ---------------- ITEM DETAILS ---------------- */

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
    if (claimSection) claimSection.style.display = "none";
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

      ${
        item.maps_link
          ? `<p><a class="btn secondary" target="_blank" href="${escapeHTML(item.maps_link)}">Open Google Maps Location</a></p>`
          : ""
      }

      ${
        isOwner
          ? `<p><a class="btn primary" href="upload.html?edit=${encodeURIComponent(item.id)}">${t("editRequest")}</a></p>`
          : ""
      }
    </div>
  `;

  if (item.status === "Returned" || isOwner) {
    if (claimSection) claimSection.style.display = "none";
    return;
  }

  const claimForm = document.getElementById("claimForm");

  if (!claimForm) return;

  claimForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const proof = document.getElementById("proof").value.trim();
    const claims = await fetchClaims();

    const alreadyClaimed = claims.some(
      c =>
        c.item_id == item.id &&
        c.claimant_id === user.user_id &&
        c.status === "Pending"
    );

    if (alreadyClaimed) {
      document.getElementById("claimMessage").textContent =
        "You already sent a pending request for this item.";
      document.getElementById("claimMessage").style.color = "red";
      return;
    }

    const { error: claimError } = await supabaseClient
      .from("claims")
      .insert({
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

    await supabaseClient
      .from("items")
      .update({ status: "Claim Pending" })
      .eq("id", item.id);

    document.getElementById("claimMessage").textContent =
      "Request sent successfully.";
    document.getElementById("claimMessage").style.color = "green";

    showToast("Claim request sent successfully.");
    claimForm.reset();
  });
}

/* ---------------- COMPLAINTS ---------------- */

async function initComplaints() {
  const user = requireLogin();
  if (!user) return;

  const complaintForm = document.getElementById("complaintForm");
  const replyForm = document.getElementById("replyForm");

  if (complaintForm) complaintForm.addEventListener("submit", createComplaint);
  if (replyForm) replyForm.addEventListener("submit", sendUserReply);

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

  await supabaseClient
    .from("complaint_messages")
    .insert({
      complaint_id: complaint.id,
      sender_id: user.user_id,
      sender_name: user.full_name,
      sender_role: user.user_type,
      message
    });

  e.target.reset();
  showToast("Complaint sent successfully.");
  await renderUserComplaints();
}

async function renderUserComplaints() {
  const user = getCurrentUser();
  const list = document.getElementById("complaintsList");

  if (!list) return;

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

  if (!box) return;

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

  await supabaseClient
    .from("complaint_messages")
    .insert({
      complaint_id: selectedComplaintId,
      sender_id: user.user_id,
      sender_name: user.full_name,
      sender_role: user.user_type,
      message: text
    });

  document.getElementById("replyText").value = "";
  await openComplaint(selectedComplaintId);
  showToast("Reply sent successfully.");
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

  if (!list) return;

  list.innerHTML = users.map(u => `
    <div class="admin-row">
      <h4>${escapeHTML(u.full_name)}</h4>
      <p><b>ID:</b> ${escapeHTML(u.user_id)}</p>
      <p><b>Type:</b> ${escapeHTML(u.user_type)}</p>
      <p><b>Phone:</b> ${escapeHTML(u.phone)}</p>

      ${
        u.user_id !== admin.user_id
          ? `<button class="btn reject" onclick="deleteUser('${escapeHTML(u.user_id)}')">${t("deleteUser")}</button>`
          : `<p class="muted">${t("currentAdmin")}</p>`
      }
    </div>
  `).join("");
}

async function deleteUser(userId) {
  const currentUser = getCurrentUser();

  if (!currentUser || currentUser.user_type !== "admin") {
    alert("Admin only.");
    return;
  }

  if (currentUser.user_id === userId) {
    alert("You cannot delete your own admin account.");
    return;
  }

  const ok = confirm("Are you sure you want to delete this user?");
  if (!ok) return;

  const { error } = await supabaseClient
    .from("profiles")
    .delete()
    .eq("user_id", userId);

  if (error) {
    alert("Delete failed: " + error.message);
    return;
  }

  showToast(t("userDeleted"));
  location.reload();
}

async function initAdminItems() {
  const admin = requireAdmin();
  if (!admin) return;

  const items = await fetchItems();
  const grid = document.getElementById("adminItemsGrid");

  if (!grid) return;

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
      admin_status: "Visible",
      status: "Active"
    })
    .eq("id", id);

  showToast("Item made visible.");
  location.reload();
}

async function rejectItem(id) {
  await supabaseClient
    .from("items")
    .update({
      admin_status: "Hidden",
      status: "Hidden"
    })
    .eq("id", id);

  showToast("Item hidden successfully.");
  location.reload();
}

async function deleteItem(id) {
  const confirmDelete = confirm("Delete this item permanently?");
  if (!confirmDelete) return;

  await supabaseClient
    .from("items")
    .delete()
    .eq("id", id);

  showToast("Item deleted successfully.");
  location.reload();
}

async function initAdminComplaints() {
  const admin = requireAdmin();
  if (!admin) return;

  const adminReplyForm = document.getElementById("adminReplyForm");

  if (adminReplyForm) {
    adminReplyForm.addEventListener("submit", sendAdminReply);
  }

  await renderAdminComplaints();
}

async function renderAdminComplaints() {
  const complaints = await fetchComplaints();
  const list = document.getElementById("adminComplaintsList");

  if (!list) return;

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

  if (!box) return;

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

  await supabaseClient
    .from("complaint_messages")
    .insert({
      complaint_id: selectedAdminComplaintId,
      sender_id: admin.user_id,
      sender_name: admin.full_name,
      sender_role: "admin",
      message: text
    });

  document.getElementById("adminReplyText").value = "";
  await openAdminComplaint(selectedAdminComplaintId);
  showToast("Reply sent successfully.");
}

async function closeComplaint(event, id) {
  event.stopPropagation();

  await supabaseClient
    .from("complaints")
    .update({ status: "Closed" })
    .eq("id", id);

  showToast("Complaint closed successfully.");
  location.reload();
}

/* ---------------- CARD ---------------- */

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