import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoutes = () => {
  
  const isAuthenticated = Cookies.get("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
