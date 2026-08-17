import { 
  createIcons, 
  Wifi, 
  Signal, 
  BatteryCharging, 
  CloudSun, 
  RotateCw, 
  LayoutGrid, 
  Sparkles, 
  Sprout, 
  CloudRain, 
  Sliders, 
  Settings, 
  Aperture, 
  CheckCircle, 
  Upload, 
  PlayCircle, 
  Sun, 
  Droplets, 
  Layers, 
  Orbit, 
  Camera, 
  Check, 
  LogOut, 
  CloudUpload, 
  UserPlus, 
  LogIn, 
  Globe, 
  Cpu, 
  MapPin,
  Loader,
  BookOpen,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  Clock,
  Repeat,
  Calendar,
  Cloud,
  History,
  Trash2,
  Trash,
  FileText,
  AlertCircle,
  Inbox,
  Eye,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide';

import { 
  auth, 
  db, 
  signOut, 
  onAuthStateChanged, 
  collection, 
  addDoc, 
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp 
} from './firebase.js';
import { create3DTurntable } from './threeTurntable.js';
import { create3DBackground } from './threeBackground.js';

let threeTurntableRig = null;
let threeBg = null;
let isReceivingRemoteSync = false;

const appIcons = {
  Wifi, 
  Signal, 
  BatteryCharging, 
  CloudSun, 
  RotateCw, 
  LayoutGrid, 
  Sparkles, 
  Sprout, 
  CloudRain, 
  Sliders, 
  Settings, 
  Aperture, 
  CheckCircle, 
  Upload, 
  PlayCircle, 
  Sun, 
  Droplets, 
  Layers, 
  Orbit, 
  Camera, 
  Check, 
  LogOut, 
  CloudUpload, 
  UserPlus, 
  LogIn, 
  Globe, 
  Cpu, 
  MapPin,
  Loader,
  BookOpen,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  Clock,
  Repeat,
  Calendar,
  Cloud,
  History,
  Trash2,
  Trash,
  FileText,
  AlertCircle,
  Inbox,
  Eye,
  ChevronDown,
  ChevronRight,
  X
};

function renderIcons() {
  createIcons({ icons: appIcons });
}

// Translations Dictionary (Bilingual English & Filipino)
const TRANSLATIONS = {
  en: {
    'header-subtitle': '360° Citrus Health & Agronomy',
    'settings-btn': 'Settings',
    'btn-logout': 'Logout',
    'btn-save-cloud': 'Save Scan to Firestore Cloud',
    'tab-scan': 'Scan',
    'tab-agronomy': 'Agronomy',
    'tab-manual': 'Manual',
    'w-label-temp': 'Weather',
    'w-label-hum': 'Humidity',
    'w-label-rain': 'Rainfall',
    'w-label-soil': 'Soil Moisture',
    'turntable-header': '360° Motorized Rig',
    'btn-start-scan': 'Start 360° Automated Scan',
    'btn-presets': 'Presets',
    'preset-healthy': 'Healthy Tree',
    'preset-canker': 'Citrus Canker',
    'preset-chlorosis': 'Nutrient Deficiency',
    'preset-mixed': 'Fruit Scab & Scale',
    'quadrant-header': '4-Angle Quadrants',
    'btn-gemini-analyze': 'Gemini AI',
    'side-1': '0° North',
    'side-2': '90° West',
    'side-3': '180° East',
    'side-4': '270° South',
    'gemini-report-title': 'Gemini AI Diagnostic Report',
    'leaf-analysis-title': 'Leaves Condition',
    'fruit-analysis-title': 'Fruit Condition',
    'organic-card-title': 'Organic Calamansi Care Guide',
    'organic-note': '💡 <strong>AI Note:</strong> Gemini AI detects nutrient needs visually! No commercial NPK fertilizer required.',
    'weather-logic-title': 'Weather & Irrigation Logic',
    'w-rain-title': 'Rainfall Advisory',
    'w-rain-desc': 'Rain expected this afternoon (35% probability). Hold organic sprays for 48 hours.',
    'w-irr-title': 'Irrigation Volume',
    'w-irr-desc': 'Apply 5 Liters of drip irrigation per tree early morning.',
    'modal-title': 'System Settings',
    'modal-save': 'Save Settings',

    // Mobile Manual Translations
    'manual-hero-title': 'USISA System Manual',
    'manual-hero-desc': 'Autonomous 360° AI vision plant diagnostics and climate-smart organic care for Calamansi citrus cultivation.',
    'manual-badge-status': 'Active',
    'manual-feat-heading': 'System Features',
    'feat1-title': '360° Cardinal Turret Scan',
    'feat1-desc': 'Captures 4 standardized angles (0°, 90°, 180°, 270°) with auto return-to-home rewind.',
    'feat2-title': 'Gemini Multimodal AI Vision',
    'feat2-desc': 'Detects Citrus Canker, Fruit Scab, Melanose, Chlorosis, Scale Insects, and Leaf Miners.',
    'feat3-title': 'Live Weather & Rain Advisories',
    'feat3-desc': 'Real-time Open-Meteo forecasting with automatic spray delay warnings before rain.',
    'feat4-title': '100% Home DIY Organic Care',
    'feat4-desc': 'Zero-cost recipes using spent coffee grounds, crushed eggshells, and banana peel tea.',
    'feat6-title': 'Real-Time Cloud Auto-Sync',
    'feat6-desc': 'Bi-directional Firestore synchronization connecting Mobile App, Web, and Edge Node.',
    'manual-steps-heading': 'Operating Guide',
    'step1-title': 'Position Hardware & Power On',
    'step1-desc': 'Position scanner facing the Calamansi tree canopy and turn on the power switch.',
    'tip-label': 'Tip:',
    'step1-tip': 'Wipe camera lens clean before scanning.',
    'step2-title': 'Set Location & Sync Weather',
    'step2-desc': 'Set municipality in Settings to sync live temperature and rainfall probabilities.',
    'step3-title': 'Run 360° Automated Scan',
    'step3-desc': 'Tap Quick 360° Scan or step through angles 0°, 90°, 180°, and 270°.',
    'step4-title': 'Run Gemini AI Analysis',
    'step4-desc': 'Tap Gemini AI button to evaluate plant pathology across all 4 angles.',
    'step5-title': 'Review Agronomic Findings',
    'step5-desc': 'Check Leaf & Fruit breakdown and prepare recommended DIY organic care recipes.',
    'step6-title': 'Apply Irrigation & Monitor Live',
    'step6-desc': 'Apply smart drip irrigation (5–8L/tree) and monitor live field updates on mobile.',
    'manual-faq-heading': 'FAQ & Care',
    'faq1-q': 'Best time to scan?',
    'faq1-a': 'Early morning (7:00 AM) or late afternoon (5:00 PM) for diffuse sunlight.',
    'faq2-q': 'What to do if rain is forecasted?',
    'faq2-a': 'Hold foliar sprays for 48 hours to avoid wash-off loss.',
    'faq4-q': 'How to maintain the turret motor?',
    'faq4-a': 'Never force by hand. System automatically rewinds after each scan.',

    // Automatic Scanning Settings (EN)
    'auto-scan-title': 'Automatic 360° Scanning',
    'auto-scan-desc': 'Autonomous scan trigger synchronized via Cloud Firestore.',
    'mode-daily-time': 'Daily Time',
    'mode-interval': 'Interval',
    'label-scan-time': 'Scan Execution Time:',
    'label-scan-interval': 'Repeat Every:',
    'label-auto-ai': 'Auto-Run Gemini AI Diagnosis',
    'auto-scan-off': 'Auto-Scan: OFF',
    'auto-scan-daily-at': 'Auto: Daily at',
    'auto-scan-every': 'Auto: Every',
    'hours-abbr': 'hrs',
    'next-scan-disabled': 'Next scan: Disabled',
    'next-scan-scheduled-at': 'Next scan: Scheduled daily at',
    'next-scan-interval-every': 'Next scan: Runs every',

    // History Translations (EN)
    'tab-history': 'History',
    'history-title': 'Diagnostic History',
    'history-subtitle': 'Cloud-archived 360° foliar scans and Gemini AI reports.',
    'history-empty-title': 'No Saved Reports',
    'history-empty-desc': 'Perform a scan or tap "Save Scan to Firestore Cloud" to view archived reports here.',
    'history-delete-btn': 'Delete',
    'history-delete-confirm': 'Are you sure you want to delete this scan report from Firestore Cloud?',
    'history-reports-count': 'Reports',

    // Brand Hub Menu (EN)
    'brand-hub-title': 'USISA Navigation Hub',
    'brand-hub-sub': 'Quick Screen & Feature Access',
    'menu-desc-scan': 'Live 4-angle motorized camera & Gemini AI pathology',
    'menu-desc-history': 'Cloud-saved scans, timestamps, & delete records',
    'menu-desc-agronomy': 'Natural DIY fertilizers, spray delays & irrigation logic',
    'menu-desc-manual': 'How USISA works, hardware specs & operating guide',
    'menu-desc-presets': 'Healthy, Canker, Scab, Melanose, Chlorosis, & Scale',
    'menu-desc-settings': 'Auto-scan times, interval triggers, and device sync'
  },
  fil: {
    'header-subtitle': '360° Pagsusuri sa Calamansi',
    'settings-btn': 'Mga Setting',
    'btn-logout': 'Mag-logout',
    'btn-save-cloud': 'I-save sa Firestore Cloud',
    'tab-scan': 'Suriin',
    'tab-history': 'Kasaysayan',
    'tab-agronomy': 'Agronomya',
    'tab-manual': 'Patnubay',
    'w-label-temp': 'Panahon',
    'w-label-hum': 'Humidity',
    'w-label-rain': 'Ulat Ulan',
    'w-label-soil': 'Basa ng Lupa',
    'turntable-header': '360° Motorized Rig',
    'btn-start-scan': 'Simulan ang 360° Scan',
    'btn-presets': 'Halimbawa',
    'preset-healthy': 'Malusog na Puno',
    'preset-canker': 'Kanser sa Sitrus',
    'preset-chlorosis': 'Kulang sa Sustansya',
    'preset-mixed': 'Kurikong at Peste',
    'quadrant-header': '4 na Anggulo',
    'btn-gemini-analyze': 'Gemini AI',
    'side-1': '0° Hilaga',
    'side-2': '90° Kanluran',
    'side-3': '180° Silangan',
    'side-4': '270° Timog',
    'gemini-report-title': 'Ulat ng Gemini AI',
    'leaf-analysis-title': 'Kalagayan ng Dahon',
    'fruit-analysis-title': 'Kalagayan ng Bunga',
    'organic-card-title': 'Organikong Pag-aalaga ng Calamansi',
    'organic-note': '💡 <strong>Paalala ng AI:</strong> Nakikita ng Gemini AI ang kailangan ng halaman sa kulay ng dahon! Hindi kailangan ng kemikal.',
    'weather-logic-title': 'Gabay sa Panahon at Pagdidilig',
    'w-rain-title': 'Paalala sa Ulan',
    'w-rain-desc': 'May ulan ngayong hapon (35% tsansa). Ipagpaliban muna ang pag-spray ng 48 oras.',
    'w-irr-title': 'Dami ng Tubig',
    'w-irr-desc': 'Magdilig ng 5 Litro ng tubig kada puno tuwing umaga.',
    'modal-title': 'Mga Setting',
    'modal-save': 'I-save ang Setting',

    // Mobile Manual Translations (Filipino)
    'manual-hero-title': 'Patnubay sa USISA',
    'manual-hero-desc': 'Awtomatikong 360° AI vision pagsusuri at organikong pag-aalaga para sa tanim na Calamansi.',
    'manual-badge-status': 'Aktibo',
    'manual-feat-heading': 'Mga Katangian',
    'feat1-title': '360° Ikot ng Scanner',
    'feat1-desc': 'Kukunan ang 4 na anggulo (0°, 90°, 180°, 270°) na may awtomatikong rewind.',
    'feat2-title': 'Gemini Multimodal AI Vision',
    'feat2-desc': 'Pagsusuri sa Kanser, Kurikong, Melanose, Kakulangan sa Sustansya, at Peste.',
    'feat3-title': 'Live na Panahon at Ulan',
    'feat3-desc': 'Ulat mula sa Open-Meteo na may paalala bago mag-spray kapag may ulan.',
    'feat4-title': '100% Likas na Organikong Lunas',
    'feat4-desc': 'Libreng sangkap gamit ang kape, balat ng itlog, at pinakuluang saging.',
    'feat6-title': 'Awtomatikong Cloud Sync',
    'feat6-desc': 'Sabay-sabay na konektado ang Mobile App, Web, at Scanner gamit ang Firestore.',
    'manual-steps-heading': 'Patnubay sa Paggamit',
    'step1-title': 'Ihanda ang Scanner at Buksan ang Switch',
    'step1-desc': 'Ipuwesto ang scanner na nakatutok sa puno at buksan lamang ang power switch.',
    'tip-label': 'Payo:',
    'step1-tip': 'Linisin ang lente ng camera bago mag-scan.',
    'step2-title': 'Ilagay ang Lugar at Panahon',
    'step2-desc': 'Ilagay ang iyong bayan sa Settings upang makuha ang ulat ng panahon.',
    'step3-title': 'Magsagawa ng 360° Scan',
    'step3-desc': 'Pindutin ang Quick 360° Scan o isa-isang ikutan ang mga anggulo.',
    'step4-title': 'Suriin Gamit ang Gemini AI',
    'step4-desc': 'Pindutin ang Gemini AI upang suriin ang 4 na anggulo.',
    'step5-title': 'Basahin ang Rekomendasyon',
    'step5-desc': 'Tingnan ang kalagayan ng dahon/bunga at ihanda ang organikong lunas.',
    'step6-title': 'Magdilig at Bantayan sa Mobile',
    'step6-desc': 'Magdilig ng 5–8L kada puno at bantayan ang datos sa cellphone.',
    'manual-faq-heading': 'Mga Tanong at Alaga',
    'faq1-q': 'Kailan dapat mag-scan?',
    'faq1-a': 'Maaga sa umaga (7:00 AM) o bandang hapon (5:00 PM) para banayad ang araw.',
    'faq2-q': 'Paano kapag uulan?',
    'faq2-a': 'Ipagpaliban ang pag-spray nang 48 oras upang hindi mahugasan.',
    'faq4-q': 'Paano aalagaan ang motor?',
    'faq4-a': 'Huwag piliting pihitin. Awtomatikong nag-rerewind ang motor matapos mag-scan.',

    // Automatic Scanning Settings (FIL)
    'auto-scan-title': 'Awtomatikong 360° Scan',
    'auto-scan-desc': 'Awtomatikong pag-ikot at pagsusuri gamit ang Cloud Firestore.',
    'mode-daily-time': 'Oras sa Bawat Araw',
    'mode-interval': 'Pana-panahon',
    'label-scan-time': 'Oras ng Pagsasagawa:',
    'label-scan-interval': 'Ulitin Tuwing:',
    'label-auto-ai': 'Awtomatikong Suriin gamit ang Gemini AI',
    'auto-scan-off': 'Auto-Scan: NAKAPATAY',
    'auto-scan-daily-at': 'Auto: Araw-araw sa',
    'auto-scan-every': 'Auto: Tuwing',
    'hours-abbr': 'oras',
    'next-scan-disabled': 'Susunod na scan: Naka-off',
    'next-scan-scheduled-at': 'Susunod na scan: Araw-araw tuwing',
    'next-scan-interval-every': 'Susunod na scan: Tuwing',

    // History Translations (FIL)
    'history-title': 'Kasaysayan ng mga Pagsusuri',
    'history-subtitle': 'Naka-save na mga ulat at 360° scan sa Cloud Firestore.',
    'history-empty-title': 'Walang Naka-save na Ulat',
    'history-empty-desc': 'Magsagawa ng scan o pindutin ang "I-save sa Firestore Cloud" upang makita ang mga ulat dito.',
    'history-delete-btn': 'Burahin',
    'history-delete-confirm': 'Sigurado ka bang nais mong burahin ang ulat na ito sa Firestore Cloud?',
    'history-reports-count': 'Mga Ulat',

    // Brand Hub Menu (FIL)
    'brand-hub-title': 'Navigasyon ng USISA',
    'brand-hub-sub': 'Mabilisang Paglipat ng Menu at Gamit',
    'menu-desc-scan': 'Live 4-anggulong camera at Gemini AI na pagsusuri',
    'menu-desc-history': 'Naka-save na mga scan, oras, at pagbura ng ulat',
    'menu-desc-agronomy': 'Likas na pataba, paalala sa ulan, at tamang tubig',
    'menu-desc-manual': 'Paano gamitin, mga piyesa, at gabay sa hardware',
    'menu-desc-presets': 'Halimbawa ng Malusog, Kanser, Kurikong, at Peste',
    'menu-desc-settings': 'Oras ng auto-scan, agwat ng oras, at device sync'
  }
};

const PRESETS = {
  healthy: {
    score: 92,
    statusText: { en: 'Vibrant & Healthy', fil: 'Napakamalusog at Maganda' },
    summary: {
      en: 'Tree shows excellent chlorophyll levels, uniform rind glossiness, and no sign of pest or fungal infection across all 4 angles.',
      fil: 'Maganda ang kulay ng mga dahon, makinis ang bunga, at walang nakikitang peste sa 4 na anggulo.'
    },
    img0: '/calamansi_healthy.png',
    img90: '/calamansi_healthy.png',
    img180: '/calamansi_healthy.png',
    img270: '/calamansi_healthy.png',
    leafStatus: { en: 'Healthy', fil: 'Malusog' },
    leafTag: 'tag-healthy',
    leafFindings: {
      en: ['Normal dark green glossy leaf surfaces across 360° scan.', 'No chlorosis, yellowing, or vein corking.'],
      fil: ['Makintab at kulay berde ang mga dahon sa 360° scan.', 'Walang paninilaw sa gitna ng mga dahon.']
    },
    fruitStatus: { en: 'Optimal', fil: 'Pinakamaganda' },
    fruitTag: 'tag-healthy',
    fruitFindings: {
      en: ['Smooth peel with fully developed juice vesicles.', 'Zero melanose, scab, or thrip scars.'],
      fil: ['Makinis ang balat at juicy ang loob ng bunga.', 'Walang sugat ng kurikong o gasgas.']
    },
    organicRecs: [
      { icon: "☕", title: { en: "Used Coffee Grounds", fil: "Pinagkapan ng Kape" }, sub: { en: "Green Leaves & Growth", fil: "Luntiang Dahon at Paglaki" }, desc: { en: "Mix 2 tbsp of dried coffee grounds into topsoil every 2 weeks.", fil: "Maghalo ng 2 kutsarang tuyong kape sa lupa kada 2 linggo." } },
      { icon: "🥚", title: { en: "Crushed Eggshells", fil: "Binudburang Balat ng Itlog" }, sub: { en: "Strong Roots & Flowering", fil: "Matibay na Ugat at Bulaklak" }, desc: { en: "Boil and crush eggshells into powder. Mix 2 tbsp powder with 1L water.", fil: "Pakuluan at durugin ang balat ng itlog. Ihalo sa 1L tubig." } },
      { icon: "🍌", title: { en: "Banana Peel Tea", fil: "Pinakuluang Balat ng Saging" }, sub: { en: "Juicy Calamansi Fruit", fil: "Makatás at Malaking Bunga" }, desc: { en: "Chop 3 banana peels and soak in 1L water for 3 days to boost juice.", fil: "Hiwain ang 3 balat ng saging at ibabad sa 1L tubig nang 3 araw." } }
    ]
  },
  canker: {
    score: 42,
    statusText: { en: 'Citrus Canker Infection', fil: 'May Sakit na Kanser sa Sitrus' },
    summary: {
      en: 'Critical detection of raised corky brown lesions with yellow halos on leaves and fruits at 90° and 180° scan angles.',
      fil: 'Nakitang may maitim at magaspang na sugat sa mga dahon at bunga sa 90° at 180° anggulo.'
    },
    img0: '/calamansi_healthy.png',
    img90: '/calamansi_canker.png',
    img180: '/calamansi_canker.png',
    img270: '/calamansi_healthy.png',
    leafStatus: { en: 'Canker Lesions', fil: 'May Sugat na Kanser' },
    leafTag: 'tag-danger',
    leafFindings: {
      en: ['Raised, corky brown lesions with oily margins on leaves.', 'Chlorotic yellow halos surrounding spots.'],
      fil: ['Magaspang at maitim na sugat sa dahon.', 'May paninilaw sa paligid ng sugat.']
    },
    fruitStatus: { en: 'Lesions Present', fil: 'May Sugat ang Bunga' },
    fruitTag: 'tag-danger',
    fruitFindings: {
      en: ['Crater-like dark scabs on Calamansi fruit peel.', 'High risk of premature fruit drop.'],
      fil: ['Parang sugat sa balat ng bunga.', 'Maaaring malaglag ang bunga nang maaga.']
    },
    organicRecs: [
      { icon: "🧄", title: { en: "Garlic & Neem Spray", fil: "Spray ng Bawang at Neem" }, sub: { en: "Antibacterial Shield", fil: "Pampatay ng Bakterya" }, desc: { en: "Boil crushed garlic and neem oil. Spray to halt bacterial canker spread.", fil: "Pakuluan ang bawang at neem oil. I-spray sa dahon para pigilan ang bakterya." } },
      { icon: "✂️", title: { en: "Sanitary Pruning", fil: "Paghahawi ng Sanga" }, sub: { en: "Isolate Infection", fil: "Pang-iwas Hawa" }, desc: { en: "Prune infected twigs 10cm below lesions and burn cut leaves.", fil: "Gupitin ang sanga 10cm sa ibaba ng sugat at ibaon ang naputol na dahon." } }
    ]
  },
  chlorosis: {
    score: 58,
    statusText: { en: 'Nutrient Deficiency (Yellowing)', fil: 'Kulang sa Sustansya (Naninilaw)' },
    summary: {
      en: 'Interveinal yellowing detected on young upper leaves, indicating Zinc & Iron deficiency in soil.',
      fil: 'Naninilaw ang dahon ngunit berde ang ugat. Kulang sa Iron at Zinc ang halaman.'
    },
    img0: '/calamansi_canker.png',
    img90: '/calamansi_healthy.png',
    img180: '/calamansi_healthy.png',
    img270: '/calamansi_canker.png',
    leafStatus: { en: 'Severe Chlorosis', fil: 'Naninilaw na Dahon' },
    leafTag: 'tag-warning',
    leafFindings: {
      en: ['Interveinal yellowing with green main veins.', 'Leaves are undersized with stunting.'],
      fil: ['Naninilaw ang pagitan ng dahon.', 'Maliit ang mga bagong sibol na dahon.']
    },
    fruitStatus: { en: 'Small / Pale', fil: 'Maliit / Maputla' },
    fruitTag: 'tag-warning',
    fruitFindings: {
      en: ['Fruit development delayed due to low photosynthesis.', 'Peel remains pale green.'],
      fil: ['Mabagal ang paglaki ng bunga.', 'Maputla ang balat ng Calamansi.']
    },
    organicRecs: [
      { icon: "📌", title: { en: "Ferrous Iron Water", fil: "Tubig na may Iron sa Pako" }, sub: { en: "Iron Boost", fil: "Pampabalik ng Berde" }, desc: { en: "Soak clean iron nails in water for 3 days. Drench soil to restore green color.", fil: "Ibabad ang pako sa tubig nang 3 araw. Idilig sa lupa upang bumalik ang luntiang dahon." } },
      { icon: "☕", title: { en: "Coffee Grounds", fil: "Pinagkapan ng Kape" }, sub: { en: "Acidify Soil", fil: "Pampataba ng Lupa" }, desc: { en: "Mix dried coffee grounds into topsoil to unlock trace minerals.", fil: "Magbaon ng kape sa lupa upang mabilis na ma-absorb ng ugat ang sustansya." } }
    ]
  },
  mixed: {
    score: 65,
    statusText: { en: 'Fruit Scab & Scale Insects', fil: 'Peste sa Bunga at Kurikong' },
    summary: {
      en: 'Scale insects clinging to fruit clusters at 90° angle, accompanied by mild fruit scab spots.',
      fil: 'Nakitang may maliliit na kuto o scale insects sa bunga sa 90° anggulo.'
    },
    img0: '/calamansi_healthy.png',
    img90: '/calamansi_canker.png',
    img180: '/calamansi_healthy.png',
    img270: '/calamansi_healthy.png',
    leafStatus: { en: 'Minor Sooty Mold', fil: 'May Kaunting Amag' },
    leafTag: 'tag-warning',
    leafFindings: {
      en: ['Sooty mold film coating lower leaves.', 'Canopy airflow restricted.'],
      fil: ['Maitim na amag sa ibaba ng dahon.', 'Kulang sa hangin at sikat ng araw sa gitna.']
    },
    fruitStatus: { en: 'Scale Insects', fil: 'May Peste ang Balat' },
    fruitTag: 'tag-warning',
    fruitFindings: {
      en: ['Small brown scale insects clinging to fruit peel.', 'Juice yield intact.'],
      fil: ['May kumakapit na maliit na insekto sa balat.', 'Mapapakinabangan pa ang katas.']
    },
    organicRecs: [
      { icon: "🧼", title: { en: "Soapy Neem Emulsion", fil: "Sabon at Neem Spray" }, sub: { en: "Pest Deterrent", fil: "Pampataboy ng Insekto" }, desc: { en: "Mix 1 tsp dish soap + 5ml neem oil in 1L water. Spray on fruit clusters.", fil: "Maghalo ng sabon at neem oil sa 1L tubig. I-spray sa bunga para matanggal ang kuto." } }
    ]
  }
};

const state = {
  currentUser: null,
  lang: localStorage.getItem('calamansi_android_lang') || 'en',
  activeScreen: 'scan',
  activeAngleIndex: 0,
  isScanning: false,
  rpiName: localStorage.getItem('calamansi_rpi_name') || 'RPi Detector 1',
  location: localStorage.getItem('calamansi_location') || 'Manila, Philippines',
  activePreset: '',
  
  // Automatic Scanning Schedule Settings (Firestore Synced)
  autoScanEnabled: localStorage.getItem('calamansi_auto_scan_enabled') === 'true',
  autoScanMode: localStorage.getItem('calamansi_auto_scan_mode') || 'time',
  autoScanTime: localStorage.getItem('calamansi_auto_scan_time') || '07:00',
  autoScanIntervalHours: parseInt(localStorage.getItem('calamansi_auto_scan_interval') || '6', 10),
  autoAnalyzeEnabled: localStorage.getItem('calamansi_auto_analyze_enabled') !== 'false',
  lastAutoScanIso: localStorage.getItem('calamansi_last_auto_scan_iso') || '',

  weather: {
    temp: '29.4°C',
    humidity: '78% RH',
    rainChance: '35%',
    soilMoisture: 62,
    condition: 'Partly Cloudy'
  },

  quadrants: [
    { angle: 0, img: '' },
    { angle: 90, img: '' },
    { angle: 180, img: '' },
    { angle: 270, img: '' }
  ],

  analysis: {
    healthScore: 0,
    statusText: { en: 'No Scan Performed', fil: 'Walang Pagsusuri' },
    summaryText: {
      en: 'No scan data available yet. Please start a 360° scan or upload photos to run Gemini AI analysis.',
      fil: 'Wala pang datos ng scan. Simulan ang 360° scan o mag-upload ng larawan upang masuri ng Gemini AI.'
    },
    leafStatus: { en: 'Awaiting Scan', fil: 'Naghihintay ng Scan' },
    leafTagClass: 'tag-dimmed',
    leafFindings: {
      en: [
        'No leaf scan data available yet.'
      ],
      fil: [
        'Wala pang datos sa pagsusuri ng dahon.'
      ]
    },
    fruitStatus: { en: 'Awaiting Scan', fil: 'Naghihintay ng Scan' },
    fruitTagClass: 'tag-dimmed',
    fruitFindings: {
      en: [
        'No fruit scan data available yet.'
      ],
      fil: [
        'Wala pang datos sa pagsusuri ng bunga.'
      ]
    },
    treatment: {
      type: 'none',
      title: { en: 'Awaiting Scan', fil: 'Naghihintay ng Scan' },
      desc: { en: 'Perform a scan to generate customized care and treatment advice.', fil: 'Magsagawa ng scan upang makita ang payo sa pag-aalaga.' }
    },
    organicRecs: []
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderIcons();
  initAndroidClock();
  initBrandMenu();
  initAngleSelector();
  initPresets();
  initAuth();
  initWeather();
  init3DViews();
  initUploads();
  initActions();
  initAutoScanScheduler();
  initHistoryListener();
  applyLanguage(state.lang);
});

// Update Android Simulated Status Bar Clock
function initAndroidClock() {
  const clockEl = document.getElementById('status-clock');
  const updateTime = () => {
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  updateTime();
  setInterval(updateTime, 30000);
}

// USISA Brand Logo Menu Hub (Android)
function initBrandMenu() {
  const brandBtn = document.getElementById('app-brand-btn');
  const overlay = document.getElementById('brand-menu-overlay');
  const sheet = document.getElementById('brand-menu-sheet');
  const closeBtn = document.getElementById('brand-menu-close-btn');
  const menuItems = document.querySelectorAll('.brand-menu-item');
  const langEnBtn = document.getElementById('brand-lang-en-btn');
  const langFilBtn = document.getElementById('brand-lang-fil-btn');
  const logoutBtn = document.getElementById('brand-menu-logout-btn');

  const openMenu = () => {
    if (overlay && sheet) {
      overlay.classList.add('active');
      sheet.classList.add('active');
      brandBtn?.classList.add('active');
      menuItems.forEach(item => {
        item.classList.toggle('active', item.dataset.screen === state.activeScreen);
      });
      if (langEnBtn && langFilBtn) {
        langEnBtn.classList.toggle('active', state.lang === 'en');
        langFilBtn.classList.toggle('active', state.lang === 'fil');
      }
    }
  };

  const closeMenu = () => {
    if (overlay && sheet) {
      overlay.classList.remove('active');
      sheet.classList.remove('active');
      brandBtn?.classList.remove('active');
    }
  };

  if (brandBtn) {
    brandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (overlay?.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeMenu();
      }
    });
  }

  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const screenTarget = item.dataset.screen;
      switchScreen(screenTarget);
      closeMenu();
    });
  });

  if (langEnBtn) {
    langEnBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchLanguage('en');
      langEnBtn.classList.add('active');
      langFilBtn?.classList.remove('active');
    });
  }

  if (langFilBtn) {
    langFilBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchLanguage('fil');
      langFilBtn.classList.add('active');
      langEnBtn?.classList.remove('active');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      signOut(auth).then(() => {
        window.location.replace('/login.html');
      });
    });
  }
}

