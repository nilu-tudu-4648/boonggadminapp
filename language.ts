import { I18n } from 'i18n-js';


const en = {
    "SOP": "S O P", "Bikes": "Bikes", "Today's": "Today's", "Pickup": "Pickup",
    "Logout": "Logout", "Offers": "Offers", "Future": "Future", "Extended": "Extended",
    "Search": "Search", "Account": "Account", "Overdue": "Overdue", "Cancel": "Cancel",
    "Welcome": "Welcome", "On-Going": "On-Going", "Drop": "Drop", "Cancel Booking": "Cancel Booking",
    " Send OTP": " Send OTP", "Available": "Available", "History": "History",
    "Contact Us": "Contact Us", "Resend OTP": "Resend OTP",
    " Verify OTP": " Verify OTP", "Maintenance": "Maintenance",
    "Today's Drops": "Today's Drops", "Create Booking": "Create Booking",
    "Today's Pickup": "Today's Pickup", "Change langauge": "Change langauge",
    "Current Booking": "Current Booking", "Rent Calculator": "Rent Calculator",
    "Cancelled Booking": "Cancelled Booking", "Vehicle Inventory": "Vehicle Inventory",
    "PLATINUM FRANCHISE": "PLATINUM FRANCHISE", "Invalid OTP entered": "Invalid OTP entered",
    "Please Enter Phone No": "Please Enter Phone No", "User Booking already exists": "User Booking already exists",
    "Verify OTP to create Booking": "Verify OTP to create Booking",
    "Please Contact for any queries": "Please Contact for any queries",
    "Please enter your mobile number to proceed": "Please enter your mobile number to proceed",
    "Reason for cancellation?": "Reason for cancellation?"
}

const hi = {
    "SOP": "शराबी", "Bikes": "बाइक", "Today's": "आज का", "Pickup": "पिकअप", "Future": "भविष्य का",
    "Logout": "लॉग आउट", "Offers": "ऑफर", "Search": "खोजें", "Account": "खाता", "Cancel": "रद्द करें",
    "Welcome": "स्वागत", "On-Going": "चल रहे", " Send OTP": "OTP भेजें", "Available": "उपलब्ध",
    "Contact Us": "संपर्क करें", "Resend OTP": "ओटीपी पुनः भेजें", "Overdue": "विलंबित", "Cancel Booking": "बुकिंग रद्द करें",
    " Verify OTP": "ओटीपी सत्यापित करें", "Maintenance": "रखरखाव", "Extended": "विस्तारित",
    "Today's Drops": "आज की ड्रोप", "Create Booking": "बुकिंग बनाएं", "Drop": "ड्रोप",
    "Today's Pickup": "आज की पिकअप", "Change langauge": "भाषा बदलें", "History": "इतिहास",
    "Current Booking": "वर्तमान बुकिंग", "Rent Calculator": "किराया कैलकुलेटर",
    "Cancelled Booking": "रद्द बुकिंग", "Vehicle Inventory": "वाहन सूची",
    "PLATINUM FRANCHISE": "प्लेटिनम मताधिकार", "Invalid OTP entered": "अमान्य ओटीपी दर्ज किया गया",
    "Please Enter Phone No": "कृपया फोन नंबर दर्ज करें", "User Booking already exists": "उपयोगकर्ता बुकिंग पहले से मौजूद है",
    "Verify OTP to create Booking": "बुकिंग बनाने के लिए ओटीपी सत्यापित करें",
    "Please Contact for any queries": "कृपया किसी भी प्रश्न के लिए संपर्क करें",
    "Please enter your mobile number to proceed": "आगे बढ़ने के लिए कृपया अपना मोबाइल नंबर दर्ज करें",
    "Reason for cancellation?": "निरस्तीकरण का कारण?"
}

const translations = { en, hi }

export const i18n = new I18n(translations);

i18n.enableFallback = true;

export { en, hi };