document.addEventListener('DOMContentLoaded', function() {
    const trackingInput = document.getElementById('trackingInput');
    const courierItems = document.querySelectorAll('.courier-item');
    const mainTrackBtn = document.getElementById('mainTrackBtn');
    
    let selectedCourierUrl = null;

    // ฟังก์ชันเมื่อคลิกเลือกขนส่ง
    courierItems.forEach(item => {
        item.addEventListener('click', function() {
            // ลบ class 'selected' ออกจากตัวอื่นทั้งหมด
            courierItems.forEach(i => i.classList.remove('selected'));
            
            // เพิ่ม class 'selected' ให้ตัวที่คลิก
            this.classList.add('selected');
            
            // เก็บ URL ของขนส่งที่เลือกไว้ในตัวแปร
            selectedCourierUrl = this.getAttribute('data-url');
            
            // เปิดใช้งานปุ่มถ้ามีการเลือกขนส่งแล้ว
            checkButtonState();
        });
    });

    // ฟังก์ชันตรวจสอบ Input เพื่อเปิด/ปิดปุ่ม
    if (trackingInput) trackingInput.addEventListener('input', checkButtonState);
    
    function checkButtonState() {
        // ปุ่มจะกดได้ก็ต่อเมื่อ 1.เลือกขนส่งแล้ว และ 2.ช่อง input ไม่ว่าง
        if (selectedCourierUrl && trackingInput && trackingInput.value.trim() !== "") {
            mainTrackBtn.disabled = false;
        } else {
            mainTrackBtn.disabled = true;
        }
    }

    // ฟังก์ชันเมื่อกดปุ่มค้นหา
    if (mainTrackBtn) mainTrackBtn.addEventListener('click', function() {
        const trackingNumber = trackingInput.value.trim();
        
        if (!trackingNumber || !selectedCourierUrl) {
            alert("กรุณากรอกเลขพัสดุและเลือกผู้ให้บริการขนส่ง");
            return;
        }

        // สร้าง URL ปลายทางโดยเอา URL ขนส่ง + เลขพัสดุ
        // encodeURIComponent ใช้เพื่อป้องกันอักขระพิเศษในเลขพัสดุทำให้ URL พัง
        const finalUrl = selectedCourierUrl + encodeURIComponent(trackingNumber);
        
        // เปิดหน้าต่างใหม่ไปยัง URL นั้น
        window.open(finalUrl, '_blank'); 
        // หรือถ้าอยากให้เปิดในหน้าเดิมให้ใช้: window.location.href = finalUrl;
    });

    // Initialize language from localStorage or default to Thai
    const initialLang = localStorage.getItem('lang') || 'th';
    setLanguage(initialLang);
});