function switchScreen(screenTarget) {
  state.activeScreen = screenTarget;
  document.querySelectorAll('.brand-menu-item').forEach(m => {
    m.classList.toggle('active', m.dataset.screen === screenTarget);
  });
  document.querySelectorAll('.mobile-screen').forEach(s => {
    s.classList.toggle('active', s.id === `screen-${screenTarget}`);
  });
}

// 3D Turntable & Canvas
function init3DViews() {
  try {
    threeBg = create3DBackground('bg-3d-canvas');
    threeTurntableRig = create3DTurntable('turntable-3d-container');
  } catch (e) {
    console.warn('3D initialization:', e);
  }
}

// Angle Selector Pill Buttons
function initAngleSelector() {
  const angleBtns = document.querySelectorAll('.angle-pill-btn');
  angleBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      angleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const angle = parseInt(btn.dataset.angle);
      state.activeAngleIndex = idx;
      if (threeTurntableRig) threeTurntableRig.setAngleDegrees(angle);

      document.querySelectorAll('.quadrant-mobile-box').forEach((box, i) => {
        box.classList.toggle('active', i === idx);
      });
      document.getElementById('motor-status-badge').textContent = `Position: ${angle}°`;
      syncToFirestore('android');
    });
  });

  const startScanBtn = document.getElementById('start-360-scan-btn');
  if (startScanBtn) startScanBtn.addEventListener('click', runFull360Scan);
}

