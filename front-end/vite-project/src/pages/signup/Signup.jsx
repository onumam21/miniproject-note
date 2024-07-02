// นำเข้า useState จาก React เพื่อใช้สำหรับการเก็บข้อมูลที่เปลี่ยนแปลงได้ในคอมโพเนนต์
import { useState } from "react";
// นำเข้า Navbar จากโฟลเดอร์ที่เก็บคอมโพเนนต์
import Navbar from "../../components/Navbar/Navbar";
// นำเข้า PasswordInput คอมโพเนนต์สำหรับการกรอกพาสเวิร์ด
import PasswordInput from "../../components/Input/PasswordInput";
// นำเข้า Link สำหรับการนำทางไปยังหน้าอื่น และ useNavigate สำหรับการเปลี่ยนเส้นทาง
import { Link, useNavigate } from "react-router-dom";
// นำเข้า validateEmail ฟังก์ชันสำหรับตรวจสอบว่าอีเมลถูกต้องหรือไม่
import { validateEmail } from "../../utils/helper";
// นำเข้า axiosInstance ที่ตั้งค่าไว้เพื่อใช้งานในการส่งคำขอ HTTP
import axiosInstance from "../../utils/axiosInstance";

// ภายในฟังก์ชัน SignUp:
const SignUp = () => {
// สร้างสถานะ name และฟังก์ชัน setName สำหรับเก็บและอัปเดตชื่อผู้ใช้
  const [name, setName] = useState("");
  // สร้างสถานะ email และฟังก์ชัน setEmail สำหรับเก็บและอัปเดตอีเมลผู้ใช้
  const [email, setEmail] = useState("");
  // สร้างสถานะ password และฟังก์ชัน setPassword สำหรับเก็บและอัปเดตรหัสผ่านผู้ใช้
  const [password, setPassword] = useState("");
  // สร้างสถานะ error และฟังก์ชัน setError สำหรับเก็บและแสดงข้อผิดพลาด
  const [error, setError] = useState(null);
  // ใช้ useNavigate เพื่อสร้างฟังก์ชัน navigate สำหรับการเปลี่ยนเส้นทาง
  const navigate = useNavigate();

const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    // SignUp API Call using an axios instance with auth token attached
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      // handle successful signup, e.g., navigate to another page
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during sign up.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;