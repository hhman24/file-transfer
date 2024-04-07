/* eslint-disable no-useless-catch */
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { env } from '~/config/environment';

const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(Number(env.SALT));
    const hashPassword = await bcrypt.hash(plainPassword, salt);

    return hashPassword;
  } catch (error) {
    throw error;
  }
};

const comparePasswords = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
};

/**
 * @param {*} originalArray
 * @param {*} orderArray
 * @param {*} key = Key to order
 * @return new Ordered Array
 *
 * For Vietnamese with love :D
 * Xác định các phần tử trong array gốc ban đầu (originalArray) xem nó nằm ở đâu trong array thứ 2 (orderArray) (là array mà mình dùng để sắp xếp) bằng cách tìm index (indexOf) rồi sẽ sắp xếp theo index đó bằng hàm sort của Javascript.
 */

const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return [];

  const clonedArray = [...originalArray];
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });

  return orderedArray;
};

//using public key to decrypt token
const decryptToken = (token, publicKey) => {
  const symmetricKey = crypto.privateDecrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(token, 'hex')
  );

  return symmetricKey.toString();
};

export const Algorithms = {
  hashPassword,
  comparePasswords,
  mapOrder,
  decryptToken,
};