async function runFull360Scan() {
  if (state.isScanning) return;
  state.isScanning = true;

  // Reset any active sample preset so fresh scan data is strictly evaluated
  state.activePreset = '';
  document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));

  const btn = document.getElementById('start-360-scan-btn');
  const badge = document.getElementById('motor-status-badge');
  const isFil = state.lang === 'fil';

  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader" class="spin"></i> ${isFil ? 'Scanning 0°...' : 'Scanning 0°...'}`;
  renderIcons();

  const commandTimestamp = Date.now();

  // Send real-time 360° scan command to Firestore
  try {
    const syncDocRef = doc(db, 'system_sync', 'latest_scan');
    await setDoc(syncDocRef, {
      command: 'scan_360',
      commandTimestamp: commandTimestamp,
      isScanning: true,
      activePreset: '',
      source: 'android'
    }, { merge: true });
  } catch (err) {
    console.warn('[USISA Mobile] Firestore command notice:', err);
  }

  // Also send direct LAN trigger if RPi is on same Wi-Fi
  try {
    fetch('http://192.168.0.115:5000/api/scan', { method: 'POST', mode: 'cors' }).catch(() => {});
  } catch (e) {}

  let step = 0;
  const angles = [0, 90, 180, 270];
  const cardinalNames = ['0° North', '90° West', '180° East', '270° South'];

  const interval = setInterval(() => {
    // Phase 1: Counter-Clockwise Scanning Steps (0° North -> 90° West -> 180° East -> 270° South)
    if (step < 4) {
      const angle = angles[step];
      state.activeAngleIndex = step;
      if (threeTurntableRig) threeTurntableRig.setAngleDegrees(angle);

      document.querySelectorAll('.angle-pill-btn').forEach((b, i) => b.classList.toggle('active', i === step));
      document.querySelectorAll('.quadrant-mobile-box').forEach((b, i) => b.classList.toggle('active', i === step));

      badge.textContent = `${isFil ? 'CCW: Inaayos ang Focus' : 'CCW: Focusing'} ${cardinalNames[step]}`;
      badge.className = 'badge-tag tag-warning';

      step++;
      return;
    }

    // Phase 2: Clockwise Return-to-Home Rewind (270° South -> 0° North)
    if (step === 4) {
      badge.textContent = isFil ? 'CW: Ibinabalik sa 0°...' : 'CW: Rewinding to 0°...';
      badge.className = 'badge-tag tag-warning';
      
      state.activeAngleIndex = 0;
      if (threeTurntableRig) threeTurntableRig.setAngleDegrees(0);

      document.querySelectorAll('.angle-pill-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
      document.querySelectorAll('.quadrant-mobile-box').forEach((b, i) => b.classList.toggle('active', i === 0));

      step++;
      return;
    }

    // Phase 3: Scan Complete
    clearInterval(interval);
    state.isScanning = false;
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="play-circle"></i> ${isFil ? 'Simulan ang 360° Scan' : 'Start 360° Automated Scan'}`;
    badge.textContent = isFil ? 'Tapos na ang Scan (Naka-Home)' : 'Scan Complete (Home)';
    badge.className = 'badge-tag tag-healthy';
    renderIcons();
    runGeminiAnalysis();
    syncToFirestore('android');
  }, 3200);
}

// Photo Upload Triggering
function initUploads() {
  window.triggerUpload = function(angle) {
    const input = document.getElementById(`upload-${angle}`);
    if (input) input.click();
  };

  [0, 90, 180, 270].forEach(angle => {
    const input = document.getElementById(`upload-${angle}`);
    if (input) {
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imgEl = document.getElementById(`img-${angle}`);
            const placeholder = document.getElementById(`placeholder-${angle}`);
            imgEl.src = event.target.result;
            imgEl.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';

            const idx = [0, 90, 180, 270].indexOf(angle);
            if (idx !== -1) {
              state.quadrants[idx].img = event.target.result;
              // Reset any sample preset state so genuine user photo is analyzed
              state.activePreset = '';
              document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
              syncToFirestore('android');
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  });
}

// Preset Picker
function initPresets() {
  const chips = document.querySelectorAll('.preset-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      state.activePreset = chip.dataset.preset;
      applyPresetData(PRESETS[state.activePreset]);
      syncToFirestore('android');
    });
  });

  const triggerBtn = document.getElementById('preset-analyze-trigger-btn');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      switchScreen('scan');
      runGeminiAnalysis();
    });
  }
}

function applyPresetData(preset) {
  document.getElementById('img-0').src = preset.img0;
  document.getElementById('img-0').style.display = 'block';
  document.getElementById('placeholder-0').style.display = 'none';

  document.getElementById('img-90').src = preset.img90;
  document.getElementById('img-90').style.display = 'block';
  document.getElementById('placeholder-90').style.display = 'none';

  document.getElementById('img-180').src = preset.img180;
  document.getElementById('img-180').style.display = 'block';
  document.getElementById('placeholder-180').style.display = 'none';

  document.getElementById('img-270').src = preset.img270;
  document.getElementById('img-270').style.display = 'block';
  document.getElementById('placeholder-270').style.display = 'none';

  state.analysis.healthScore = preset.score;
  state.analysis.statusText = preset.statusText;
  state.analysis.summaryText = preset.summary;
  state.analysis.leafStatus = preset.leafStatus;
  state.analysis.leafTagClass = preset.leafTag;
  state.analysis.leafFindings = preset.leafFindings;
  state.analysis.fruitStatus = preset.fruitStatus;
  state.analysis.fruitTagClass = preset.fruitTag;
  state.analysis.fruitFindings = preset.fruitFindings;
  if (preset.organicRecs) state.analysis.organicRecs = preset.organicRecs;

  renderReportUI();
}

function renderReportUI() {
  const isFil = state.lang === 'fil';
  const a = state.analysis;
  const score = a.healthScore !== undefined ? a.healthScore : 0;

  const scoreEl = document.getElementById('health-score-val');
  if (scoreEl) scoreEl.textContent = `${score}%`;
  
  const circle = document.getElementById('health-score-circle');
  const scoreContainer = document.getElementById('health-score-container');
  if (circle) {
    if (score === 0) {
      circle.style.strokeDashoffset = 201;
      circle.style.stroke = 'rgba(255, 255, 255, 0.2)';
      if (scoreContainer) scoreContainer.className = 'health-score-container no-scan';
    } else {
      const offset = 201 - (201 * score) / 100;
      circle.style.strokeDashoffset = offset;
      circle.style.stroke = score >= 80 ? '#10b981' : (score >= 55 ? '#f59e0b' : '#ef4444');
      if (scoreContainer) scoreContainer.className = 'health-score-container';
    }
  }

  const headingEl = document.getElementById('health-status-heading');
  if (headingEl) {
    headingEl.textContent = typeof a.statusText === 'object' ? (a.statusText[state.lang] || a.statusText.en) : a.statusText;
  }

  const descEl = document.getElementById('health-summary-desc');
  if (descEl) {
    descEl.textContent = typeof a.summaryText === 'object' ? (a.summaryText[state.lang] || a.summaryText.en) : a.summaryText;
  }

  // Leaf Breakdown
  const leafTag = document.getElementById('leaf-status-tag');
  if (leafTag) {
    leafTag.textContent = typeof a.leafStatus === 'object' ? (a.leafStatus[state.lang] || a.leafStatus.en) : a.leafStatus;
    leafTag.className = `badge-tag ${a.leafTagClass || (score === 0 ? 'tag-dimmed' : 'tag-healthy')}`;
  }

  const leafList = document.getElementById('leaf-findings-list');
  if (leafList) {
    const leafArr = a.leafFindings ? (a.leafFindings[state.lang] || a.leafFindings.en || a.leafFindings) : [];
    if (Array.isArray(leafArr)) {
      const isWarnOrBad = a.leafTagClass === 'tag-danger' || a.leafTagClass === 'tag-warning' || score < 60;
      const iconName = isWarnOrBad ? 'alert-triangle' : (score === 0 ? 'info' : 'check-circle');
      const iconStyle = isWarnOrBad ? 'style="color:var(--accent-red,#ef4444);"' : (score === 0 ? 'style="color:var(--text-muted);"' : 'style="color:var(--accent-green,#10b981);"');
      leafList.innerHTML = leafArr.map(f => `<li><i data-lucide="${iconName}" ${iconStyle}></i> ${f}</li>`).join('');
    }
  }

  // Fruit Breakdown
  const fruitTag = document.getElementById('fruit-status-tag');
  if (fruitTag) {
    fruitTag.textContent = typeof a.fruitStatus === 'object' ? (a.fruitStatus[state.lang] || a.fruitStatus.en) : a.fruitStatus;
    fruitTag.className = `badge-tag ${a.fruitTagClass || (score === 0 ? 'tag-dimmed' : 'tag-healthy')}`;
  }

  const fruitList = document.getElementById('fruit-findings-list');
  if (fruitList) {
    const fruitArr = a.fruitFindings ? (a.fruitFindings[state.lang] || a.fruitFindings.en || a.fruitFindings) : [];
    if (Array.isArray(fruitArr)) {
      const isWarnOrBad = a.fruitTagClass === 'tag-danger' || a.fruitTagClass === 'tag-warning' || score < 60;
      const iconName = isWarnOrBad ? 'alert-triangle' : (score === 0 ? 'info' : 'check-circle');
      const iconStyle = isWarnOrBad ? 'style="color:var(--accent-red,#ef4444);"' : (score === 0 ? 'style="color:var(--text-muted);"' : 'style="color:var(--accent-green,#10b981);"');
      fruitList.innerHTML = fruitArr.map(f => `<li><i data-lucide="${iconName}" ${iconStyle}></i> ${f}</li>`).join('');
    }
  }

  // Organic Care Recipes
  const recContainer = document.getElementById('organic-recipes-container');
  if (recContainer) {
    if (a.organicRecs && Array.isArray(a.organicRecs) && a.organicRecs.length > 0) {
      recContainer.innerHTML = a.organicRecs.map((r, i) => `
        <div class="recipe-card-item">
          <div class="recipe-emoji-icon">${r.icon || '🌱'}</div>
          <div class="recipe-body">
            <h4>${typeof r.title === 'object' ? (r.title[state.lang] || r.title.en) : r.title}</h4>
            <div class="recipe-sub">${typeof r.sub === 'object' ? (r.sub[state.lang] || r.sub.en) : r.sub}</div>
            <p>${typeof r.desc === 'object' ? (r.desc[state.lang] || r.desc.en) : r.desc}</p>
          </div>
        </div>
      `).join('');
    } else if (a.isCalamansi === false || a.healthScore === 0) {
      const isFil = state.lang === 'fil';
      recContainer.innerHTML = `
        <div class="recipe-card-item" style="border-left: 3px solid var(--accent-red, #ef4444);">
          <div class="recipe-emoji-icon">🍋</div>
          <div class="recipe-body">
            <h4>${isFil ? 'Itutok sa Puno ng Calamansi' : 'Aim Camera at Calamansi Tree'}</h4>
            <div class="recipe-sub">${isFil ? 'Kailangan ang Tamang Halaman' : 'Calamansi Target Required'}</div>
            <p>${isFil ? 'Mangyaring itutok ang scanner sa dahon, sanga, o bunga ng Calamansi upang makabuo ng angkop na organikong pataba at lunas.' : 'Please aim the 360° turret or upload images of Calamansi citrus foliage, fruit, or orchard soil to generate tailored organic recipes.'}</p>
          </div>
        </div>
      `;
    } else {
      const defaultRecs = [
        { icon: "☕", title: { en: "Used Coffee Grounds", fil: "Pinagkapan ng Kape" }, sub: { en: "Green Leaves & Growth", fil: "Luntiang Dahon at Paglaki" }, desc: { en: "Mix 2 tbsp of dried spent coffee grounds into topsoil every 2 weeks.", fil: "Maghalo ng 2 kutsarang tuyong kape sa lupa kada 2 linggo." } },
        { icon: "🥚", title: { en: "Crushed Eggshells", fil: "Binudburang Balat ng Itlog" }, sub: { en: "Strong Roots & Flowering", fil: "Matibay na Ugat at Bulaklak" }, desc: { en: "Boil and crush eggshells. Mix 2 tbsp powder with 1L water.", fil: "Pakuluan at durugin ang balat ng itlog. Ihalo sa 1L tubig." } },
        { icon: "🍌", title: { en: "Banana Peel Tea", fil: "Pinakuluang Balat ng Saging" }, sub: { en: "Juicy Calamansi Fruit", fil: "Makatás at Malaking Bunga" }, desc: { en: "Chop 3 banana peels and soak in 1L water for 3 days.", fil: "Hiwain ang 3 balat ng saging at ibabad sa 1L tubig nang 3 araw." } }
      ];
      recContainer.innerHTML = defaultRecs.map(r => `
        <div class="recipe-card-item">
          <div class="recipe-emoji-icon">${r.icon || '🌱'}</div>
          <div class="recipe-body">
            <h4>${typeof r.title === 'object' ? (r.title[state.lang] || r.title.en) : r.title}</h4>
            <div class="recipe-sub">${typeof r.sub === 'object' ? (r.sub[state.lang] || r.sub.en) : r.sub}</div>
            <p>${typeof r.desc === 'object' ? (r.desc[state.lang] || r.desc.en) : r.desc}</p>
          </div>
        </div>
      `).join('');
    }
  }

  renderIcons();
}

let isAnalyzingGemini = false;
let lastSavedReportSignature = '';
let lastSavedReportTimestamp = 0;

function safeParseGeminiJSON(rawText) {
  if (!rawText) return null;
  let text = rawText.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    text = text.substring(firstBrace, lastBrace + 1);
  }
  try {
    return JSON.parse(text);
  } catch (err1) {
    try {
      const repaired = text.replace(/,\s*([\}\]])/g, '$1');
      return JSON.parse(repaired);
    } catch (err2) {
      console.warn('[Gemini AI Android] JSON parse recovery note:', err2);
      return null;
    }
  }
}

// Helper to convert any image path (blob, local relative, or data URL) to base64 inlineData
async function ensureImageBase64(imgSrc) {
  if (!imgSrc || typeof imgSrc !== 'string' || imgSrc.trim() === '') return null;
  if (imgSrc.startsWith('data:image/')) return imgSrc;
  try {
    const res = await fetch(imgSrc);
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return null;
  }
}

async function runGeminiAnalysis() {
  if (isAnalyzingGemini) {
    console.log('[Gemini AI Android] Analysis already in progress. Skipping duplicate execution.');
    return;
  }
  isAnalyzingGemini = true;

  const btn = document.getElementById('analyze-gemini-btn');
  const isFil = state.lang === 'fil';

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader" class="spin"></i> <span>${isFil ? 'Sinusuri...' : 'Analyzing...'}</span>`;
    renderIcons();
  }

  // Ensure all 4 quadrant buffers are mapped from active DOM if empty
  [0, 90, 180, 270].forEach((angle, idx) => {
    const imgEl = document.getElementById(`img-${angle}`);
    if (imgEl && imgEl.src && imgEl.src !== window.location.href && (!state.quadrants[idx].img || state.quadrants[idx].img === '')) {
      state.quadrants[idx].img = imgEl.src;
    }
  });

  const hasImages = state.quadrants.some(q => q.img && q.img.trim() !== '');

  // If actual images are loaded (from live scan or photo upload), strictly reset preset mode
  if (hasImages) {
    state.activePreset = '';
    document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
  }

  if (!hasImages && !state.activePreset) {
    state.analysis.isCalamansi = false;
    state.analysis.healthScore = 0;
    state.analysis.statusText = { en: 'No Scan / Image Available', fil: 'Walang Larawan' };
    state.analysis.summaryText = {
      en: 'Please capture a 360° scan using the motorized turret or upload Calamansi leaf/fruit photos before running Gemini AI analysis.',
      fil: 'Mangyaring kumuha muna ng 360° scan o mag-upload ng larawan ng dahon/bunga ng Calamansi bago magsuri.'
    };
    state.analysis.leafStatus = { en: 'Awaiting Target', fil: 'Naghihintay' };
    state.analysis.leafTagClass = 'tag-warning';
    state.analysis.leafFindings = {
      en: ['No image uploaded or captured in the quadrant slots.'],
      fil: ['Walang larawang nailagay sa mga quadrant.']
    };
    state.analysis.fruitStatus = { en: 'Awaiting Target', fil: 'Naghihintay' };
    state.analysis.fruitTagClass = 'tag-warning';
    state.analysis.fruitFindings = {
      en: ['No image uploaded or captured in the quadrant slots.'],
      fil: ['Walang larawang nailagay sa mga quadrant.']
    };
    state.analysis.treatment = {
      type: 'warn',
      title: { en: 'Target Required', fil: 'Kailangan ang Kuha' },
      desc: { en: 'Start a 360° scan to acquire multi-angle photos of the Calamansi canopy.', fil: 'Magsimula ng 360° scan upang makakuha ng larawan sa 4 na anggulo.' }
    };
    state.analysis.organicRecs = [];
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="sparkles"></i> <span>${isFil ? 'Gemini AI' : 'Gemini AI'}</span>`;
      renderIcons();
    }
    isAnalyzingGemini = false;
    renderReportUI();
    return;
  }

  const GEMINI_API_KEY = (import.meta.env.VITE_GEMINI_API_KEY || 'AQ.Ab8RN6IG2Wtdn7md0POEmYmHH3jpDbdrXmbS5m3_Fvx4EEmayQ').trim();

  try {
    const promptText = `You are an expert precision plant pathologist and computer vision agronomist specializing strictly in Philippine Calamansi (Citrus microcarpa / Citrofortunella microcarpa) citrus trees, foliar canopies, citrus fruits, and orchard soil.

MANDATORY TARGET VALIDATION RULE:
First, inspect the provided image(s) carefully. You must verify whether the image shows genuine Calamansi citrus tree components (leaves, twigs, fruits, flowers, tree canopy) or orchard soil surrounding a citrus tree.
- IF the images DO NOT contain a Calamansi citrus tree or its orchard environment (e.g. human face/body, room interior, animal, household items, electronics, furniture, vehicle, random indoor objects, or an unrelated non-citrus plant):
  1. Set "isCalamansi": false.
  2. Set "healthScore": 0.
  3. Set "statusText": { "en": "Invalid Target (Not Calamansi / Soil)", "fil": "Hindi Calamansi o Lupa (Maling Kuha)" }.
  4. Set "summaryText": { "en": "The captured frames do not contain a Calamansi (Citrus microcarpa) citrus tree, leaves, fruit, or orchard soil. Diagnostic evaluation is strictly calibrated for Calamansi to prevent false readings. Please aim the camera at a Calamansi tree.", "fil": "Ang mga nakuha o na-upload na larawan ay hindi kinikilalang puno ng Calamansi o lupa ng taniman. Ang pagsusuri ay para lamang sa Calamansi. Mangyaring itutok ang scanner sa puno ng Calamansi." }.
  5. Set "leafStatus": { "en": "Non-Citrus Target", "fil": "Hindi Calamansi" }, "leafTagClass": "tag-danger", "leafFindings": { "en": ["Target in frame is not identified as Calamansi foliage.", "No citrus foliar canopy structure recognized.", "Diagnostic disease evaluation aborted."], "fil": ["Ang bagay sa larawan ay hindi dahon ng Calamansi.", "Walang nakitang sanga o dahon ng sitrus.", "Itinigil ang pagsusuri dahil hindi ito Calamansi."] }.
  6. Set "fruitStatus": { "en": "No Citrus Detected", "fil": "Walang Calamansi" }, "fruitTagClass": "tag-danger", "fruitFindings": { "en": ["No Citrus microcarpa fruit clusters detected.", "Target is not citrus fruit."], "fil": ["Walang nakitang bunga ng Calamansi.", "Maling bagay ang nasa larawan."] }.
  7. Set "treatment": { "type": "bad", "title": { "en": "Aim at Calamansi Tree", "fil": "Itutok sa Calamansi" }, "desc": { "en": "Please point the 360° foliar scanner at a live Calamansi citrus tree or upload Calamansi leaf/fruit photos to receive disease diagnostics.", "fil": "Itutok ang camera sa totoong puno ng Calamansi upang makakuha ng tamang gamot at alaga." } }.
  8. Set "organicRecs": [].

- IF the images DO contain a Calamansi citrus tree (foliage, fruits, or orchard soil):
  1. Set "isCalamansi": true.
  2. Evaluate the 4 perspectives (0° North, 90° West, 180° East, 270° South) in combination with current environmental telemetry (${state.location}, Temp: ${state.weather.temp}°C, Humidity: ${state.weather.humidity}%, Rain Chance: ${state.weather.rainChance}%).
  3. Inspect for Citrus Canker (raised corky halo lesions), Fruit Scab (Elsinoë fawcettii pustules), Melanose (sandpaper spots), Chlorosis (interveinal yellowing), Citrus Leaf Miner (silvery serpentine mines), Scale Insects & Sooty Mold, or Healthy canopy.
  4. Compute an accurate healthScore (1-100).
  5. Detail specific angle-based leafFindings, fruitFindings, treatment protocol, and 3 tailored zero-cost DIY organic recipes (e.g. coffee grounds, eggshells, banana tea, neem spray) along with rain/irrigation advisory.

Respond ONLY in valid JSON format with this exact structure:
{
  "isCalamansi": true,
  "healthScore": 88,
  "statusText": { "en": "Vibrant & Healthy", "fil": "Napakamalusog at Maganda" },
  "summaryText": { "en": "Multi-angle vision indicates glossy chlorophyll density and no visible lesions.", "fil": "Ang pagsusuri sa 4 na anggulo ay nagpapakita ng malusog na dahon at walang sakit." },
  "leafStatus": { "en": "Healthy", "fil": "Malusog" },
  "leafTagClass": "tag-healthy",
  "leafFindings": {
    "en": ["Normal dark green glossy surface detected across all 4 angles.", "No chlorosis or interveinal mottle observed.", "Free from citrus leaf miner serpentine trails."],
    "fil": ["Makintab at kulay berde ang mga dahon sa 360° scan.", "Walang paninilaw sa gitna ng mga dahon.", "Ligtas sa uod at leaf miner."]
  },
  "fruitStatus": { "en": "Optimal", "fil": "Pinakamaganda" },
  "fruitTagClass": "tag-healthy",
  "fruitFindings": {
    "en": ["Peel texture is uniform and intact with rich essential oil glands.", "Zero citrus scab lesions or melanose pustules detected."],
    "fil": ["Makinis ang balat at juicy ang loob ng bunga.", "Walang sugat ng kurikong o kanser."]
  },
  "treatment": {
    "type": "good",
    "title": { "en": "Routine Care Protocol", "fil": "Regular na Alaga" },
    "desc": { "en": "Maintain regular watering and apply organic neem spray bi-weekly.", "fil": "Panatilihin ang tamang pagdilig at mag-spray ng neem oil tuwing 2 linggo." }
  },
  "organicRecs": [
    {
      "icon": "☕",
      "title": { "en": "Used Coffee Grounds", "fil": "Pinagkapan ng Kape" },
      "sub": { "en": "Green Leaves & Growth", "fil": "Luntiang Dahon at Paglaki" },
      "desc": { "en": "Mix 2 tbsp of dried spent coffee grounds into topsoil every 2 weeks.", "fil": "Maghalo ng 2 kutsarang tuyong kape sa lupa kada 2 linggo." }
    }
  ],
  "weatherAdvisory": {
    "rainDesc": { "en": "Rain expected this afternoon. Hold organic sprays for 48 hours.", "fil": "Inaasahan ang ulan ngayong hapon. Ipagpaliban ang pag-spray." },
    "irrigationDesc": { "en": "Apply 5 Liters of drip irrigation per tree early morning.", "fil": "Magdilig ng 5 Litro ng tubig kada puno tuwing umaga." }
  }
}
Note: leafTagClass and fruitTagClass must be one of: 'tag-healthy', 'tag-warning', or 'tag-danger'. treatment.type must be one of: 'good', 'warn', or 'bad'.`;

    const parts = [{ text: promptText }];
    
    // Add images (base64 inlineData) to prompt for all 4 quadrants
    for (const q of state.quadrants) {
      if (q.img && q.img.trim() !== '') {
        const b64 = await ensureImageBase64(q.img);
        if (b64 && b64.startsWith('data:image/')) {
          const mimeType = b64.split(';')[0].split(':')[1];
          const base64Data = b64.split(',')[1];
          parts.push({
            inlineData: { mimeType, data: base64Data }
          });
        }
      }
    }

    let rawText = null;

    // Supported Google Gemini Flash vision models in priority order
    const candidateModels = [
      'gemini-flash-latest',
      'gemini-3.5-flash',
      'gemini-flash-lite-latest',
      'gemini-3.7-flash',
      'gemini-pro-latest',
      'gemini-2.5-flash-lite'
    ];

    // 1. Try Direct Google Generative Language API
    for (const model of candidateModels) {
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: {
              responseMimeType: 'application/json'
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            rawText = data.candidates[0].content.parts[0].text;
            console.log(`[Gemini AI Android] Successfully analyzed with model: ${model}`);
            break;
          }
        }
      } catch (directErr) {
        // Continue to next candidate model
      }
    }

    // 2. If direct call didn't succeed, try Backend Proxy Endpoints (VPS / Cloud / LAN)
    if (!rawText) {
      const proxyEndpoints = [
        'https://usisa.duckdns.org/api/gemini',
        'http://187.77.114.33/api/gemini',
        '/api/gemini'
      ];
      for (const endpoint of proxyEndpoints) {
        try {
          const proxyRes = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts }] })
          });
          if (proxyRes.ok) {
            const proxyData = await proxyRes.json();
            if (proxyData?.candidates?.[0]?.content?.parts?.[0]?.text) {
              rawText = proxyData.candidates[0].content.parts[0].text;
              console.log(`[Gemini AI Android] Successfully analyzed Plant Vision via Proxy: ${endpoint}`);
              break;
            }
          }
        } catch (proxyErr) {}
      }
    }

    if (rawText) {
      const parsed = safeParseGeminiJSON(rawText);
      if (parsed) {
        if (parsed.isCalamansi === false || parsed.healthScore === 0) {
          state.analysis.isCalamansi = false;
          state.analysis.healthScore = 0;
          state.analysis.statusText = parsed.statusText || { en: 'Invalid Target (Not Calamansi / Soil)', fil: 'Hindi Calamansi o Lupa (Maling Kuha)' };
          state.analysis.summaryText = parsed.summaryText || { en: 'The captured frames do not contain a recognized Calamansi citrus tree or orchard soil. Disease diagnostics aborted.', fil: 'Ang larawan ay hindi kinikilalang puno ng Calamansi o lupa ng taniman. Itinigil ang pagsusuri.' };
          state.analysis.leafStatus = parsed.leafStatus || { en: 'Non-Citrus Target', fil: 'Hindi Calamansi' };
          state.analysis.leafTagClass = parsed.leafTagClass || 'tag-danger';
          state.analysis.leafFindings = parsed.leafFindings || {
            en: ['Target in frame is not identified as Calamansi foliage.', 'Diagnostic evaluation halted.'],
            fil: ['Ang bagay sa larawan ay hindi dahon ng Calamansi.', 'Itinigil ang pagsusuri.']
          };
          state.analysis.fruitStatus = parsed.fruitStatus || { en: 'No Citrus Detected', fil: 'Walang Calamansi' };
          state.analysis.fruitTagClass = parsed.fruitTagClass || 'tag-danger';
          state.analysis.fruitFindings = parsed.fruitFindings || {
            en: ['No Calamansi fruit clusters detected.', 'Non-citrus target.'],
            fil: ['Walang nakitang bunga ng Calamansi.', 'Maling bagay ang nasa larawan.']
          };
          state.analysis.treatment = parsed.treatment || {
            type: 'bad',
            title: { en: 'Aim at Calamansi Tree', fil: 'Itutok sa Calamansi' },
            desc: { en: 'Please point the optical sensor at a live Calamansi citrus tree to receive AI plant health evaluation.', fil: 'Itutok ang camera sa totoong puno ng Calamansi upang masuri ang kalusugan nito.' }
          };
          state.analysis.organicRecs = [];
        } else {
          state.analysis.isCalamansi = true;
          if (parsed.healthScore !== undefined) state.analysis.healthScore = parsed.healthScore;
          if (parsed.statusText) state.analysis.statusText = parsed.statusText;
          if (parsed.summaryText) state.analysis.summaryText = parsed.summaryText;
          if (parsed.leafStatus) state.analysis.leafStatus = parsed.leafStatus;
          if (parsed.leafTagClass) state.analysis.leafTagClass = parsed.leafTagClass;
          if (parsed.leafFindings) state.analysis.leafFindings = parsed.leafFindings;
          if (parsed.fruitStatus) state.analysis.fruitStatus = parsed.fruitStatus;
          if (parsed.fruitTagClass) state.analysis.fruitTagClass = parsed.fruitTagClass;
          if (parsed.fruitFindings) state.analysis.fruitFindings = parsed.fruitFindings;
          if (parsed.treatment) state.analysis.treatment = parsed.treatment;
          if (parsed.organicRecs && Array.isArray(parsed.organicRecs)) state.analysis.organicRecs = parsed.organicRecs;
        }
      }
    } else {
      // ONLY apply sample preset fallback if user explicitly requested a preset AND has no live images
      if (!hasImages && state.activePreset && PRESETS[state.activePreset]) {
        const p = PRESETS[state.activePreset];
        state.analysis.isCalamansi = true;
        state.analysis.healthScore = p.score;
        state.analysis.statusText = p.statusText;
        state.analysis.summaryText = p.summary;
        state.analysis.leafStatus = p.leafStatus;
        state.analysis.leafTagClass = p.leafTag;
        state.analysis.leafFindings = p.leafFindings;
        state.analysis.fruitStatus = p.fruitStatus;
        state.analysis.fruitTagClass = p.fruitTag;
        state.analysis.fruitFindings = p.fruitFindings;
        if (p.treatment) state.analysis.treatment = p.treatment;
        if (p.organicRecs) state.analysis.organicRecs = p.organicRecs;
      } else {
        state.analysis.isCalamansi = false;
        state.analysis.healthScore = 0;
        state.analysis.statusText = { en: 'AI Connection Error (Check API Key)', fil: 'Hindi Makakonekta sa AI (Suriin ang API Key)' };
        state.analysis.summaryText = { en: 'Could not connect to Google Gemini Vision AI. Please verify your Gemini API key (must start with AIzaSy...) and internet connection.', fil: 'Hindi makakonekta sa Google Gemini AI. Pakisuri ang iyong Gemini API key (dapat nagsisimula sa AIzaSy...) at koneksyon sa internet.' };
        state.analysis.leafStatus = { en: 'Connection Failed', fil: 'Walang Koneksyon' };
        state.analysis.leafTagClass = 'tag-warning';
        state.analysis.leafFindings = {
          en: ['Could not reach Google Gemini Generative AI endpoints.', 'Verify that your Gemini API key is valid and starts with AIzaSy...'],
          fil: ['Hindi maabot ang Google Gemini AI.', 'Tiyaking tama ang API key (dapat nagsisimula sa AIzaSy...).']
        };
        state.analysis.fruitStatus = { en: 'Awaiting AI', fil: 'Naghihintay' };
        state.analysis.fruitTagClass = 'tag-warning';
        state.analysis.fruitFindings = {
          en: ['No AI diagnostic response received.'],
          fil: ['Walang natanggap na sagot mula sa AI.']
        };
        state.analysis.treatment = {
          type: 'warn',
          title: { en: 'Check Gemini API Key', fil: 'Suriin ang Gemini API Key' },
          desc: { en: 'Get a free API key at https://aistudio.google.com/app/apikey (starts with AIzaSy...) and put it in your .env as VITE_GEMINI_API_KEY.', fil: 'Kumuha ng libreng API key sa https://aistudio.google.com/app/apikey (nagsisimula sa AIzaSy...) at ilagay sa .env bilang VITE_GEMINI_API_KEY.' }
        };
        state.analysis.organicRecs = [];
      }
    }
  } catch (e) {
    console.warn('[Gemini AI Android] Notice:', e);
    if (!hasImages && state.activePreset && PRESETS[state.activePreset]) {
      const p = PRESETS[state.activePreset];
      state.analysis.isCalamansi = true;
      state.analysis.healthScore = p.score;
      state.analysis.statusText = p.statusText;
      state.analysis.summaryText = p.summary;
    } else {
      state.analysis.isCalamansi = false;
      state.analysis.healthScore = 0;
      state.analysis.statusText = { en: 'AI Service Error', fil: 'Error sa Koneksyon ng AI' };
      state.analysis.summaryText = { en: 'An error occurred while connecting to Gemini AI. Check your internet connection and API key.', fil: 'Nagkaroon ng problema sa pagkonekta sa Gemini AI. Pakisuri ang internet at API key.' };
      state.analysis.leafStatus = { en: 'Service Error', fil: 'May Problema' };
      state.analysis.leafTagClass = 'tag-warning';
      state.analysis.leafFindings = {
        en: ['Error communicating with AI service.'],
        fil: ['Nagka-error sa pakikipag-ugnayan sa AI.']
      };
      state.analysis.fruitStatus = { en: 'Service Error', fil: 'May Problema' };
      state.analysis.fruitTagClass = 'tag-warning';
      state.analysis.treatment = {
        type: 'warn',
        title: { en: 'Retry Gemini Analysis', fil: 'Subukang Muli ang AI' },
        desc: { en: 'Check your network connection and click Analyze with Gemini AI to retry.', fil: 'Suriin ang koneksyon at i-click muli ang Suriin Gamit ang Gemini AI.' }
      };
      state.analysis.organicRecs = [];
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="sparkles"></i> <span>${isFil ? 'Gemini AI' : 'Gemini AI'}</span>`;
      renderIcons();
    }
    isAnalyzingGemini = false;
  }

  // Update UI and trigger radial score animation
  renderReportUI();
  syncToFirestore('android');

  // Smoothly scroll down to the Diagnostic Report Card
  const reportCardEl = document.getElementById('health-score-container');
  if (reportCardEl) {
    reportCardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Automatically archive single unique Gemini AI diagnostic scan into Firestore 'scans' collection ONLY when genuine Calamansi and healthScore > 0
  if (state.analysis && state.analysis.isCalamansi === true && typeof state.analysis.healthScore === 'number' && state.analysis.healthScore > 0) {
    try {
      const quadSignature = state.quadrants.map(q => (q && q.img ? q.img.slice(0, 60) : '')).join('|');
      const signature = `${state.analysis.healthScore}_${quadSignature}`;
      const now = Date.now();

      if (signature !== lastSavedReportSignature || (now - lastSavedReportTimestamp) >= 45000) {
        lastSavedReportSignature = signature;
        lastSavedReportTimestamp = now;

        const p = PRESETS[state.activePreset];
        await addDoc(collection(db, 'scans'), {
          userEmail: state.currentUser ? state.currentUser.email : 'farmer@usisa.ai',
          rpiName: state.rpiName || 'RPi Detector 1',
          location: state.location || 'Mindoro, Philippines',
          weather: state.weather,
          preset: state.activePreset || 'android_ai_scan',
          healthScore: state.analysis.healthScore,
          statusText: state.analysis.statusText || (p?.statusText || 'Healthy'),
          summaryText: state.analysis.summaryText || (p?.summary || ''),
          leafStatus: state.analysis.leafStatus || 'Optimal',
          leafFindings: state.analysis.leafFindings || [],
          fruitStatus: state.analysis.fruitStatus || 'Optimal',
          fruitFindings: state.analysis.fruitFindings || [],
          autoScanTime: state.autoScanTime || '07:00',
          autoScanEnabled: state.autoScanEnabled,
          autoScanMode: state.autoScanMode || 'time',
          autoScanIntervalHours: state.autoScanIntervalHours || 6,
          quadrants: state.quadrants.map(q => ({ angle: q.angle, img: q.img })),
          timestamp: serverTimestamp()
        });
        console.log('[Gemini AI Android] Archived diagnostic scan to Firestore scans collection.');
      }
    } catch (archiveErr) {
      console.warn('[Gemini AI Android] Firestore history archive notice:', archiveErr);
    }
  }
}

// Geocoding helper using Open-Meteo Geocoding API
async function geocodeLocation(locationName) {
  if (!locationName || !locationName.trim()) {
    return { lat: 14.5995, lon: 120.9842, city: 'Manila' };
  }
  const cleanName = locationName.split(',')[0].trim();
  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanName)}&count=1&language=en&format=json`);
    if (geoRes.ok) {
      const geoData = await geoRes.json();
      if (geoData && geoData.results && geoData.results.length > 0) {
        return {
          lat: geoData.results[0].latitude,
          lon: geoData.results[0].longitude,
          city: geoData.results[0].name || cleanName
        };
      }
    }
  } catch (err) {
    console.warn('Geocoding search notice:', err);
  }
  return { lat: 14.5995, lon: 120.9842, city: locationName };
}

// Weather Integration via Open-Meteo API
async function initWeather() {
  const topWeatherBtn = document.getElementById('top-weather-btn');
  if (topWeatherBtn) {
    topWeatherBtn.addEventListener('click', () => {
      fetchLiveWeather('android');
    });
  }

  // Initial fetch on app start
  fetchLiveWeather('auto');

  // Automatic periodic weather refresh every 5 minutes
  setInterval(() => {
    fetchLiveWeather('auto');
  }, 5 * 60 * 1000);
}

async function fetchLiveWeather(triggerSource = 'auto') {
  const topWeatherBtn = document.getElementById('top-weather-btn');
  if (topWeatherBtn) {
    topWeatherBtn.classList.add('loading-spin');
    const icon = topWeatherBtn.querySelector('i, svg');
    if (icon) icon.classList.add('spin');
  }

  try {
    const coords = await geocodeLocation(state.location);
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&hourly=precipitation_probability,soil_moisture_0_to_1cm&timezone=auto&forecast_days=2`);

    if (res.ok) {
      const data = await res.json();
      if (data && data.current) {
        const currTemp = Math.round(data.current.temperature_2m * 10) / 10;
        const currHum = Math.round(data.current.relative_humidity_2m);
        const currRainMm = data.current.precipitation || 0;
        const code = data.current.weather_code || 0;

        let rainChance = 20;
        if (data.hourly && data.hourly.time && data.hourly.precipitation_probability) {
          const nowIso = new Date().toISOString().substring(0, 13);
          const hourIdx = data.hourly.time.findIndex(t => t.startsWith(nowIso));
          if (hourIdx !== -1 && data.hourly.precipitation_probability[hourIdx] !== undefined) {
            rainChance = data.hourly.precipitation_probability[hourIdx];
          } else {
            rainChance = data.hourly.precipitation_probability[0] || (currRainMm > 0 ? 85 : 25);
          }
        } else if (currRainMm > 0) {
          rainChance = 85;
        }

        let soilMoist = 60;
        if (data.hourly && data.hourly.soil_moisture_0_to_1cm && data.hourly.soil_moisture_0_to_1cm[0]) {
          soilMoist = Math.round(data.hourly.soil_moisture_0_to_1cm[0] * 100);
        } else {
          soilMoist = Math.min(95, Math.max(35, Math.round(55 + (currRainMm * 15) + (currHum * 0.1) - ((currTemp - 25) * 1.2))));
        }

        let condEn = 'Partly Cloudy';
        let condFil = 'Katamtamang Ulap';

        if (code === 0) {
          condEn = 'Clear Tropical Sun';
          condFil = 'Maliwanag na Kalangitan';
        } else if (code <= 3) {
          condEn = 'Partly Cloudy';
          condFil = 'Katamtamang Ulap';
        } else if (code >= 45 && code <= 48) {
          condEn = 'Foggy / Hazy';
          condFil = 'Mahamog / Maulap';
        } else if (code >= 51 && code <= 55) {
          condEn = 'Light Drizzle';
          condFil = 'Ambon / Mahinang Ulan';
        } else if (code >= 61 && code <= 65) {
          condEn = 'Rain Showers';
          condFil = 'May Ulan';
        } else if (code >= 80 && code <= 82) {
          condEn = 'Heavy Downpour';
          condFil = 'Malakas na Ulan';
        } else if (code >= 95) {
          condEn = 'Thunderstorm';
          condFil = 'Bagyo / Kidlat';
        } else {
          condEn = 'Cloudy Overhead';
          condFil = 'Maulap';
        }

        state.weather = {
          temp: currTemp,
          humidity: currHum,
          rainChance: rainChance,
          rainMm: currRainMm,
          soilMoisture: soilMoist,
          weatherCode: code,
          condition: { en: condEn, fil: condFil }
        };

        updateDynamicWeatherAdvisories();
        renderWeatherUI();

        if (triggerSource !== 'remote_sync') {
          syncToFirestore('android');
        }
      }
    }
  } catch (err) {
    console.warn('Android weather fetch notice:', err);
  } finally {
    if (topWeatherBtn) {
      setTimeout(() => {
        topWeatherBtn.classList.remove('loading-spin');
        const icon = topWeatherBtn.querySelector('i, svg');
        if (icon) icon.classList.remove('spin');
      }, 600);
    }
  }
}

