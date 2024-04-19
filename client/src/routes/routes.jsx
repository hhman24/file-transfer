import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '~/components/protectedRoute/ProtectedRoute';
import Auth from '~/pages/auth/Auth';
import Register from '~/pages/auth/Register';
import ErrorPage from '~/pages/error/ErrorPage';
// import Message from '~/pages/message/Message';
import Loadable from '~/components/load/Loadable';
import LandingPage from '~/pages/hone/Home';
import { lazy } from 'react';

const Message = Loadable(lazy(() => import('~/pages/message/Message')));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
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
    path: '/message',
    element: (
      <ProtectedRoute>
        <Message />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);
