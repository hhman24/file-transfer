import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.loginState.token);
  const isLogin = useSelector((state) => state.auth.loginState.isLogined);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === '' && !isLogin) navigate('/login', { replace: true, state: { from: location } });
  }, [navigate, token, isLogin, location]);

  return children;
};