function updateDynamicWeatherAdvisories() {
  const w = state.weather;
  const temp = typeof w.temp === 'number' ? w.temp : parseFloat(w.temp) || 29;
  const hum = typeof w.humidity === 'number' ? w.humidity : parseInt(w.humidity) || 75;
  const rain = typeof w.rainChance === 'number' ? w.rainChance : parseInt(w.rainChance) || 30;
  const soil = typeof w.soilMoisture === 'number' ? w.soilMoisture : parseInt(w.soilMoisture) || 60;

  // 1. Dynamic Sun & Evapotranspiration
  TRANSLATIONS.en['w-sun-desc'] = `Solar UV index active at ${temp}°C (${hum}% RH). Transpiration & sap flow rates are optimal for citrus leaf nutrient uptake.`;
  TRANSLATIONS.fil['w-sun-desc'] = `Sikat ng araw sa init na ${temp}°C (${hum}% RH). Angkop ang singaw ng halaman sa pag-absorb ng organikong sustansya.`;

  // 2. Dynamic Rainfall & Spray Delay Advisory
  if (rain >= 60 || (w.rainMm && w.rainMm > 0.5) || (w.weatherCode && w.weatherCode >= 51)) {
    TRANSLATIONS.en['w-rain-desc'] = `High rain probability detected (${rain}% / ${w.rainMm || 0}mm). Hold all foliar and organic neem sprays for 48 hours to prevent wash-off loss.`;
    TRANSLATIONS.fil['w-rain-desc'] = `Mataas ang tsansa ng ulan (${rain}% / ${w.rainMm || 0}mm). Ipagpaliban muna ang pag-spray ng neem oil o organikong lunas ng 48 oras upang hindi maanod.`;
  } else if (rain >= 30) {
    TRANSLATIONS.en['w-rain-desc'] = `Moderate rain probability (${rain}% chance). If applying foliar spray, do so early to ensure at least 4 hours of dry foliage.`;
    TRANSLATIONS.fil['w-rain-desc'] = `Katamtamang ulan (${rain}% tsansa). Mag-spray lamang sa umaga upang magkaroon ng 4 na oras na tuyong dahon bago umulan.`;
  } else {
    TRANSLATIONS.en['w-rain-desc'] = `Clear & dry forecast (${rain}% rain chance). Safe window for foliar spraying, pruning, and organic pest prevention.`;
    TRANSLATIONS.fil['w-rain-desc'] = `Maliwanag ang panahon (${rain}% tsansa ng ulan). Ligtas at magandang panahon para mag-spray ng organikong lunas at maghawi ng sanga.`;
  }

  // 3. Dynamic Irrigation Volume Recommendation
  if (soil > 75 || rain >= 70 || (w.rainMm && w.rainMm > 2)) {
    TRANSLATIONS.en['w-irr-desc'] = `Soil moisture is high (${soil}%). Suspend drip irrigation today to avoid root waterlogging and fungal collar rot.`;
    TRANSLATIONS.fil['w-irr-desc'] = `Basa ang lupa (${soil}%). Itigil muna ang pagdidilig ngayong araw upang maiwasan ang pagkabulok ng ugat ng Calamansi.`;
  } else if (temp >= 32 && rain < 30) {
    TRANSLATIONS.en['w-irr-desc'] = `High temperature (${temp}°C). Apply 7 to 8 Liters of drip irrigation per tree early morning (6:00 AM) to prevent leaf wilting.`;
    TRANSLATIONS.fil['w-irr-desc'] = `Mataas ang init (${temp}°C). Magdilig ng 7 hanggang 8 Litro kada puno maaga sa umaga (6:00 AM) upang hindi malanta ang mga dahon.`;
  } else if (soil < 45) {
    TRANSLATIONS.en['w-irr-desc'] = `Soil moisture is dry (${soil}%). Apply 6 Liters of deep root irrigation to replenish the root zone.`;
    TRANSLATIONS.fil['w-irr-desc'] = `Medyo tuyo ang lupa (${soil}%). Magdilig ng 6 na Litro ng tubig sa paligid ng puno para sa ugat.`;
  } else {
    TRANSLATIONS.en['w-irr-desc'] = `Apply 4 to 5 Liters of drip irrigation per tree early morning. Soil moisture (${soil}%) is in the healthy zone.`;
    TRANSLATIONS.fil['w-irr-desc'] = `Magdilig ng 4 hanggang 5 Litro ng tubig kada puno tuwing umaga. Malusog at sapat ang basa ng lupa (${soil}%).`;
  }
}

