import type { AppLanguage } from "@/lib/i18n";

type CopyCard = {
  title: string;
  description: string;
};

type FlowStep = {
  title: string;
  subtitle: string;
};

export interface AdvancedCopy {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  createBatchCta: string;
  farmerModeCta: string;
  quickActionLabel: string;
  openLabel: string;
  problemEyebrow: string;
  problemTitle: string;
  problemDescription: string;
  riskLabel: string;
  problemCards: CopyCard[];
  solutionEyebrow: string;
  solutionTitle: string;
  solutionDescription: string;
  solutionCards: CopyCard[];
  journeyCards: CopyCard[];
  trustEyebrow: string;
  trustTitle: string;
  trustDescription: string;
  trustCards: CopyCard[];
  shortcuts: Array<CopyCard & { href: string }>;
  flow: {
    badge: string;
    title: string;
    journeyLabel: string;
    steps: FlowStep[];
    chips: string[];
  };
}

const advancedCopy: Record<AppLanguage, AdvancedCopy> = {
  en: {
    heroBadge: "Advanced mode",
    heroTitle: "From Farm to Trust — Verified.",
    heroDescription:
      "Finca turns every agricultural batch into a visible journey, so origin, movement, and authenticity can be understood at a glance.",
    createBatchCta: "Create a batch",
    farmerModeCta: "Open farmer mode",
    quickActionLabel: "Quick action",
    openLabel: "Open",
    problemEyebrow: "Problem statement",
    problemTitle: "Supply chains break trust when the journey is hidden.",
    problemDescription: "Finca is built for the moment someone asks where a product really came from.",
    riskLabel: "Risk",
    problemCards: [
      {
        title: "Farmers lose fair-trade visibility",
        description: "Produce changes hands, but the grower often loses proof of value and origin."
      },
      {
        title: "Consumers cannot verify provenance",
        description: "Labels are easy to print and hard to audit without a trusted record."
      },
      {
        title: "Opaque handoffs invite manipulation",
        description: "When the trail is unclear, records can be changed after the product moves."
      }
    ],
    solutionEyebrow: "Solution",
    solutionTitle: "Origin proof becomes a product experience.",
    solutionDescription: "Finca keeps trust visible through linked records, synchronized views, and clear validation.",
    solutionCards: [
      {
        title: "One chain per batch",
        description: "Each agricultural batch has its own linked custody record from the first block onward."
      },
      {
        title: "Human view and chain view",
        description: "Timeline and blockchain views stay aligned so every audience sees the same journey."
      },
      {
        title: "Verification that speaks clearly",
        description: "Healthy chains glow green. Broken integrity turns the journey red immediately."
      }
    ],
    journeyCards: [
      {
        title: "1. Create a batch",
        description: "Record crop, farmer, and origin details to begin the trusted journey."
      },
      {
        title: "2. Add supply events",
        description: "Capture each handoff, shipment, and quality step as the next linked block."
      },
      {
        title: "3. Validate integrity",
        description: "Check whether the chain still holds together or if something has been altered."
      }
    ],
    trustEyebrow: "Trust model",
    trustTitle: "Confidence people can understand instantly.",
    trustDescription:
      "Finca keeps the story simple: where it started, who handled it, where it moved, and whether the chain still holds.",
    trustCards: [
      {
        title: "Visible chain history",
        description: "Every recorded handoff appears in order so the full path stays readable."
      },
      {
        title: "Integrity checks",
        description: "Validation confirms whether the journey is intact or if trust has been broken."
      }
    ],
    shortcuts: [
      {
        title: "Start origin record",
        description: "Capture crop, farmer, and source details in one trusted first step.",
        href: "/create-batch"
      },
      {
        title: "Continue the journey",
        description: "Add each handoff so the story stays current from farm to shelf.",
        href: "/add-event"
      },
      {
        title: "Check integrity",
        description: "Run validation and see instantly whether trust still holds together.",
        href: "/verify"
      }
    ],
    flow: {
      badge: "Trusted movement",
      title: "Every custody handoff is visible.",
      journeyLabel: "Journey flow",
      steps: [
        { title: "Farm", subtitle: "Harvest recorded" },
        { title: "Processing", subtitle: "Quality events logged" },
        { title: "Transit", subtitle: "Movement anchored" },
        { title: "Retail", subtitle: "Shelf handoff tracked" },
        { title: "Trust", subtitle: "Integrity verified" }
      ],
      chips: ["Verified chain records", "Farm to shelf visibility", "Story view and chain view stay aligned"]
    }
  },
  hi: {
    heroBadge: "एडवांस मोड",
    heroTitle: "खेत से भरोसे तक — सत्यापित।",
    heroDescription: "Finca हर कृषि बैच की यात्रा को स्पष्ट बनाता है, ताकि उत्पत्ति, गति और प्रामाणिकता तुरंत समझी जा सके।",
    createBatchCta: "बैच बनाएं",
    farmerModeCta: "किसान मोड खोलें",
    quickActionLabel: "त्वरित क्रिया",
    openLabel: "खोलें",
    problemEyebrow: "समस्या",
    problemTitle: "जब यात्रा छिपी रहती है, सप्लाई चेन भरोसा तोड़ देती है।",
    problemDescription: "Finca उस सवाल के लिए बना है: यह उत्पाद वास्तव में कहाँ से आया?",
    riskLabel: "जोखिम",
    problemCards: [
      { title: "किसान निष्पक्ष व्यापार का प्रमाण खो देते हैं", description: "उत्पाद आगे बढ़ता है, लेकिन किसान के पास मूल्य और स्रोत का भरोसेमंद रिकॉर्ड नहीं रहता।" },
      { title: "उपभोक्ता स्रोत की पुष्टि नहीं कर पाते", description: "लेबल देखना आसान है, पर भरोसेमंद रिकॉर्ड के बिना सत्यापन कठिन है।" },
      { title: "अस्पष्ट हस्तांतरण में छेड़छाड़ आसान होती है", description: "जब रिकॉर्ड स्पष्ट नहीं होते, तो यात्रा बाद में बदली जा सकती है।" }
    ],
    solutionEyebrow: "समाधान",
    solutionTitle: "उत्पत्ति का प्रमाण ही उत्पाद अनुभव बन जाता है।",
    solutionDescription: "Finca जुड़े हुए रिकॉर्ड, समन्वित दृश्य और स्पष्ट सत्यापन से भरोसा दिखाता है।",
    solutionCards: [
      { title: "हर बैच की अपनी चेन", description: "हर कृषि बैच का अपना लिंक्ड कस्टडी रिकॉर्ड होता है।" },
      { title: "मानव दृश्य और चेन दृश्य", description: "टाइमलाइन और ब्लॉकचेन दृश्य एक ही यात्रा दिखाते हैं।" },
      { title: "स्पष्ट सत्यापन", description: "स्वस्थ चेन हरी चमकती है, और टूटने पर यात्रा लाल दिखती है।" }
    ],
    journeyCards: [
      { title: "1. बैच बनाएं", description: "फसल, किसान और स्रोत दर्ज करके भरोसेमंद यात्रा शुरू करें।" },
      { title: "2. सप्लाई इवेंट जोड़ें", description: "हर हस्तांतरण, शिपमेंट और जांच को अगले लिंक्ड ब्लॉक की तरह दर्ज करें।" },
      { title: "3. अखंडता जांचें", description: "देखें कि चेन सुरक्षित है या कहीं बदलाव हुआ है।" }
    ],
    trustEyebrow: "भरोसा मॉडल",
    trustTitle: "ऐसा भरोसा जिसे लोग तुरंत समझ लें।",
    trustDescription: "Finca कहानी को सरल रखता है: शुरुआत कहाँ हुई, किसने संभाला, कहाँ गया, और क्या चेन अभी भी सुरक्षित है।",
    trustCards: [
      { title: "दिखाई देने वाला चेन इतिहास", description: "हर दर्ज हैंडऑफ क्रम में दिखाई देता है, इसलिए पूरी यात्रा समझ आती है।" },
      { title: "अखंडता जांच", description: "सत्यापन बताता है कि यात्रा सुरक्षित है या भरोसा टूट चुका है।" }
    ],
    shortcuts: [
      { title: "उत्पत्ति रिकॉर्ड शुरू करें", description: "फसल, किसान और स्रोत को पहले भरोसेमंद कदम में दर्ज करें।", href: "/create-batch" },
      { title: "यात्रा जारी रखें", description: "हर हैंडऑफ जोड़ें ताकि कहानी खेत से शेल्फ तक पूरी रहे।", href: "/add-event" },
      { title: "अखंडता जांचें", description: "सत्यापन चलाएँ और तुरंत स्थिति देखें।", href: "/verify" }
    ],
    flow: {
      badge: "विश्वसनीय प्रवाह",
      title: "हर कस्टडी हैंडऑफ दिखाई देता है।",
      journeyLabel: "यात्रा प्रवाह",
      steps: [
        { title: "खेत", subtitle: "कटाई दर्ज" },
        { title: "प्रसंस्करण", subtitle: "गुणवत्ता इवेंट दर्ज" },
        { title: "परिवहन", subtitle: "गतिविधि जोड़ी गई" },
        { title: "खुदरा", subtitle: "शेल्फ हस्तांतरण दर्ज" },
        { title: "भरोसा", subtitle: "अखंडता सत्यापित" }
      ],
      chips: ["सत्यापित चेन रिकॉर्ड", "खेत से शेल्फ दृश्यता", "स्टोरी व्यू और चेन व्यू साथ रहते हैं"]
    }
  },
  ta: {
    heroBadge: "மேம்பட்ட நிலை",
    heroTitle: "பண்ணையிலிருந்து நம்பிக்கைக்கு — உறுதி செய்யப்பட்டது.",
    heroDescription: "Finca ஒவ்வொரு வேளாண்மை தொகுதியின் பயணத்தையும் தெளிவாக காட்டுகிறது, அதனால் தொடக்கம், நகர்வு மற்றும் நம்பகத்தன்மை உடனே புரியும்.",
    createBatchCta: "தொகுதி உருவாக்கு",
    farmerModeCta: "விவசாயி நிலையைத் திற",
    quickActionLabel: "விரைவு செயல்",
    openLabel: "திற",
    problemEyebrow: "சிக்கல்",
    problemTitle: "பயணம் மறைந்தால் சப்ளை செயின் நம்பிக்கையை உடைக்கும்.",
    problemDescription: "Finca ஒரு கேள்விக்காக உருவாக்கப்பட்டது: இது உண்மையில் எங்கிருந்து வந்தது?",
    riskLabel: "ஆபத்து",
    problemCards: [
      { title: "விவசாயிகள் நியாய வணிகத் தடயத்தை இழக்கிறார்கள்", description: "பொருள் நகர்கிறது, ஆனால் விவசாயிக்கு அதன் மூலமும் மதிப்பும் நிரூபிக்க முடியாமல் போகிறது." },
      { title: "நுகர்வோர் மூலத்தை உறுதி செய்ய முடியாது", description: "லேபிள் பார்க்க எளிது, ஆனால் நம்பகமான பதிவின்றி சரிபார்க்க கடினம்." },
      { title: "மறைந்த மாற்றங்கள் கையாளலை சிக்கலாக்கும்", description: "பாதை தெளிவாக இல்லையென்றால், பதிவு பின்னர் மாற்றப்படலாம்." }
    ],
    solutionEyebrow: "தீர்வு",
    solutionTitle: "தொடக்கத்தின் சான்றே ஒரு அனுபவமாகிறது.",
    solutionDescription: "Finca இணைக்கப்பட்ட பதிவுகள், ஒத்திசைக்கப்பட்ட காட்சிகள் மற்றும் தெளிவான சரிபார்ப்பின் மூலம் நம்பிக்கையை காட்டுகிறது.",
    solutionCards: [
      { title: "ஒவ்வொரு தொகுதிக்கும் தனிச்சங்கிலி", description: "ஒவ்வொரு தொகுதியும் முதல் பிளாக்கிலிருந்து தனித்த கஸ்டடி பதிவைப் பெறுகிறது." },
      { title: "மனிதக் காட்சி மற்றும் சங்கிலிக் காட்சி", description: "டைம்லைன் மற்றும் பிளாக்செயின் காட்சி ஒரே பயணத்தை காட்டுகின்றன." },
      { title: "தெளிவான சரிபார்ப்பு", description: "சரியான சங்கிலி பச்சையாகத் தெரியும், முறிவு ஏற்பட்டால் சிவப்பாக மாறும்." }
    ],
    journeyCards: [
      { title: "1. தொகுதி உருவாக்கு", description: "பயிர், விவசாயி, மூல இடம் ஆகியவற்றை பதிவு செய்து பயணத்தை தொடங்கு." },
      { title: "2. சப்ளை நிகழ்வுகளைச் சேர்", description: "ஒவ்வொரு மாற்றம், கப்பல் அனுப்பல், தரச் சோதனையையும் அடுத்த பிளாக்காகச் சேர்." },
      { title: "3. முழுமையைச் சரிபார்", description: "சங்கிலி இன்னும் முழுமையாக உள்ளதா என்பதைப் பார்." }
    ],
    trustEyebrow: "நம்பிக்கை மாதிரி",
    trustTitle: "ஒரே பார்வையில் புரியும் நம்பிக்கை.",
    trustDescription: "Finca கதையை எளிமைப்படுத்துகிறது: எங்கே தொடங்கியது, யார் கையாள்ந்தனர், எங்கே சென்றது, இன்னும் பாதுகாப்பாக உள்ளதா.",
    trustCards: [
      { title: "காணக்கூடிய சங்கிலி வரலாறு", description: "ஒவ்வொரு பதிவு செய்யப்பட்ட மாற்றமும் வரிசையாகத் தெரியும்." },
      { title: "முழுமைச் சோதனை", description: "சரிபார்ப்பு பயணம் பாதுகாப்பாக உள்ளதா அல்லது நம்பிக்கை முறிந்ததா என்பதைக் காட்டும்." }
    ],
    shortcuts: [
      { title: "தொடக்கப் பதிவு செய்", description: "பயிர், விவசாயி, மூலத்தை முதல் நம்பகமான கட்டமாக பதிவு செய்.", href: "/create-batch" },
      { title: "பயணத்தைத் தொடரு", description: "ஒவ்வொரு மாற்றத்தையும் சேர்த்து கதை முழுமையாக இருக்கச் செய்.", href: "/add-event" },
      { title: "முழுமையைச் சோதி", description: "சரிபார்ப்பை இயக்கி உடனே நிலையைப் பார்.", href: "/verify" }
    ],
    flow: {
      badge: "நம்பகமான நகர்வு",
      title: "ஒவ்வொரு கஸ்டடி மாற்றமும் தெளிவாகத் தெரியும்.",
      journeyLabel: "பயண ஓட்டம்",
      steps: [
        { title: "பண்ணை", subtitle: "அறுவடை பதிவு" },
        { title: "செயலாக்கம்", subtitle: "தர நிகழ்வுகள் பதிவு" },
        { title: "போக்குவரத்து", subtitle: "நகர்வு இணைக்கப்பட்டது" },
        { title: "சில்லறை", subtitle: "அலமாரி மாற்றம் பதிவு" },
        { title: "நம்பிக்கை", subtitle: "முழுமை உறுதி" }
      ],
      chips: ["உறுதி செய்யப்பட்ட சங்கிலி பதிவுகள்", "பண்ணையிலிருந்து அலமாரி வரை காட்சி", "கதை காட்சியும் சங்கிலிக் காட்சியும் ஒன்றாக இருக்கும்"]
    }
  },
  kn: {
    heroBadge: "ಅಡ್ವಾನ್ಸ್ಡ್ ಮೋಡ್",
    heroTitle: "ಹೊಲದಿಂದ ನಂಬಿಕೆಗೆ — ದೃಢೀಕರಿಸಲಾಗಿದೆ.",
    heroDescription: "Finca ಪ್ರತಿ ಕೃಷಿ ಬ್ಯಾಚ್‌ನ ಪ್ರಯಾಣವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ತೋರಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ಮೂಲ, ಚಲನೆ ಮತ್ತು ನೈಜತೆ ತಕ್ಷಣ ಅರ್ಥವಾಗುತ್ತದೆ.",
    createBatchCta: "ಬ್ಯಾಚ್ ರಚಿಸಿ",
    farmerModeCta: "ರೈತ ಮೋಡ್ ತೆರೆಯಿರಿ",
    quickActionLabel: "ತ್ವರಿತ ಕ್ರಿಯೆ",
    openLabel: "ತೆರೆಯಿರಿ",
    problemEyebrow: "ಸಮಸ್ಯೆ",
    problemTitle: "ಪ್ರಯಾಣ ಮರೆಮಾಡಿದಾಗ ಸರಪಳಿ ನಂಬಿಕೆಯನ್ನು ಕಳೆದುಕೊಳ್ಳುತ್ತದೆ.",
    problemDescription: "Finca ಒಂದು ಪ್ರಶ್ನೆಗೆ ಉತ್ತರ ಕೊಡಲು ಇದೆ: ಇದು ನಿಜವಾಗಿ ಎಲ್ಲಿ ಆರಂಭವಾಯಿತು?",
    riskLabel: "ಅಪಾಯ",
    problemCards: [
      { title: "ರೈತರಿಗೆ ನ್ಯಾಯವಾದ ಮೌಲ್ಯದ ದೃಶ್ಯತೆ ಸಿಗುವುದಿಲ್ಲ", description: "ಉತ್ಪನ್ನ ಮುಂದಕ್ಕೆ ಹೋಗುತ್ತದೆ, ಆದರೆ ರೈತನ ಬಳಿ ಮೂಲದ ದೃಢವಾದ ದಾಖಲೆ ಉಳಿಯುವುದಿಲ್ಲ." },
      { title: "ಗ್ರಾಹಕರು ಮೂಲವನ್ನು ಪರಿಶೀಲಿಸಲಾರರು", description: "ಲೇಬಲ್ ನೋಡುವುದು ಸುಲಭ, ಆದರೆ ವಿಶ್ವಾಸಾರ್ಹ ದಾಖಲೆ ಇಲ್ಲದೆ ದೃಢೀಕರಿಸುವುದು ಕಷ್ಟ." },
      { title: "ಅಸ್ಪಷ್ಟ ಹ್ಯಾಂಡ್ಆಫ್‌ಗಳು ಚೇಡಾಟಕ್ಕೆ ಅವಕಾಶ ಕೊಡುತ್ತವೆ", description: "ಮಾರ್ಗ ಸ್ಪಷ್ಟವಾಗದಿದ್ದರೆ, ದಾಖಲೆಗಳನ್ನು ನಂತರ ಬದಲಾಯಿಸಬಹುದು." }
    ],
    solutionEyebrow: "ಪರಿಹಾರ",
    solutionTitle: "ಮೂಲದ ಸಾಬೀತೇ ಅನುಭವವಾಗುತ್ತದೆ.",
    solutionDescription: "Finca ಜೋಡಿಸಲಾದ ದಾಖಲೆಗಳು, ಸಮನ್ವಿತ ವೀಕ್ಷಣೆಗಳು ಮತ್ತು ಸ್ಪಷ್ಟ ಪರಿಶೀಲನೆಯ ಮೂಲಕ ನಂಬಿಕೆಯನ್ನು ದೃಶ್ಯಗೊಳಿಸುತ್ತದೆ.",
    solutionCards: [
      { title: "ಪ್ರತಿ ಬ್ಯಾಚ್‌ಗೆ ಒಂದು ಸರಪಳಿ", description: "ಪ್ರತಿ ಕೃಷಿ ಬ್ಯಾಚ್ ತನ್ನದೇ ಲಿಂಕ್ ಆದ ಕಸ್ಟಡಿ ದಾಖಲೆಯನ್ನು ಹೊಂದಿರುತ್ತದೆ." },
      { title: "ಮಾನವ ದೃಷ್ಟಿ ಮತ್ತು ಚೈನ್ ದೃಷ್ಟಿ", description: "ಟೈಮ್‌ಲೈನ್ ಮತ್ತು ಬ್ಲಾಕ್‌ಚೈನ್ ಒಂದೇ ಪ್ರಯಾಣವನ್ನು ತೋರಿಸುತ್ತವೆ." },
      { title: "ಸ್ಪಷ್ಟ ಪರಿಶೀಲನೆ", description: "ಆರೋಗ್ಯಕರ ಸರಪಳಿ ಹಸಿರಾಗಿ ಹೊಳೆಯುತ್ತದೆ; ಮುರಿದರೆ ತಕ್ಷಣ ಕೆಂಪಾಗುತ್ತದೆ." }
    ],
    journeyCards: [
      { title: "1. ಬ್ಯಾಚ್ ರಚಿಸಿ", description: "ಬೆಳೆ, ರೈತ ಮತ್ತು ಮೂಲವನ್ನು ದಾಖಲಿಸಿ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ." },
      { title: "2. ಸರಪಳಿ ಈವೆಂಟ್ ಸೇರಿಸಿ", description: "ಪ್ರತಿ ಹ್ಯಾಂಡ್ಆಫ್, ಸಾಗಣೆ ಮತ್ತು ತಪಾಸಣೆಯನ್ನು ಮುಂದಿನ ಬ್ಲಾಕ್ ಆಗಿ ಸೇರಿಸಿ." },
      { title: "3. ಅಖಂಡತೆ ಪರಿಶೀಲಿಸಿ", description: "ಸರಪಳಿ ಇನ್ನೂ ಸುರಕ್ಷಿತವಾಗಿದೆಯೇ ನೋಡಿ." }
    ],
    trustEyebrow: "ನಂಬಿಕೆ ಮಾದರಿ",
    trustTitle: "ಒಂದು ನೋಟದಲ್ಲೇ ಅರ್ಥವಾಗುವ ವಿಶ್ವಾಸ.",
    trustDescription: "Finca ಕಥೆಯನ್ನು ಸರಳವಾಗಿರಿಸುತ್ತದೆ: ಎಲ್ಲಿಂದ ಆರಂಭವಾಯಿತು, ಯಾರು ನೋಡಿಕೊಂಡರು, ಎಲ್ಲಿ ಹೋಗಿತು, ಇನ್ನೂ ಸುರಕ್ಷಿತವಾಗಿದೆಯೇ.",
    trustCards: [
      { title: "ಗೋಚರಿಸುವ ಸರಪಳಿ ಇತಿಹಾಸ", description: "ಪ್ರತಿ ದಾಖಲಾಗಿರುವ ಹಂತ ಕ್ರಮವಾಗಿ ಕಾಣಿಸುತ್ತದೆ." },
      { title: "ಅಖಂಡತೆ ಪರಿಶೀಲನೆ", description: "ಪರಿಶೀಲನೆ ಪ್ರಯಾಣ ಸುರಕ್ಷಿತವೇ ಅಥವಾ ನಂಬಿಕೆ ಮುರಿದಿದೆಯೇ ಎಂದು ತಿಳಿಸುತ್ತದೆ." }
    ],
    shortcuts: [
      { title: "ಮೂಲ ದಾಖಲೆಯನ್ನು ಆರಂಭಿಸಿ", description: "ಬೆಳೆ, ರೈತ ಮತ್ತು ಮೂಲವನ್ನು ಮೊದಲ ವಿಶ್ವಾಸಾರ್ಹ ಹಂತದಲ್ಲಿ ದಾಖಲಿಸಿ.", href: "/create-batch" },
      { title: "ಪ್ರಯಾಣ ಮುಂದುವರಿಸಿ", description: "ಪ್ರತಿ ಹ್ಯಾಂಡ್ಆಫ್ ಸೇರಿಸಿ ಕಥೆಯನ್ನು ಸಂಪೂರ್ಣವಾಗಿಡಿ.", href: "/add-event" },
      { title: "ಅಖಂಡತೆ ಪರಿಶೀಲಿಸಿ", description: "ಪರಿಶೀಲನೆ ನಡೆಸಿ ತಕ್ಷಣ ಸ್ಥಿತಿ ನೋಡಿ.", href: "/verify" }
    ],
    flow: {
      badge: "ವಿಶ್ವಾಸಾರ್ಹ ಚಲನೆ",
      title: "ಪ್ರತಿ ಕಸ್ಟಡಿ ಹ್ಯಾಂಡ್ಆಫ್ ಗೋಚರಿಸುತ್ತದೆ.",
      journeyLabel: "ಪ್ರಯಾಣ ಹರಿವು",
      steps: [
        { title: "ಹೊಲ", subtitle: "ಕೊಯ್ಲು ದಾಖಲಾಗಿದೆ" },
        { title: "ಪ್ರಕ್ರಿಯೆ", subtitle: "ಗುಣಮಟ್ಟ ಈವೆಂಟ್ ದಾಖಲಾಗಿದೆ" },
        { title: "ಸಾಗಣೆ", subtitle: "ಚಲನೆ ಲಿಂಕ್ ಆಗಿದೆ" },
        { title: "ಮಾರಾಟ", subtitle: "ಶೆಲ್ಫ್ ಹ್ಯಾಂಡ್ಆಫ್ ದಾಖಲಾಗಿದೆ" },
        { title: "ನಂಬಿಕೆ", subtitle: "ಅಖಂಡತೆ ಪರಿಶೀಲನೆ" }
      ],
      chips: ["ದೃಢೀಕೃತ ಚೈನ್ ದಾಖಲೆಗಳು", "ಹೊಲದಿಂದ ಶೆಲ್ಫ್ ವರೆಗೆ ದೃಶ್ಯತೆ", "ಕಥೆ ಮತ್ತು ಚೈನ್ ವೀಕ್ಷಣೆ ಒಂದೇ ಆಗಿರುತ್ತವೆ"]
    }
  },
  ml: {
    heroBadge: "അഡ്വാൻസ്ഡ് മോഡ്",
    heroTitle: "കൃഷിയിടത്തിൽ നിന്ന് വിശ്വാസത്തിലേക്ക് — സ്ഥിരീകരിച്ചു.",
    heroDescription: "Finca ഓരോ കാർഷിക ബാച്ചിന്റെ യാത്രയും വ്യക്തമാക്കുന്നു, അതിലൂടെ ഉത്ഭവം, ഗതി, നൈജത്വം എളുപ്പം മനസ്സിലാക്കാം.",
    createBatchCta: "ബാച്ച് സൃഷ്ടിക്കുക",
    farmerModeCta: "കർഷക മോഡ് തുറക്കുക",
    quickActionLabel: "വേഗ പ്രവർത്തനം",
    openLabel: "തുറക്കുക",
    problemEyebrow: "പ്രശ്നം",
    problemTitle: "യാത്ര മറഞ്ഞാൽ സപ്ലൈ ചെയിൻ വിശ്വാസം നഷ്ടപ്പെടുന്നു.",
    problemDescription: "Finca ഒരു ചോദ്യം വ്യക്തമാക്കാൻ ആണ്: ഇത് യഥാർത്ഥത്തിൽ എവിടെ നിന്നാണ് വന്നത്?",
    riskLabel: "റിസ്ക്",
    problemCards: [
      { title: "കർഷകർക്ക് ന്യായവ്യാപാര ദൃശ്യമില്ല", description: "ഉൽപ്പന്നം മുന്നോട്ട് പോകുന്നു, പക്ഷേ കർഷകനോട് ഉറപ്പുള്ള ഉത്ഭവ രേഖ ഇല്ലാതാകുന്നു." },
      { title: "ഉപഭോക്താവിന് ഉറവിടം പരിശോധിക്കാൻ കഴിയില്ല", description: "ലേബൽ കാണുക എളുപ്പമാണ്, പക്ഷേ വിശ്വാസയോഗ്യമായ രേഖയില്ലാതെ ശരിവെക്കൽ ബുദ്ധിമുട്ടാണ്." },
      { title: "അസ്പഷ്ട കൈമാറ്റങ്ങൾ മാറ്റങ്ങൾക്ക് വഴി തുറക്കും", description: "പാത വ്യക്തമായില്ലെങ്കിൽ രേഖകൾ പിന്നീട് മാറ്റാം." }
    ],
    solutionEyebrow: "പരിഹാരം",
    solutionTitle: "ഉത്ഭവത്തിന്റെ തെളിവ് തന്നെ അനുഭവമാകുന്നു.",
    solutionDescription: "Finca ബന്ധിപ്പിച്ച രേഖകൾ, ഒത്തൊരുമിച്ച കാഴ്ചകൾ, വ്യക്തമായ പരിശോധന എന്നിവ കൊണ്ട് വിശ്വാസം ദൃശ്യമാക്കുന്നു.",
    solutionCards: [
      { title: "ഓരോ ബാച്ചിനും സ്വന്തം ചെയിൻ", description: "ഓരോ കാർഷിക ബാച്ചിനും ആദ്യ ബ്ലോക്കിൽ നിന്ന് സ്വന്തം ബന്ധിപ്പിച്ച കസ്റ്റഡി രേഖ ലഭിക്കും." },
      { title: "മനുഷ്യ കാഴ്ചയും ചെയിൻ കാഴ്ചയും", description: "ടൈംലൈൻയും ബ്ലോക്ക്ചെയിൻ കാഴ്ചയും ഒരേ യാത്ര കാണിക്കും." },
      { title: "വ്യക്തമായ പരിശോധന", description: "ശരി ആയ ചെയിൻ പച്ചയായി തെളിയും; തകരുമ്പോൾ ഉടൻ ചുവപ്പാകും." }
    ],
    journeyCards: [
      { title: "1. ബാച്ച് സൃഷ്ടിക്കുക", description: "വിള, കർഷകൻ, ഉറവിടം എന്നിവ രേഖപ്പെടുത്തി യാത്ര ആരംഭിക്കുക." },
      { title: "2. സപ്ലൈ ഇവന്റുകൾ ചേർക്കുക", description: "ഓരോ കൈമാറ്റവും, ഷിപ്പ്മെന്റും, പരിശോധനയും അടുത്ത ബ്ലോക്കായി ചേർക്കുക." },
      { title: "3. അഖണ്ഡത പരിശോധിക്കുക", description: "ചെയിൻ ഇപ്പോഴും സുരക്ഷിതമാണോ എന്ന് പരിശോധിക്കുക." }
    ],
    trustEyebrow: "വിശ്വാസ മാതൃക",
    trustTitle: "ഒറ്റനോട്ടത്തിൽ മനസ്സിലാകുന്ന ആത്മവിശ്വാസം.",
    trustDescription: "Finca കഥയെ ലളിതമാക്കുന്നു: എവിടെ തുടങ്ങി, ആരാണ് കൈകാര്യം ചെയ്തത്, എവിടെ പോയി, ഇനി സുരക്ഷിതമാണോ.",
    trustCards: [
      { title: "കാണാവുന്ന ചെയിൻ ചരിത്രം", description: "രേഖപ്പെടുത്തിയ ഓരോ കൈമാറ്റവും ക്രമത്തിൽ കാണാം." },
      { title: "അഖണ്ഡത പരിശോധന", description: "യാത്ര സുരക്ഷിതമാണോ, വിശ്വാസം തകര்ந்தോ എന്ന് പരിശോധന വ്യക്തമാക്കും." }
    ],
    shortcuts: [
      { title: "ഉത്ഭവ രേഖ ആരംഭിക്കുക", description: "വിള, കർഷകൻ, ഉറവിടം എന്നിവ ആദ്യ വിശ്വാസപൂർണ്ണ ഘട്ടത്തിൽ രേഖപ്പെടുത്തുക.", href: "/create-batch" },
      { title: "യാത്ര തുടരുക", description: "ഓരോ കൈമാറ്റവും ചേർത്ത് കഥ പൂർണ്ണമാക്കുക.", href: "/add-event" },
      { title: "അഖണ്ഡത പരിശോധിക്കുക", description: "പരിശോധന നടത്തി ഉടൻ നില കാണുക.", href: "/verify" }
    ],
    flow: {
      badge: "വിശ്വാസയോഗ്യമായ നീക്കം",
      title: "ഓരോ കസ്റ്റഡി കൈമാറ്റവും കാണാം.",
      journeyLabel: "യാത്ര പ്രവാഹം",
      steps: [
        { title: "ഫാം", subtitle: "കൊയ്ത്ത് രേഖപ്പെടുത്തി" },
        { title: "പ്രോസസ്സിംഗ്", subtitle: "ഗുണനിലവാര ഘട്ടങ്ങൾ രേഖപ്പെടുത്തി" },
        { title: "ഗതാഗതം", subtitle: "ചലനം ബന്ധിപ്പിച്ചു" },
        { title: "റീറ്റെയിൽ", subtitle: "ഷെൽഫ് കൈമാറ്റം രേഖപ്പെടുത്തി" },
        { title: "വിശ്വാസം", subtitle: "അഖണ്ഡത സ്ഥിരീകരിച്ചു" }
      ],
      chips: ["സ്ഥിരീകരിച്ച ചെയിൻ രേഖകൾ", "ഫാമിൽ നിന്ന് ഷെൽഫിലേക്കുള്ള ദൃശ്യമാനം", "കഥയും ചെയിൻ കാഴ്ചയും ഒരുമിച്ച് നിലനിൽക്കും"]
    }
  },
  te: {
    heroBadge: "అడ్వాన్స్‌డ్ మోడ్",
    heroTitle: "పొలం నుంచి నమ్మకానికి — ధృవీకరించబడింది.",
    heroDescription: "Finca ప్రతి వ్యవసాయ బ్యాచ్ ప్రయాణాన్ని స్పష్టంగా చూపిస్తుంది, కాబట్టి మూలం, కదలిక, నిజస్వరూపం వెంటనే అర్థమవుతాయి.",
    createBatchCta: "బ్యాచ్ సృష్టించు",
    farmerModeCta: "రైతు మోడ్ తెరువు",
    quickActionLabel: "త్వరిత చర్య",
    openLabel: "తెరువు",
    problemEyebrow: "సమస్య",
    problemTitle: "ప్రయాణం దాచిపెడితే సరఫరా గొలుసు నమ్మకాన్ని కోల్పోతుంది.",
    problemDescription: "Finca ఒక ప్రశ్నకు సమాధానం ఇవ్వడానికి ఉంది: ఇది నిజంగా ఎక్కడి నుంచి వచ్చింది?",
    riskLabel: "ప్రమాదం",
    problemCards: [
      { title: "రైతులకు న్యాయమైన విలువ కనిపించదు", description: "ఉత్పత్తి ముందుకు వెళ్తుంది, కానీ రైతు దగ్గర మూలానికి సంబంధించిన నమ్మదగిన రికార్డు ఉండదు." },
      { title: "వినియోగదారులు మూలాన్ని నిర్ధారించలేరు", description: "లేబుల్ చూడటం సులువు, కానీ విశ్వసనీయ రికార్డు లేకుండా ధృవీకరించడం కష్టం." },
      { title: "అస్పష్ట హ్యాండ్ఆఫ్‌లు మార్పులకు దారి తీస్తాయి", description: "మార్గం స్పష్టంగా లేకపోతే రికార్డులు తర్వాత మార్చబడవచ్చు." }
    ],
    solutionEyebrow: "పరిష్కారం",
    solutionTitle: "మూలానికి సంబంధించిన సాక్ష్యం అనుభవంగా మారుతుంది.",
    solutionDescription: "Finca లింక్ అయిన రికార్డులు, సమన్వయ దృశ్యాలు, స్పష్టమైన ధృవీకరణతో నమ్మకాన్ని చూపిస్తుంది.",
    solutionCards: [
      { title: "ప్రతి బ్యాచ్‌కు ఒక చైన్", description: "ప్రతి వ్యవసాయ బ్యాచ్‌కు మొదటి బ్లాక్ నుంచి తన స్వంత కస్టడీ రికార్డు ఉంటుంది." },
      { title: "మానవ దృశ్యం మరియు చైన్ దృశ్యం", description: "టైమ్‌లైన్ మరియు బ్లాక్‌చైన్ దృశ్యాలు ఒకే ప్రయాణాన్ని చూపిస్తాయి." },
      { title: "స్పష్టమైన ధృవీకరణ", description: "ఆరోగ్యకరమైన చైన్ పచ్చగా మెరిసుతుంది; విరిగితే వెంటనే ఎరుపు చూపిస్తుంది." }
    ],
    journeyCards: [
      { title: "1. బ్యాచ్ సృష్టించు", description: "పంట, రైతు, మూల స్థానాన్ని నమోదు చేసి ప్రయాణాన్ని ప్రారంభించు." },
      { title: "2. సరఫరా ఈవెంట్లు జోడించు", description: "ప్రతి హ్యాండ్ఆఫ్, రవాణా, తనిఖీని తదుపరి బ్లాక్‌గా జోడించు." },
      { title: "3. అఖండతను తనిఖీ చేయి", description: "చైన్ ఇంకా సురక్షితంగా ఉందా చూడి." }
    ],
    trustEyebrow: "నమ్మక మోడల్",
    trustTitle: "ఒక్క చూపులో అర్థమయ్యే విశ్వాసం.",
    trustDescription: "Finca కథను సులభంగా ఉంచుతుంది: ఎక్కడ ప్రారంభమైంది, ఎవరు నిర్వహించారు, ఎక్కడికి వెళ్లింది, ఇంకా భద్రంగా ఉందా.",
    trustCards: [
      { title: "కనిపించే చైన్ చరిత్ర", description: "నమోదైన ప్రతి హ్యాండ్ఆఫ్ క్రమంగా కనిపిస్తుంది." },
      { title: "అఖండత తనిఖీలు", description: "ప్రయాణం సురక్షితమా లేక నమ్మకం విరిగిందా అని ధృవీకరణ చెబుతుంది." }
    ],
    shortcuts: [
      { title: "మూల రికార్డు ప్రారంభించు", description: "పంట, రైతు, మూలాన్ని మొదటి నమ్మదగిన దశలో నమోదు చేయి.", href: "/create-batch" },
      { title: "ప్రయాణాన్ని కొనసాగించు", description: "ప్రతి హ్యాండ్ఆఫ్‌ను జోడించి కథను పూర్తిగా ఉంచు.", href: "/add-event" },
      { title: "అఖండతను తనిఖీ చేయి", description: "ధృవీకరణ నడిపి వెంటనే స్థితిని చూడి.", href: "/verify" }
    ],
    flow: {
      badge: "నమ్మదగిన ప్రయాణం",
      title: "ప్రతి కస్టడీ హ్యాండ్ఆఫ్ కనిపిస్తుంది.",
      journeyLabel: "ప్రయాణ ప్రవాహం",
      steps: [
        { title: "పొలం", subtitle: "పంట కోత నమోదు" },
        { title: "ప్రాసెసింగ్", subtitle: "నాణ్యత దశలు నమోదు" },
        { title: "రవాణా", subtitle: "కదలిక లింక్ చేయబడింది" },
        { title: "రిటైల్", subtitle: "షెల్ఫ్ హ్యాండ్ఆఫ్ నమోదు" },
        { title: "నమ్మకం", subtitle: "అఖండత ధృవీకరణ" }
      ],
      chips: ["ధృవీకరించిన చైన్ రికార్డులు", "పొలం నుంచి షెల్ఫ్ వరకు దృశ్యమానం", "కథ దృశ్యం మరియు చైన్ దృశ్యం కలిసే ఉంటాయి"]
    }
  }
};

export function getAdvancedCopy(language: AppLanguage) {
  return advancedCopy[language] ?? advancedCopy.en;
}
