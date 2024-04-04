import axios from 'axios';
import { setLogin } from '~/redux/feature/auth/authSlice';

export const BASE_API_URL = import.meta.env.VITE_API_URL;

// const axiosInstance = axios.create({
//   baseURL: BASE_API_URL,
//   // timeout: 10000,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosInstance.interceptors.request.use(
//   (req) => {
//     // Do something before request is sent
//     // Access token from outside a component
//     const accessToken = store?.getState()?.loginState?.accessToken;
//     if (!req.headers.accessToken) {
//       req.headers.accessToken = `Bearer ${accessToken}`;
//     }
//     return req;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log(error);
//     const prevRequest = error?.config;
//     if (error?.response?.status === 401 && !prevRequest?.sent) {
//       prevRequest.sent = true;
//       const { accessToken } = await refreshToken();
//       prevRequest.headers.accessToken = `Bearer ${accessToken}`;
//       return axiosInstance(prevRequest);
//     }

//     return Promise.reject(error);
//   },
// );

export const refreshToken = async () => {
  try {
    return (
      await axios.post(`${BASE_API_URL}/refresh`, null, {
        withCredentials: true,
      })
    ).data;
  } catch (error) {
    throw new Error('Có lỗi xảy ra, vui lòng thử lại sau');
  }
};

export const useAxios = (accessToken, dispatch) => {
  const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    // timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (req) => {
      // Do something before request is sent
      // Access token from outside a component
      if (!req.headers.accessToken) {
        req.headers.accessToken = `Bearer ${accessToken}`;
      }
      return req;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const data = await refreshToken();
        console.log(data);

        // update acessToken state
        dispatch(setLogin({ ...data }));
        prevRequest.headers.accessToken = `Bearer ${data.accessToken}`;
        return axiosInstance(prevRequest);
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