function renderWeatherUI() {
  const isFil = state.lang === 'fil';
  const w = state.weather;
  const temp = typeof w.temp === 'number' ? w.temp : parseFloat(w.temp) || 29;
  const hum = typeof w.humidity === 'number' ? w.humidity : parseInt(w.humidity) || 75;
  const rain = typeof w.rainChance === 'number' ? w.rainChance : parseInt(w.rainChance) || 30;
  const soil = typeof w.soilMoisture === 'number' ? w.soilMoisture : parseInt(w.soilMoisture) || 60;

  const tempEl = document.getElementById('w-temp');
  const humEl = document.getElementById('w-humidity');
  const rainEl = document.getElementById('w-rain');
  const soilEl = document.getElementById('w-soil');
  const rainAdvEl = document.getElementById('rain-advisory-text');
  const irrEl = document.getElementById('irrigation-text');

  if (tempEl) tempEl.textContent = `${temp}°C`;
  if (humEl) humEl.textContent = `${hum}% RH`;
  if (rainEl) {
    rainEl.textContent = `${rain}% ${isFil ? 'Tsansa' : 'Chance'}`;
  }
  if (soilEl) {
    const soilLabel = soil > 75 ? (isFil ? `${soil}% Basa` : `${soil}% Wet`) : (soil < 45 ? (isFil ? `${soil}% Tuyo` : `${soil}% Dry`) : (isFil ? `${soil}% Tamang Basa` : `${soil}% Optimal`));
    soilEl.textContent = soilLabel;
  }

  if (rainAdvEl) rainAdvEl.textContent = TRANSLATIONS[state.lang]['w-rain-desc'];
  if (irrEl) irrEl.textContent = TRANSLATIONS[state.lang]['w-irr-desc'];
}

