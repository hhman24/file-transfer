import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '~/components/protectedRoute/ProtectedRoute';
import Auth from '~/pages/auth/Auth';
import Register from '~/pages/auth/Register';
import ErrorPage from '~/pages/error/ErrorPage';
import Home from '~/pages/hone/Home';
import Message from '~/pages/message/Message';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/messages',
    element: (
      // <ProtectedRoute>
      //   <Message />
      // </ProtectedRoute>
      <Message />
    ),
    errorElement: <ErrorPage />,
  },
]);
