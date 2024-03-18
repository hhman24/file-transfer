import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import Auth from '~/pages/auth/Auth';
import Register from '~/pages/auth/Register';
import ErrorPage from '~/pages/error/ErrorPage';
import Home from '~/pages/hone/Home';
import Loadable from '~/components/load/Loadable';

const MessageElement = Loadable(lazy(() => import('~/pages/message/Message')));

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
    path: '/messages/t',
    element: <MessageElement />,
    errorElement: <ErrorPage />,
  },
]);
