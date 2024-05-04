import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Store";
const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
