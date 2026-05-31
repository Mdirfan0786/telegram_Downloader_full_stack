import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import PhoneStep from "../components/auth/PhoneStep";

import OtpStep from "../components/auth/OtpStep";

import PasswordStep from "../components/auth/PasswordStep";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [step, setStep] = useState("phone");

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/send-otp", {
        phone,
      });

      setStep("otp");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyLogin = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/verify-login",
        {
          phone,
          otp,
          password,
        },
      );

      if (data.needPassword) {
        setStep("password");

        return;
      }

      login(data.token);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {step === "phone" && (
        <PhoneStep
          phone={phone}
          setPhone={setPhone}
          sendOtp={sendOtp}
          loading={loading}
        />
      )}

      {step === "otp" && (
        <OtpStep
          otp={otp}
          setOtp={setOtp}
          verifyLogin={verifyLogin}
          loading={loading}
        />
      )}

      {step === "password" && (
        <PasswordStep
          otp={otp}
          setOtp={setOtp}
          password={password}
          setPassword={setPassword}
          verifyLogin={verifyLogin}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Login;