// Real-Time Bi-Directional Auto-Sync
async function syncToFirestore(source = 'android') {
  if (isReceivingRemoteSync) return;
  try {
    const syncDocRef = doc(db, 'system_sync', 'latest_scan');
    const a = state.analysis;
    const p = PRESETS[state.activePreset];
    const syncPayload = {
      healthScore: a?.healthScore !== undefined ? a.healthScore : 0,
      statusText: a?.statusText || { en: 'No Scan Performed', fil: 'Walang Pagsusuri' },
      summaryText: a?.summaryText || { en: 'No scan data available yet. Please start a 360° scan or upload photos to run Gemini AI analysis.', fil: 'Wala pang datos ng scan. Simulan ang 360° scan o mag-upload ng larawan upang masuri ng Gemini AI.' },
      leafStatus: a?.leafStatus || { en: 'Awaiting Scan', fil: 'Naghihintay ng Scan' },
      leafTagClass: a?.leafTagClass || (a?.healthScore === 0 ? 'tag-dimmed' : 'tag-healthy'),
      leafFindings: a?.leafFindings || { en: ['No leaf scan data available yet.'], fil: ['Wala pang datos sa pagsusuri ng dahon.'] },
      fruitStatus: a?.fruitStatus || { en: 'Awaiting Scan', fil: 'Naghihintay ng Scan' },
      fruitTagClass: a?.fruitTagClass || (a?.healthScore === 0 ? 'tag-dimmed' : 'tag-healthy'),
      fruitFindings: a?.fruitFindings || { en: ['No fruit scan data available yet.'], fil: ['Wala pang datos sa pagsusuri ng bunga.'] },
      treatment: a?.treatment || null,
      organicRecs: a?.organicRecs || [],
      activePreset: state.activePreset,
      activeAngleIndex: state.activeAngleIndex,
      location: state.location,
      rpiName: state.rpiName,
      autoScanEnabled: state.autoScanEnabled,
      autoScanMode: state.autoScanMode,
      autoScanTime: state.autoScanTime,
      autoScanIntervalHours: state.autoScanIntervalHours,
      autoAnalyzeEnabled: state.autoAnalyzeEnabled,
      lastAutoScanIso: state.lastAutoScanIso,
      weather: state.weather,
      quadrants: [
        { angle: 0, img: state.quadrants[0]?.img || (state.activePreset && p ? p.img0 : '') },
        { angle: 90, img: state.quadrants[1]?.img || (state.activePreset && p ? p.img90 : '') },
        { angle: 180, img: state.quadrants[2]?.img || (state.activePreset && p ? p.img180 : '') },
        { angle: 270, img: state.quadrants[3]?.img || (state.activePreset && p ? p.img270 : '') }
      ],
      source: source,
      updatedAt: serverTimestamp(),
      updatedAtIso: new Date().toISOString()
    };
    await setDoc(syncDocRef, syncPayload, { merge: true });
    console.log('[Auto-Sync] Android successfully pushed state to Cloud Firestore.');
  } catch (err) {
    console.warn('[Auto-Sync] Android Firestore push notice:', err);
  }
}

function initRealtimeSync() {
  try {
    const syncDocRef = doc(db, 'system_sync', 'latest_scan');
    onSnapshot(syncDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.source && data.source !== 'android') {
          isReceivingRemoteSync = true;
          console.log('[Auto-Sync] Android received real-time sync from Web Dashboard:', data);

          if (data.location && data.location !== state.location) {
            state.location = data.location;
            localStorage.setItem('calamansi_location', data.location);
            const locEl = document.getElementById('cfg-location');
            if (locEl) locEl.value = data.location;
            fetchLiveWeather('remote_sync');
          }

          if (data.weather) {
            state.weather = data.weather;
            updateDynamicWeatherAdvisories();
            renderWeatherUI();
          }

          if (data.autoScanEnabled !== undefined) {
            state.autoScanEnabled = data.autoScanEnabled;
            localStorage.setItem('calamansi_auto_scan_enabled', data.autoScanEnabled);
            const toggle = document.getElementById('cfg-auto-scan-toggle');
            if (toggle) toggle.checked = data.autoScanEnabled;
            const container = document.getElementById('auto-scan-options-container');
            if (container) container.style.display = data.autoScanEnabled ? 'block' : 'none';
          }
          if (data.autoScanMode) {
            state.autoScanMode = data.autoScanMode;
            localStorage.setItem('calamansi_auto_scan_mode', data.autoScanMode);
            const timeBtn = document.getElementById('mode-time-btn');
            const intBtn = document.getElementById('mode-interval-btn');
            const timeBox = document.getElementById('sched-time-box');
            const intBox = document.getElementById('sched-interval-box');
            if (timeBtn && intBtn && timeBox && intBox) {
              timeBtn.classList.toggle('active', data.autoScanMode === 'time');
              intBtn.classList.toggle('active', data.autoScanMode === 'interval');
              timeBox.style.display = data.autoScanMode === 'time' ? 'block' : 'none';
              intBox.style.display = data.autoScanMode === 'interval' ? 'block' : 'none';
            }
          }
          if (data.autoScanTime) {
            state.autoScanTime = data.autoScanTime;
            localStorage.setItem('calamansi_auto_scan_time', data.autoScanTime);
            const timeInput = document.getElementById('cfg-auto-scan-time');
            if (timeInput) timeInput.value = data.autoScanTime;
          }
          if (data.autoScanIntervalHours) {
            state.autoScanIntervalHours = data.autoScanIntervalHours;
            localStorage.setItem('calamansi_auto_scan_interval', data.autoScanIntervalHours);
            const intSelect = document.getElementById('cfg-auto-scan-interval');
            if (intSelect) intSelect.value = String(data.autoScanIntervalHours);
          }
          if (data.autoAnalyzeEnabled !== undefined) {
            state.autoAnalyzeEnabled = data.autoAnalyzeEnabled;
            localStorage.setItem('calamansi_auto_analyze_enabled', data.autoAnalyzeEnabled);
            const aiToggle = document.getElementById('cfg-auto-ai-toggle');
            if (aiToggle) aiToggle.checked = data.autoAnalyzeEnabled;
          }
          if (data.lastAutoScanIso) {
            state.lastAutoScanIso = data.lastAutoScanIso;
            localStorage.setItem('calamansi_last_auto_scan_iso', data.lastAutoScanIso);
          }
          updateAutoScanUI();

          if (data.activePreset && PRESETS[data.activePreset]) {
            state.activePreset = data.activePreset;
            document.querySelectorAll('.preset-chip').forEach(c => {
              c.classList.toggle('active', c.dataset.preset === data.activePreset);
            });
          } else {
            state.activePreset = '';
            document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
          }

          if (data.activeAngleIndex !== undefined) {
            state.activeAngleIndex = data.activeAngleIndex;
            const angle = [0, 90, 180, 270][state.activeAngleIndex] || 0;
            if (threeTurntableRig) threeTurntableRig.setAngleDegrees(angle);
            document.querySelectorAll('.angle-pill-btn').forEach((b, i) => b.classList.toggle('active', i === state.activeAngleIndex));
            document.querySelectorAll('.quadrant-mobile-box').forEach((b, i) => b.classList.toggle('active', i === state.activeAngleIndex));
            const badge = document.getElementById('motor-status-badge');
            if (badge) badge.textContent = `Position: ${angle}°`;
          }

          if (data.quadrants && Array.isArray(data.quadrants)) {
            [0, 90, 180, 270].forEach((ang, idx) => {
              const q = data.quadrants[idx];
              if (q && q.img) {
                const imgEl = document.getElementById(`img-${ang}`);
                const placeholder = document.getElementById(`placeholder-${ang}`);
                if (imgEl) {
                  imgEl.src = q.img;
                  imgEl.style.display = 'block';
                }
                if (placeholder) placeholder.style.display = 'none';
              }
            });
          }

          if (data.healthScore !== undefined) {
            state.analysis.healthScore = data.healthScore;
            document.getElementById('health-score-val').textContent = `${data.healthScore}%`;
            const circle = document.getElementById('health-score-circle');
            const scoreContainer = document.getElementById('health-score-container');
            if (circle) {
              if (data.healthScore === 0) {
                circle.style.strokeDashoffset = 201;
                circle.style.stroke = 'rgba(255, 255, 255, 0.2)';
                if (scoreContainer) scoreContainer.className = 'health-score-container no-scan';
              } else {
                const offset = 201 - (201 * data.healthScore) / 100;
                circle.style.strokeDashoffset = offset;
                circle.style.stroke = data.healthScore >= 80 ? '#10b981' : (data.healthScore >= 55 ? '#f59e0b' : '#ef4444');
                if (scoreContainer) scoreContainer.className = 'health-score-container';
              }
            }
          }

          if (data.statusText) {
            document.getElementById('health-status-heading').textContent = typeof data.statusText === 'object' ? (data.statusText[state.lang] || data.statusText.en) : data.statusText;
          }
          if (data.summaryText) {
            document.getElementById('health-summary-desc').textContent = typeof data.summaryText === 'object' ? (data.summaryText[state.lang] || data.summaryText.en) : data.summaryText;
          }

          if (data.leafStatus) {
            const leafTag = document.getElementById('leaf-status-tag');
            if (leafTag) {
              leafTag.textContent = typeof data.leafStatus === 'object' ? (data.leafStatus[state.lang] || data.leafStatus.en) : data.leafStatus;
              leafTag.className = `badge-tag ${data.leafTagClass || (data.healthScore === 0 ? 'tag-dimmed' : 'tag-healthy')}`;
            }
          }

          if (data.leafFindings) {
            const leafList = document.getElementById('leaf-findings-list');
            const leafArr = (data.leafFindings[state.lang] || data.leafFindings.en || data.leafFindings);
            if (leafList && Array.isArray(leafArr)) {
              const iconName = data.healthScore === 0 ? 'info' : 'check-circle';
              const iconStyle = data.healthScore === 0 ? 'style="color:var(--text-muted);"' : '';
              leafList.innerHTML = leafArr.map(f => `<li><i data-lucide="${iconName}" ${iconStyle}></i> ${f}</li>`).join('');
            }
          }

          if (data.fruitStatus) {
            const fruitTag = document.getElementById('fruit-status-tag');
            if (fruitTag) {
              fruitTag.textContent = typeof data.fruitStatus === 'object' ? (data.fruitStatus[state.lang] || data.fruitStatus.en) : data.fruitStatus;
              fruitTag.className = `badge-tag ${data.fruitTagClass || (data.healthScore === 0 ? 'tag-dimmed' : 'tag-healthy')}`;
            }
          }

          if (data.fruitFindings) {
            const fruitList = document.getElementById('fruit-findings-list');
            const fruitArr = (data.fruitFindings[state.lang] || data.fruitFindings.en || data.fruitFindings);
            if (fruitList && Array.isArray(fruitArr)) {
              const iconName = data.healthScore === 0 ? 'info' : 'check-circle';
              const iconStyle = data.healthScore === 0 ? 'style="color:var(--text-muted);"' : '';
              fruitList.innerHTML = fruitArr.map(f => `<li><i data-lucide="${iconName}" ${iconStyle}></i> ${f}</li>`).join('');
            }
          }

          if (data.organicRecs && Array.isArray(data.organicRecs)) {
            const recContainer = document.getElementById('organic-recipes-container');
            if (recContainer) {
              recContainer.innerHTML = data.organicRecs.map(r => `
                <div class="recipe-card-item">
                  <div class="recipe-emoji-icon">${r.icon || '🌱'}</div>
                  <div class="recipe-body">
                    <h4>${typeof r.title === 'object' ? (r.title[state.lang] || r.title.en) : r.title}</h4>
                    <div class="recipe-sub">${typeof r.sub === 'object' ? (r.sub[state.lang] || r.sub.en) : r.sub}</div>
                    <p>${typeof r.desc === 'object' ? (r.desc[state.lang] || r.desc.en) : r.desc}</p>
                  </div>
                </div>
              `).join('');
            }
          }

          renderIcons();
          setTimeout(() => { isReceivingRemoteSync = false; }, 500);
        }
      }
    }, (err) => {
      console.warn('[Auto-Sync] Android Firestore listener error:', err);
    });
  } catch (e) {
    console.warn('[Auto-Sync] Android listener error:', e);
  }
}

