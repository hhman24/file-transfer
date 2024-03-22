import jwt from 'jsonwebtoken';
import { env } from '~/config/environment';

// const generateTokenAndSetCookie = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '1d',
//   });

//   res.cookie('jwt', token, {
//     maxAge: 1 * 24 * 60 * 60 * 1000, // MS
//     httpOnly: true, // prevent XSS attacks cross-site scripting attacks
//     sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
//     secure: process.env.NODE_ENV !== 'development',
//   });
// };

// export default generateTokenAndSetCookie;

export const generateAccessToken = ({ _id, username, email }) => {
  return jwt.sign({ _id, username, email }, env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: env.TOKEN_LIFE,
  });
};

export const generateRefreshToken = ({ _id, username, email }) => {
  const refreshToken = jwt.sign({ _id, username, email }, env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: env.REFRESH_TOKEN_LIFE,
  });

  const decodedToken = jwt.decode(refreshToken);
  const expireDate = new Date(decodedToken.exp * 1000);

  return { refreshToken, expireDate };
};
