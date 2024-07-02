// โค้ดนี้คือการนำเข้าไลบรารี axios ซึ่งช่วยให้เราสามารถส่งและรับข้อมูลจากเซิร์ฟเวอร์ผ่าน HTTP ได้ง่ายขึ้น
import axios from "axios";
//ตรงนี้คือนำเข้าค่าตัวแปร BASE_URL จากไฟล์ constants ซึ่งตัวแปรนี้จะเก็บ URL พื้นฐานที่เราจะใช้ในคำขอ HTTP
import { BASE_URL } from "./constants";

// เรากำลังสร้าง "อินสแตนซ์" ของ axios ชื่อว่า axiosInstance โดยเรากำหนดค่าพื้นฐานบางอย่างเช่น
const axiosInstance = axios.create({
// baseURL: URL พื้นฐานที่เราจะใช้ส่งคำขอ HTTP
  baseURL: BASE_URL,
// timeout: เวลาที่ให้คำขอทำงานก่อนที่จะยกเลิก (10 วินาที)
  timeout: 10000,
// headers: ข้อมูลที่ส่งไปพร้อมกับคำขอ เช่นบอกว่าเราส่งข้อมูลในรูปแบบ JSON
  headers: {
    "Content-Type": "application/json",
  },
});

// ตรงนี้เรากำลังเพิ่ม "interceptor" ที่จะทำงานทุกครั้งก่อนที่จะส่งคำขอ HTTP
// (config) => {...}: เรากำลังตรวจสอบว่าเรามี token ที่เก็บใน localStorage หรือไม่ ถ้ามี เราจะใส่ token นี้ในหัวข้อ Authorization ของคำขอ
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  // (error) => {...}: ถ้ามีข้อผิดพลาดในการตั้งค่าคำขอ เราจะส่งข้อผิดพลาดนี้ต่อไป
  (error) => {
    return Promise.reject(error);
  }
);

// เรากำลังส่งออก axiosInstance ที่ตั้งค่าไว้แล้ว เพื่อให้สามารถใช้งานในไฟล์อื่น ๆ ในโปรเจกต์ได้
export default axiosInstance;

// ผลลัพธ์ที่เกิดขึ้น:
// เมื่อเราสร้าง axiosInstance:
// เราจะได้ axiosInstance ที่มี URL พื้นฐาน เวลาในการรอคอย และหัวข้อพื้นฐานที่ตั้งค่าไว้แล้ว
// เมื่อมีคำขอ HTTP ถูกส่งผ่าน axiosInstance:
// interceptor จะทำงาน โดยมันจะตรวจสอบว่ามี token ใน localStorage หรือไม่ ถ้ามีมันจะเพิ่ม token นี้ในหัวข้อ Authorization
// คำขอ HTTP จะถูกส่งไปยัง URL ที่ตั้งค่าไว้ โดยมี token ในหัวข้อ (ถ้ามี)
// ถ้ามีข้อผิดพลาดในการตั้งค่าคำขอ ข้อผิดพลาดนี้จะถูกส่งต่อไป

// สรุปแบบง่าย ๆ
// เราสร้างเครื่องมือที่ช่วยให้เราส่งข้อมูลไปที่ URL หนึ่งได้ง่ายขึ้น
// ทุกครั้งที่เราส่งข้อมูลไป มันจะตรวจสอบว่ามี token ในคอมพิวเตอร์เราไหม ถ้ามีมันจะใส่ token ไปด้วย
// ถ้ามีข้อผิดพลาด มันจะบอกเราทันที