// Actions & Settings
function initActions() {
  const geminiBtn = document.getElementById('analyze-gemini-btn');
  if (geminiBtn) geminiBtn.addEventListener('click', runGeminiAnalysis);

  const langEnBtn = document.getElementById('lang-en-btn');
  const langFilBtn = document.getElementById('lang-fil-btn');

  if (langEnBtn) langEnBtn.addEventListener('click', () => switchLanguage('en'));
  if (langFilBtn) langFilBtn.addEventListener('click', () => switchLanguage('fil'));

  // Populate settings inputs
  const rpiInputEl = document.getElementById('cfg-rpi-name');
  const locInputEl = document.getElementById('cfg-location');
  if (rpiInputEl) rpiInputEl.value = state.rpiName;
  if (locInputEl) locInputEl.value = state.location;

  // Auto Scan DOM setup
  const autoScanToggle = document.getElementById('cfg-auto-scan-toggle');
  const autoScanContainer = document.getElementById('auto-scan-options-container');
  const modeTimeBtn = document.getElementById('mode-time-btn');
  const modeIntervalBtn = document.getElementById('mode-interval-btn');
  const schedTimeBox = document.getElementById('sched-time-box');
  const schedIntervalBox = document.getElementById('sched-interval-box');
  const autoScanTimeInput = document.getElementById('cfg-auto-scan-time');
  const autoScanIntervalSelect = document.getElementById('cfg-auto-scan-interval');
  const autoAiToggle = document.getElementById('cfg-auto-ai-toggle');

  if (autoScanToggle) {
    autoScanToggle.checked = state.autoScanEnabled;
    if (autoScanContainer) {
      autoScanContainer.style.display = state.autoScanEnabled ? 'block' : 'none';
    }
    autoScanToggle.addEventListener('change', (e) => {
      state.autoScanEnabled = e.target.checked;
      localStorage.setItem('calamansi_auto_scan_enabled', state.autoScanEnabled);
      if (autoScanContainer) {
        autoScanContainer.style.display = state.autoScanEnabled ? 'block' : 'none';
      }
      updateAutoScanUI();
      syncToFirestore('android');
    });
  }

  if (autoScanTimeInput) {
    autoScanTimeInput.value = state.autoScanTime;
    const handleTimeChange = (e) => {
      state.autoScanTime = e.target.value;
      localStorage.setItem('calamansi_auto_scan_time', state.autoScanTime);
      updateAutoScanUI();
      syncToFirestore('android');
    };
    autoScanTimeInput.addEventListener('change', handleTimeChange);
    autoScanTimeInput.addEventListener('input', handleTimeChange);
  }

  if (autoScanIntervalSelect) {
    autoScanIntervalSelect.value = String(state.autoScanIntervalHours);
    autoScanIntervalSelect.addEventListener('change', (e) => {
      state.autoScanIntervalHours = parseInt(e.target.value, 10);
      localStorage.setItem('calamansi_auto_scan_interval', state.autoScanIntervalHours);
      updateAutoScanUI();
      syncToFirestore('android');
    });
  }

  if (autoAiToggle) {
    autoAiToggle.checked = state.autoAnalyzeEnabled;
    autoAiToggle.addEventListener('change', (e) => {
      state.autoAnalyzeEnabled = e.target.checked;
      localStorage.setItem('calamansi_auto_analyze_enabled', state.autoAnalyzeEnabled);
      syncToFirestore('android');
    });
  }

  if (modeTimeBtn && modeIntervalBtn) {
    modeTimeBtn.addEventListener('click', () => {
      state.autoScanMode = 'time';
      localStorage.setItem('calamansi_auto_scan_mode', 'time');
      modeTimeBtn.classList.add('active');
      modeIntervalBtn.classList.remove('active');
      if (schedTimeBox) schedTimeBox.style.display = 'block';
      if (schedIntervalBox) schedIntervalBox.style.display = 'none';
      updateAutoScanUI();
      syncToFirestore('android');
    });

    modeIntervalBtn.addEventListener('click', () => {
      state.autoScanMode = 'interval';
      localStorage.setItem('calamansi_auto_scan_mode', 'interval');
      modeIntervalBtn.classList.add('active');
      modeTimeBtn.classList.remove('active');
      if (schedIntervalBox) schedIntervalBox.style.display = 'block';
      if (schedTimeBox) schedTimeBox.style.display = 'none';
      updateAutoScanUI();
      syncToFirestore('android');
    });

    // Set initial mode visibility
    if (state.autoScanMode === 'interval') {
      modeIntervalBtn.classList.add('active');
      modeTimeBtn.classList.remove('active');
      if (schedIntervalBox) schedIntervalBox.style.display = 'block';
      if (schedTimeBox) schedTimeBox.style.display = 'none';
    } else {
      modeTimeBtn.classList.add('active');
      modeIntervalBtn.classList.remove('active');
      if (schedTimeBox) schedTimeBox.style.display = 'block';
      if (schedIntervalBox) schedIntervalBox.style.display = 'none';
    }
  }

  const saveSettingsBtn = document.getElementById('save-settings-btn');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const rpiInput = document.getElementById('cfg-rpi-name')?.value.trim() || 'RPi Detector 1';
      const locInput = document.getElementById('cfg-location')?.value.trim() || 'Manila, Philippines';

      localStorage.setItem('calamansi_rpi_name', rpiInput);
      localStorage.setItem('calamansi_location', locInput);
      state.rpiName = rpiInput;
      state.location = locInput;

      const autoTimeEl = document.getElementById('cfg-auto-scan-time');
      if (autoTimeEl && autoTimeEl.value) {
        state.autoScanTime = autoTimeEl.value;
        localStorage.setItem('calamansi_auto_scan_time', state.autoScanTime);
      }

      const autoToggleEl = document.getElementById('cfg-auto-scan-toggle');
      if (autoToggleEl) {
        state.autoScanEnabled = autoToggleEl.checked;
        localStorage.setItem('calamansi_auto_scan_enabled', state.autoScanEnabled);
      }

      const autoIntervalEl = document.getElementById('cfg-auto-scan-interval');
      if (autoIntervalEl) {
        state.autoScanIntervalHours = parseInt(autoIntervalEl.value, 10);
        localStorage.setItem('calamansi_auto_scan_interval', state.autoScanIntervalHours);
      }

      const autoAiEl = document.getElementById('cfg-auto-ai-toggle');
      if (autoAiEl) {
        state.autoAnalyzeEnabled = autoAiEl.checked;
        localStorage.setItem('calamansi_auto_analyze_enabled', state.autoAnalyzeEnabled);
      }

      // Immediately fetch live weather for the updated location
      fetchLiveWeather('android');

      syncToFirestore('android');
      updateAutoScanUI();
      alert(state.lang === 'fil' ? `Nai-save na ang mga setting sa Cloud Firestore! (${locInput})` : `Settings saved successfully to Cloud Firestore! (${locInput})`);
    });
  }

  const firestoreBtn = document.getElementById('save-firestore-btn');
  if (firestoreBtn) {
    firestoreBtn.addEventListener('click', async () => {
      try {
        const p = PRESETS[state.activePreset];
        await addDoc(collection(db, 'scans'), {
          userEmail: state.currentUser ? state.currentUser.email : 'anonymous',
          rpiName: state.rpiName,
          location: state.location,
          weather: state.weather,
          preset: state.activePreset || 'manual_scan',
          healthScore: state.analysis?.healthScore !== undefined ? state.analysis.healthScore : (p?.score || 0),
          statusText: state.analysis?.statusText || (p?.statusText || 'No Scan Performed'),
          summaryText: state.analysis?.summaryText || (p?.summary || ''),
          leafStatus: state.analysis?.leafStatus || 'Awaiting Scan',
          leafFindings: state.analysis?.leafFindings || [],
          fruitStatus: state.analysis?.fruitStatus || 'Awaiting Scan',
          fruitFindings: state.analysis?.fruitFindings || [],
          autoScanTime: state.autoScanTime || '07:00',
          autoScanEnabled: state.autoScanEnabled,
          autoScanMode: state.autoScanMode || 'time',
          autoScanIntervalHours: state.autoScanIntervalHours || 6,
          quadrants: [
            { angle: 0, img: state.quadrants[0]?.img || (p ? p.img0 : '') },
            { angle: 90, img: state.quadrants[1]?.img || (p ? p.img90 : '') },
            { angle: 180, img: state.quadrants[2]?.img || (p ? p.img180 : '') },
            { angle: 270, img: state.quadrants[3]?.img || (p ? p.img270 : '') }
          ],
          timestamp: serverTimestamp()
        });
        alert(state.lang === 'fil' ? 'Nai-save sa Firestore Cloud (kasama ang Oras at Datos)!' : 'Successfully saved scan report, schedule time & images to Firestore!');
      } catch (err) {
        alert('Firestore Save Notice: ' + err.message);
      }
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      signOut(auth).then(() => {
        window.location.replace('/login.html');
      });
    });
  }
}

function switchLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('calamansi_android_lang', lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  // Update dynamic weather text keys before applying translations
  updateDynamicWeatherAdvisories();

  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  renderReportUI();
  renderWeatherUI();
  updateAutoScanUI();
  if (state.currentUser) {
    initHistoryListener();
  }
}

function initAuth() {
  onAuthStateChanged(auth, (user) => {
    state.currentUser = user;
    const emailEl = document.getElementById('user-display-email');
    const avatarEl = document.getElementById('user-avatar-initials');

    if (user) {
      if (emailEl) emailEl.textContent = user.email;
      if (avatarEl) {
        const initials = user.displayName ? user.displayName.split(' ').map(n=>n[0]).join('').toUpperCase() : user.email.substring(0,2).toUpperCase();
        avatarEl.textContent = initials;
      }
      const brandEmailEl = document.getElementById('brand-menu-user-email');
      const brandAvatarEl = document.getElementById('brand-menu-user-initials');
      if (brandEmailEl) brandEmailEl.textContent = user.email || 'Cloud User';
      if (brandAvatarEl) brandAvatarEl.textContent = avatarEl?.textContent || 'US';

      // Start Real-Time Bi-Directional Cloud Auto-Sync & History Listener
      initRealtimeSync();
      initHistoryListener();
    } else {
      // Direct user immediately to the Login Page on app launch
      window.location.replace('/login.html');
    }
  });
}

// ========================================================================
// AUTOMATIC SCAN SCHEDULER ENGINE (FIRESTORE SYNCED - ANDROID)
// ========================================================================
let autoScanSchedulerTimer = null;
let lastTriggeredMinute = '';

