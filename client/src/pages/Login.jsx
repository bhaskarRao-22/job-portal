import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.accessToken);
      alert("Login successful");
      navigate(`/dashboard/${res.data.user.role}`);
    } catch (err) {
      alert(err.response.data.msg || "Login failed");
    }
  };

  return <AuthForm isLogin={true} onSubmit={handleLogin}></AuthForm>;
};

export default Login;
