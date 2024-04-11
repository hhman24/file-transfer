/* eslint-disable no-useless-catch */
import bcrypt from 'bcrypt';
import forge from 'node-forge';
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
function verifySignature(message, signature, publicKey){
  const publicKeyObject = forge.pki.publicKeyFromPem(publicKey);
  const md = forge.md.sha256.create();
  md.update(message, 'utf8');
  const signatureBytes = forge.util.decode64(signature);
  const isValid = publicKeyObject.verify(md.digest().bytes(), signatureBytes);
  return isValid;
};

export const Algorithms = {
  hashPassword,
  comparePasswords,
  mapOrder,
  verifySignature,
};