// Translations map for UI strings
const translations = {
    th: {
        'meta.title': 'Thai Logistics Pro - บริษัทขนส่งครบวงจร',
        'nav.home': 'หน้าแรก',
        'nav.services': 'บริการของเรา',
        'nav.features': 'จุดเด่น',
        'nav.contact': 'ติดต่อเรา',
        'nav.about': 'เกี่ยวกับเรา',
        'nav.terms': 'เงื่อนไขและข้อกำหนด',
        'hero.title': 'ส่งเร็ว ปลอดภัย ถึงมือผู้รับแน่นอน',
        'hero.desc': 'บริการขนส่งครบวงจร มาตรฐานระดับสากล พร้อมดูแลพัสดุของคุณทุกขั้นตอน',
        'tracking.placeholder': 'กรุณากรอกเลขพัสดุของคุณที่นี่... (เช่น TH123456789)',
        'tracking.courierTitle': 'เลือกผู้ให้บริการขนส่ง (จำเป็น):',
        'tracking.button': 'ค้นหาพัสดุ',
        'services.title': 'บริการของเรา',
        'services.desc': 'ตอบโจทย์ทุกความต้องการด้านการขนส่ง',
        'service.road.title': 'ขนส่งทางบกทั่วไทย',
        'service.road.desc': 'บริการ ส่งสินค้าทั่วทุกภาคของประเทศไทย รวดเร็ว ตรงเวลา',
        'service.air.title': 'ขนส่งระหว่างในประเทศ Cargo',
        'service.air.desc': 'บริการนำเข้า-ส่งออกทางอากาศ พร้อมบริการด้านพิธีการศุลกากร',
        'service.warehouse.title': 'คลังสินค้าและกระจายสินค้า',
        'service.warehouse.desc': 'บริการจัดเก็บ แพ็ค และกระจายสินค้า ด้วยระบบจัดการคลังสินค้าที่ทันสมัย',
        'features.title': 'ทำไมต้องเลือกเรา',
        'feature.speed.title': 'รวดเร็ว ตรงเวลา',
        'feature.speed.desc': 'เราให้ความสำคัญกับเวลาของคุณ ด้วยการบริหารจัดการเส้นทางที่มีประสิทธิภาพ',
        'feature.safe.title': 'ปลอดภัยสูงสุด',
        'feature.safe.desc': 'มั่นใจได้ด้วยระบบติดตาม GPS และประกันสินค้าเสียหาย',
        'feature.support.title': 'บริการลูกค้า ในทุกขั้นตอน',
        'feature.support.desc': 'ทีมงานซัพพอร์ตพร้อมช่วยเหลือและตอบคำถามของคุณตลอดเวลา',
        'cta.title': 'พร้อมเริ่มส่งของกับเราหรือยัง?',
        'cta.desc': 'ขอใบเสนอราคา หรือปรึกษาผู้เชี่ยวชาญของเราได้ฟรี',
        'cta.button': 'ขอใบเสนอราคาเลย'
    },
    en: {
        'meta.title': 'Thai Logistics Pro - Complete Logistics Services',
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.features': 'Features',
        'nav.contact': 'Contact',
        'nav.about': 'About Us',
        'nav.terms': 'Terms & Conditions',
        'hero.title': 'Fast, secure delivery to your recipient',
        'hero.desc': 'Comprehensive logistics services with international standards, taking care of your package every step of the way',
        'tracking.placeholder': 'Enter your tracking number here... (e.g. TH123456789)',
        'tracking.courierTitle': 'Choose a courier (required):',
        'tracking.button': 'Track Package',
        'services.title': 'Our Services',
        'services.desc': 'Solutions for all your shipping needs',
        'service.road.title': 'Domestic Road Transport',
        'service.road.desc': 'Delivering goods nationwide quickly and on time',
        'service.air.title': 'Domestic Cargo Air Transport',
        'service.air.desc': 'Import-export air services with customs support',
        'service.warehouse.title': 'Warehousing & Distribution',
        'service.warehouse.desc': 'Storage, packing and distribution with modern warehouse management',
        'features.title': 'Why Choose Us',
        'feature.speed.title': 'Fast & On-time',
        'feature.speed.desc': 'We prioritize your time with efficient route management',
        'feature.safe.title': 'Maximum Security',
        'feature.safe.desc': '安心 with GPS tracking and damage insurance',
        'feature.support.title': 'Customer Support',
        'feature.support.desc': 'Our support team is ready to help and answer your questions',
        'cta.title': 'Ready to ship with us?',
        'cta.desc': 'Request a quote or consult our experts for free',
        'cta.button': 'Request a Quote'
    }
};

function setLanguage(lang) {
    // 1. Update body classes without overwriting other classes
    document.body.classList.remove('lang-th', 'lang-en');
    document.body.classList.add('lang-' + lang);

    // 2. Update html lang attribute
    document.documentElement.lang = lang;

    // 3. Update active buttons
    const btnTh = document.getElementById('btn-th');
    const btnEn = document.getElementById('btn-en');
    if (btnTh) btnTh.classList.toggle('active', lang === 'th');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');

    // 4. Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = translations[lang] && translations[lang][key];
        if (value !== undefined) {
            el.innerText = value;
        }
    });

    // 5. Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = translations[lang] && translations[lang][key];
        if (value !== undefined) el.placeholder = value;
    });

    // 6. Update document title if available
    if (translations[lang] && translations[lang]['meta.title']) {
        document.title = translations[lang]['meta.title'];
    }

    // persist
    try { localStorage.setItem('lang', lang); } catch(e) {}
}

// make available to inline onclick handlers
window.setLanguage = setLanguage;
