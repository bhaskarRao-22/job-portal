import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = isAuthenticated();
  if (!user) return <Navigate to="/" />;

  if (!allowedRoles.includes(user.role)) {
    return <div className="text-center mt-20 text-red-500 text-xl">Access Denied</div>;
  }

  return children;
};

export default PrivateRoute;