function updateAutoScanUI() {
  const pill = document.getElementById('auto-scan-status-pill');
  const pillText = document.getElementById('auto-scan-pill-text');
  const previewText = document.getElementById('next-scan-preview-text');

  if (pill && pillText) {
    if (state.autoScanEnabled) {
      pill.classList.add('active');
      if (state.autoScanMode === 'time') {
        pillText.textContent = `${TRANSLATIONS[state.lang]['auto-scan-daily-at']} ${state.autoScanTime}`;
      } else {
        pillText.textContent = `${TRANSLATIONS[state.lang]['auto-scan-every']} ${state.autoScanIntervalHours}${TRANSLATIONS[state.lang]['hours-abbr']}`;
      }
    } else {
      pill.classList.remove('active');
      pillText.textContent = TRANSLATIONS[state.lang]['auto-scan-off'];
    }
  }

  if (previewText) {
    if (!state.autoScanEnabled) {
      previewText.textContent = TRANSLATIONS[state.lang]['next-scan-disabled'];
    } else if (state.autoScanMode === 'time') {
      previewText.textContent = `${TRANSLATIONS[state.lang]['next-scan-scheduled-at']} ${state.autoScanTime}`;
    } else {
      previewText.textContent = `${TRANSLATIONS[state.lang]['next-scan-interval-every']} ${state.autoScanIntervalHours} ${TRANSLATIONS[state.lang]['hours-abbr']}`;
    }
  }
}

function initAutoScanScheduler() {
  if (autoScanSchedulerTimer) clearInterval(autoScanSchedulerTimer);

  updateAutoScanUI();

  // Periodic check every 15 seconds
  autoScanSchedulerTimer = setInterval(() => {
    checkAndRunAutoScan();
  }, 15000);
}

function checkAndRunAutoScan() {
  if (!state.autoScanEnabled || state.isScanning) return;

  const now = new Date();
  const currentHours = String(now.getHours()).padStart(2, '0');
  const currentMinutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${currentHours}:${currentMinutes}`;
  const currentMinuteKey = `${now.toDateString()}_${currentTimeStr}`;

  if (state.autoScanMode === 'time') {
    if (currentTimeStr === state.autoScanTime && lastTriggeredMinute !== currentMinuteKey) {
      lastTriggeredMinute = currentMinuteKey;
      console.log(`[Auto-Scan Scheduler] Running daily automated scan scheduled for ${currentTimeStr}`);
      triggerScheduledAutoScan();
    }
  } else if (state.autoScanMode === 'interval') {
    const lastScanMs = state.lastAutoScanIso ? new Date(state.lastAutoScanIso).getTime() : 0;
    const intervalMs = state.autoScanIntervalHours * 60 * 60 * 1000;
    if (now.getTime() - lastScanMs >= intervalMs && lastTriggeredMinute !== currentMinuteKey) {
      lastTriggeredMinute = currentMinuteKey;
      console.log(`[Auto-Scan Scheduler] Running interval automated scan (every ${state.autoScanIntervalHours}h)`);
      triggerScheduledAutoScan();
    }
  }
}

async function triggerScheduledAutoScan() {
  state.lastAutoScanIso = new Date().toISOString();
  localStorage.setItem('calamansi_last_auto_scan_iso', state.lastAutoScanIso);

  // Trigger full 360° scan
  runFull360Scan();

  // If auto Gemini diagnosis is enabled, run diagnosis after scan completes (~8.5 seconds)
  if (state.autoAnalyzeEnabled) {
    setTimeout(() => {
      runGeminiAnalysis();
    }, 9000);
  }

  updateAutoScanUI();
  syncToFirestore('android');
}

// ========================================================================
// ========================================================================
// REAL-TIME CLOUD HISTORY LISTENER & REPORT MANAGEMENT (ANDROID)
// ========================================================================
let unsubscribeHistoryListener = null;
let isAndroidHistoryDelegationAttached = false;
let pendingAndroidDeleteDocId = null;

function openAndroidDeleteModal(docId) {
  pendingAndroidDeleteDocId = docId;
  const modal = document.getElementById('delete-confirm-modal');
  if (!modal) return;
  const isFil = state.lang === 'fil';
  
  const titleEl = document.getElementById('delete-modal-title');
  const descEl = document.getElementById('delete-modal-desc');
  const cancelBtn = document.getElementById('cancel-delete-modal-btn');
  const confirmBtn = document.getElementById('confirm-delete-modal-btn');
  
  if (titleEl) titleEl.textContent = isFil ? 'Burahin ang Ulat ng Scan?' : 'Delete Scan Report?';
  if (descEl) descEl.textContent = isFil 
    ? 'Sigurado ka bang nais mong burahin ang ulat na ito sa Cloud Firestore? Hindi na ito mababawi.'
    : 'Are you sure you want to permanently delete this report from Cloud Firestore? This action cannot be undone.';
  if (cancelBtn) cancelBtn.innerHTML = `<i data-lucide="x"></i> <span>${isFil ? 'Kanselahin' : 'Cancel'}</span>`;
  if (confirmBtn) {
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = `<i data-lucide="trash-2"></i> <span>${isFil ? 'Burahin' : 'Delete'}</span>`;
  }
  
  modal.style.display = 'flex';
  modal.classList.add('active');
  renderIcons();
}

function closeAndroidDeleteModal() {
  const modal = document.getElementById('delete-confirm-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
  }
  const confirmBtn = document.getElementById('confirm-delete-modal-btn');
  if (confirmBtn) {
    confirmBtn.disabled = false;
    const isFil = state.lang === 'fil';
    confirmBtn.innerHTML = `<i data-lucide="trash-2"></i> <span>${isFil ? 'Burahin' : 'Delete'}</span>`;
    renderIcons();
  }
  pendingAndroidDeleteDocId = null;
}

async function executeAndroidDeleteReport() {
  if (!pendingAndroidDeleteDocId) return;
  const docId = pendingAndroidDeleteDocId;
  const isFil = state.lang === 'fil';
  const confirmBtn = document.getElementById('confirm-delete-modal-btn');

  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> <span>${isFil ? 'Binubura...' : 'Deleting...'}</span>`;
    renderIcons();
  }

  const cardEl = document.getElementById(`history-card-${docId}`);
  if (cardEl) {
    cardEl.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    cardEl.style.opacity = '0.35';
    cardEl.style.pointerEvents = 'none';
    cardEl.style.transform = 'scale(0.97)';
  }

  try {
    await deleteDoc(doc(db, 'scans', docId));
    console.log('[History Android] Successfully deleted doc from Firestore:', docId);
    
    closeAndroidDeleteModal();

    if (cardEl) {
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'scale(0.85) translateY(-8px)';
      cardEl.style.maxHeight = '0px';
      cardEl.style.marginBottom = '0px';
      cardEl.style.paddingTop = '0px';
      cardEl.style.paddingBottom = '0px';
      cardEl.style.overflow = 'hidden';
      setTimeout(() => cardEl.remove(), 300);
    }
  } catch (err) {
    console.error('[History Android] Delete error:', err);
    alert((isFil ? 'Hindi mabura ang ulat: ' : 'Failed to delete report: ') + (err.message || err));
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = `<i data-lucide="trash-2"></i> <span>${isFil ? 'Burahin' : 'Delete'}</span>`;
      renderIcons();
    }
  }
}

window.deleteHistoryReport = openAndroidDeleteModal;
window.openAndroidDeleteModal = openAndroidDeleteModal;
window.closeAndroidDeleteModal = closeAndroidDeleteModal;
window.executeAndroidDeleteReport = executeAndroidDeleteReport;

function initHistoryListener() {
  const historyListEl = document.getElementById('history-reports-list');
  const countBadge = document.getElementById('history-count-badge');
  if (!historyListEl) return;

  // Bind modal buttons once
  const cancelBtn = document.getElementById('cancel-delete-modal-btn');
  if (cancelBtn && !cancelBtn.dataset.bound) {
    cancelBtn.dataset.bound = 'true';
    cancelBtn.addEventListener('click', closeAndroidDeleteModal);
  }

  const confirmBtn = document.getElementById('confirm-delete-modal-btn');
  if (confirmBtn && !confirmBtn.dataset.bound) {
    confirmBtn.dataset.bound = 'true';
    confirmBtn.addEventListener('click', executeAndroidDeleteReport);
  }

  const deleteModal = document.getElementById('delete-confirm-modal');
  if (deleteModal && !deleteModal.dataset.bound) {
    deleteModal.dataset.bound = 'true';
    deleteModal.addEventListener('click', (e) => {
      if (e.target === deleteModal) closeAndroidDeleteModal();
    });
  }

  if (!isAndroidHistoryDelegationAttached) {
    document.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.btn-delete-report');
      if (!deleteBtn) return;
      const docId = deleteBtn.dataset.id || deleteBtn.getAttribute('data-id');
      if (!docId) return;
      e.preventDefault();
      e.stopPropagation();
      openAndroidDeleteModal(docId);
    });
    isAndroidHistoryDelegationAttached = true;
  }

  if (unsubscribeHistoryListener) {
    unsubscribeHistoryListener();
  }

  try {
    const scansQuery = query(collection(db, 'scans'), orderBy('timestamp', 'desc'));
    unsubscribeHistoryListener = onSnapshot(scansQuery, (snapshot) => {
      const isFil = state.lang === 'fil';
      if (countBadge) {
        countBadge.textContent = `${snapshot.size} ${isFil ? 'Mga Ulat' : 'Reports'}`;
      }

      if (snapshot.empty) {
        historyListEl.innerHTML = `
          <div class="history-empty-state">
            <div class="history-empty-icon">
              <i data-lucide="inbox"></i>
            </div>
            <h4 data-i18n="history-empty-title">${isFil ? 'Walang Naka-save na Ulat' : 'No Saved Reports'}</h4>
            <p data-i18n="history-empty-desc">${isFil ? 'Magsagawa ng scan o pindutin ang "I-save sa Firestore Cloud" upang makita ang mga ulat dito.' : 'Perform a scan or tap "Save Scan to Firestore Cloud" to view archived reports here.'}</p>
          </div>
        `;
        renderIcons();
        return;
      }

      let html = '';
      snapshot.forEach(docSnap => {
        const d = docSnap.data();
        const docId = docSnap.id;

        let dateStr = isFil ? 'Kamakailan' : 'Recently Saved';
        if (d.timestamp && d.timestamp.toDate) {
          const dateObj = d.timestamp.toDate();
          dateStr = dateObj.toLocaleDateString(isFil ? 'fil-PH' : 'en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }

        const score = typeof d.healthScore === 'number' ? d.healthScore : 0;
        let scoreTagClass = 'tag-healthy';
        if (score === 0) scoreTagClass = 'tag-dimmed';
        else if (score < 55) scoreTagClass = 'tag-danger';
        else if (score < 80) scoreTagClass = 'tag-warning';

        const statusHeading = (typeof d.statusText === 'object' && d.statusText !== null) ? (d.statusText[state.lang] || d.statusText.en || (isFil ? 'Walang Pagsusuri' : 'No Scan Performed')) : (d.statusText || (isFil ? 'Walang Pagsusuri' : 'No Scan Performed'));
        const summaryDesc = (typeof d.summaryText === 'object' && d.summaryText !== null) ? (d.summaryText[state.lang] || d.summaryText.en || '') : (d.summaryText || '');
        const leafStr = (typeof d.leafStatus === 'object' && d.leafStatus !== null) ? (d.leafStatus[state.lang] || d.leafStatus.en || (isFil ? 'Naghihintay ng Scan' : 'Awaiting Scan')) : (d.leafStatus || (isFil ? 'Naghihintay ng Scan' : 'Awaiting Scan'));
        const fruitStr = (typeof d.fruitStatus === 'object' && d.fruitStatus !== null) ? (d.fruitStatus[state.lang] || d.fruitStatus.en || (isFil ? 'Naghihintay ng Scan' : 'Awaiting Scan')) : (d.fruitStatus || (isFil ? 'Naghihintay ng Scan' : 'Awaiting Scan'));

        // Quadrant thumbnails strip
        let quadHtml = '';
        if (d.quadrants && Array.isArray(d.quadrants) && d.quadrants.some(q => q && q.img)) {
          quadHtml = `
            <div class="history-quad-strip">
              ${d.quadrants.map(q => (q && q.img) ? `
                <div class="history-quad-thumb">
                  <img src="${q.img}" alt="${q.angle || 0}°" />
                  <span class="history-quad-tag">${q.angle || 0}°</span>
                </div>
              ` : `
                <div class="history-quad-thumb empty">
                  <i data-lucide="camera" style="width:14px; height:14px; opacity:0.4;"></i>
                  <span class="history-quad-tag">${(q && q.angle) || 0}°</span>
                </div>
              `).join('')}
            </div>
          `;
        }

        // Weather meta chip
        let weatherChip = '';
        if (d.weather) {
          const wTemp = d.weather.temp ? `${d.weather.temp}°C` : '';
          const wRain = d.weather.rainChance !== undefined ? `${d.weather.rainChance}% rain` : '';
          if (wTemp || wRain) {
            weatherChip = `<span class="history-meta-chip"><i data-lucide="cloud-sun"></i> ${wTemp} ${wRain}</span>`;
          }
        }

        // Auto Scan time chip
        let timeChip = '';
        if (d.autoScanTime) {
          timeChip = `<span class="history-meta-chip"><i data-lucide="clock"></i> Auto: ${d.autoScanTime}</span>`;
        }

        html += `
          <div class="m3-card history-card" id="history-card-${docId}">
            <div class="history-card-header">
              <div class="history-date-row">
                <i data-lucide="calendar"></i>
                <span>${dateStr}</span>
              </div>
              <div class="history-header-actions">
                <span class="badge-tag ${scoreTagClass}">${score}% Score</span>
                <button class="btn-delete-report" data-id="${docId}" onclick="window.openAndroidDeleteModal('${docId}')" type="button" title="${isFil ? 'Burahin ang Ulat' : 'Delete Report'}">
                  <i data-lucide="trash-2"></i>
                  <span>${isFil ? 'Burahin' : 'Delete'}</span>
                </button>
              </div>
            </div>

            <div class="history-meta-row">
              <span class="history-meta-chip"><i data-lucide="map-pin"></i> ${d.location || 'Mindoro, Philippines'}</span>
              ${weatherChip}
              ${timeChip}
            </div>

            <div class="history-diag-body">
              <h4 class="history-status-title">${statusHeading}</h4>
              <p class="history-summary-text">${summaryDesc}</p>
            </div>

            ${quadHtml}

            <div class="history-tags-row">
              <span class="badge-tag ${score === 0 ? 'tag-dimmed' : 'tag-healthy'}" style="font-size:10px;">
                🍃 ${leafStr}
              </span>
              <span class="badge-tag ${score === 0 ? 'tag-dimmed' : 'tag-healthy'}" style="font-size:10px;">
                🍋 ${fruitStr}
              </span>
            </div>
          </div>
        `;
      });

      historyListEl.innerHTML = html;
      renderIcons();
    }, (err) => {
      console.warn('History snapshot error:', err);
    });
  } catch (err) {
    console.warn('History listener initialization error:', err);
  }
}

