import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  th: {
    translation: {
      "app_name": "ระบบ CF Facebook",
      "login": "เข้าสู่ระบบด้วย Facebook",
      "dashboard_title": "แดชบอร์ดจัดการออเดอร์",
      "connect_page": "เชื่อมต่อเพจ Facebook",
      "live_comments": "คอมเมนต์สด",
      "orders": "รายการสั่งซื้อ",
      "recent_comments": "คอมเมนต์ล่าสุด",
      "status_pending": "รอยืนยัน",
      "status_confirmed": "ยืนยันแล้ว",
      "status_canceled": "ยกเลิก",
      "mock_desc": "(ขณะนี้ระบบใช้ข้อมูลจำลองสำหรับการทดสอบ)",
      "no_orders": "ยังไม่มีคำสั่งซื้อ",
      "no_comments": "รอข้อความใหม่...",
      "customer": "ลูกค้า",
      "product": "สินค้า",
      "qty": "จำนวน",
      "status": "สถานะ",
      "action": "จัดการ"
    }
  },
  lo: {
    translation: {
      "app_name": "ລະບົບ CF Facebook",
      "login": "ເຂົ້າສູ່ລະບົບດ້ວຍ Facebook",
      "dashboard_title": "ແດຊບອດຈັດການອໍເດີ",
      "connect_page": "ເຊື່ອມຕໍ່ເພຈ Facebook",
      "live_comments": "ຄອມເມັ້ນສົດ",
      "orders": "ລາຍການສັ່ງຊື້",
      "recent_comments": "ຄອມເມັ້ນລ່າສຸດ",
      "status_pending": "ລໍຖ້າຍືນຍັນ",
      "status_confirmed": "ຍືນຍັນແລ້ວ",
      "status_canceled": "ຍົກເລີກ",
      "mock_desc": "(ໃນຂະນະນີ້ລະບົບນຳໃຊ້ຂໍ້ມູນຈຳລອງສຳລັບການທົດສອບ)",
      "no_orders": "ຍັງບໍ່ມີຄຳສັ່ງຊື້",
      "no_comments": "ລໍຖ້າຂໍ້ຄວາມໃໝ່...",
      "customer": "ລູກຄ້າ",
      "product": "ສິນຄ້າ",
      "qty": "ຈຳນວນ",
      "status": "ສະຖານະ",
      "action": "ຈັດການ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "th", // default language
    fallbackLng: "th",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
