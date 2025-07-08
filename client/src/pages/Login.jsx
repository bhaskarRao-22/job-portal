import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/api";
import { useToast } from "../context/ToastContext";
import Loader from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.accessToken);
      // showToast("Login successful!", "success");
      toast.success("Login successful!");
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/dashboard/${res.data.user.role}`);
      }, 2000);
    } catch (err) {
      // showToast(err.response?.data?.msg || "Login failed", "error");
      toast.error(err.response?.data?.msg || "Login failed");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="p-6 space-y-4 relative">
      <AuthForm
        isLogin={true}
        onSubmit={handleLogin}
        isLoading={isLoading}
      ></AuthForm>

      {/* {isLoading ? <Loader /> : <AuthForm isLogin={true} onSubmit={handleLogin} />} */}
    </div>
  );
};

export default Login;

