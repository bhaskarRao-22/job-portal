import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../services/api";
import { useToast } from "../context/ToastContext";

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (FormData) => {
    setIsLoading(true);
    try {
      const res = await registerUser(FormData);
      localStorage.setItem("token", res.data.accessToken);
      showToast("Registration successful!", "success");
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/`);
      }, 2000);
    } catch (err) {
      // alert(err.response.data.msg || "Registration failed");
      showToast(err.response?.data?.msg || "Registration failed", "error");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <AuthForm isLogin={false} onSubmit={handleRegister} isLoading={isLoading}>
      Register
    </AuthForm>
  );
};

export default Register;
