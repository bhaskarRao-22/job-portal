import AuthForm from "../components/AuthForm";
import { registerUser } from "../services/api";

const Register = () => {
  const handleRegister = async (FormData) => {
    try {
        const res = await registerUser(FormData);
        localStorage.setItem("token", res.data.accessToken);
        alert("Registration successful");
    } catch (err) {
        alert(err.response.data.msg || "Registration failed");
    }
  };

  return <AuthForm isLogin={false} onSubmit={handleRegister}>Register</AuthForm>;
};

export default Register;
