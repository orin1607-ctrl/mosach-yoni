/* =====================================================================
   קובץ ההגדרות של האתר – מוסך יוני, פחחות וצבע לרכב
   ---------------------------------------------------------------------
   זה הקובץ היחיד שצריך לערוך כדי לעדכן טלפון, וואטסאפ, כתובת, שעות
   פעילות, פרטי "אודות" ותמונות בגלריה.

   כללים:
   • כותבים רק בין המירכאות "..." ולא מוחקים פסיקים בסוף שורות.
   • שדה שנשאר ריק ("") יוצג באתר כ"להשלמה", והכפתורים שתלויים בו
     יישארו לא פעילים עד שימולא.
   • אחרי שמירה – מרעננים את הדפדפן כדי לראות את השינוי.
   ===================================================================== */

window.SITE_CONFIG = {

  /* ---------- פרטי העסק ---------- */
  business: {
    name: "מוסך יוני – פחחות וצבע לרכב",
    shortName: "מוסך יוני",

    // טלפון להתקשרות. לדוגמה: "050-1234567" או "03-1234567"
    phone: "053-4338601",

    // מספר וואטסאפ (נייד). לדוגמה: "050-1234567". אפשר להכניס אותו מספר כמו בטלפון.
    whatsapp: "053-4338601",

    // ההודעה שתופיע מוכנה בוואטסאפ כשלקוח לוחץ על הכפתור
    whatsappMessage: "שלום, הגעתי מהאתר של מוסך יוני ואשמח לקבל פרטים על תיקון לרכב.",

    // כתובת המוסך
    address: {
      street: "פלוטיצקי 3",
      city: "ראשון לציון",
      postalCode: ""   // לא חובה
    },

    // לא חובה: קישור "שיתוף" של המוסך מ-Google Maps (לדיוק הניווט).
    // אם ריק – הניווט ייבנה אוטומטית לפי הכתובת.
    mapsUrl: "",

    // לא חובה: קואורדינטות המוסך (מ-Google Maps, קליק ימני על הנקודה)
    geo: { lat: "", lng: "" },

    // לא חובה: אימייל
    email: "",

    // שעות פעילות. כל שורה: ימים + שעות. השאירו [] ריק עד שיוחלט.
    // דוגמה:
    // hours: [
    //   { days: "ראשון – חמישי", time: "08:00 – 17:00", schema: "Su-Th 08:00-17:00" },
    //   { days: "שישי",          time: "08:00 – 13:00", schema: "Fr 08:00-13:00" },
    //   { days: "שבת",           time: "סגור" }
    // ],
    hours: []
  },

  /* ---------- אודות המוסך ----------
     עובדות שיוצגו באזור "אודות". value ריק = יוצג "להשלמה".
     אפשר למחוק שורה שלא רלוונטית, או להוסיף שורה חדשה באותו מבנה. */
  aboutFacts: [
    { label: "ניסיון בענף הרכב", value: "קרוב ל־30 שנה" },
    { label: "תחום ההתמחות", value: "פחחות וצבע לרכב" },
    { label: "בעלי המקצוע במוסך", value: "" },
    { label: "הסמכות ורישיונות", value: "" },
    { label: "עבודה מול חברות ביטוח", value: "" }
  ],

  /* ---------- כתובת האתר ----------
     הכתובת שבה האתר יפורסם (משמש לקידום בגוגל ולשיתוף ברשתות). */
  siteUrl: "https://orin1607-ctrl.github.io/mosach-yoni/",

  /* ---------- תצוגת שדות חסרים ----------
     true  = שדות חסרים יוצגו כ"להשלמה" (מתאים לשלב הבנייה)
     false = שדות חסרים פשוט יוסתרו (מתאים לפני פרסום, אם עדיין חסר משהו) */
  showPlaceholders: false,

  /* ---------- מדידת פרסום (לא חובה) ----------
     מזהה Google Analytics 4 / Google Ads, לדוגמה "G-XXXXXXX" או "AW-XXXXXXX".
     כשריק – לא נטען שום קוד מעקב. */
  analyticsId: "",

  /* ---------- גלריית עבודות ----------
     להוספת תמונה אמיתית:
       1. שמים את קובץ התמונה בתיקייה images/gallery  (למשל bumper-1.jpg)
       2. מוסיפים שורה כאן (thumb לא חובה – תמונה מוקטנת לתצוגה ברשת):  { src: "images/gallery/bumper-1.jpg", title: "תיקון פגוש", alt: "תיאור קצר של התמונה", illustration: false },
     illustration: true  = תמונת המחשה (תסומן באתר "תמונת המחשה")
     illustration: false = עבודה אמיתית של המוסך
     wide: true (לא חובה) = תמונה רחבה (כפולה בגודלה)
     כדי להסיר תמונת המחשה – פשוט מוחקים את השורה שלה. */
  gallery: [
    { src: "images/gallery/before-repair.webp", thumb: "images/gallery/thumbs/before-repair.webp", title: "לפני תיקון פחחות", alt: "רכב עם פגוש קדמי פגוע לפני תיקון פחחות", illustration: true },
    { src: "images/gallery/after-repair.webp", thumb: "images/gallery/thumbs/after-repair.webp", title: "אחרי תיקון וצבע", alt: "מרכב רכב מבריק לאחר צביעה וליטוש", illustration: true },
    { src: "images/gallery/paint-booth.webp", thumb: "images/gallery/thumbs/paint-booth.webp", title: "תהליך צביעה בתא צבע", alt: "רכב מכוסה ומוכן לצביעה בתוך תא צבע מקצועי", illustration: true, wide: true },
    { src: "images/gallery/bumper-repair.webp", thumb: "images/gallery/thumbs/bumper-repair.webp", title: "תיקון פגוש", alt: "בעל מקצוע מתקן פגוש אחורי של רכב במוסך", illustration: true, wide: true },
    { src: "images/gallery/accident-damage.webp", thumb: "images/gallery/thumbs/accident-damage.webp", title: "נזקי תאונה", alt: "חזית רכב שנפגעה בתאונה לפני תיקון", illustration: true, wide: true },
    { src: "images/gallery/paint-prep.webp", thumb: "images/gallery/thumbs/paint-prep.webp", title: "הכנה לצבע", alt: "בעל מקצוע מכין חלק מרכב לצביעה", illustration: true },
    { src: "images/gallery/polishing.webp", thumb: "images/gallery/thumbs/polishing.webp", title: "ליטוש וגימור", alt: "ליטוש מרכב רכב לאחר צביעה", illustration: true },
    { src: "images/gallery/body-shop.webp", thumb: "images/gallery/thumbs/body-shop.webp", title: "מוסך פחחות וצבע", alt: "רכבים בתהליך תיקון במוסך פחחות וצבע מודרני", illustration: true, wide: true }
  ]
};
