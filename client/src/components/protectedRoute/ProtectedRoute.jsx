import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.loginState.token);
  const isLogin = useSelector((state) => state.auth.loginState.isLogined);
  const location = useLocation();

  return token === '' && !isLogin ? <Navigate to={'/login'} replace state={{ from: location }} /> : children;
};
