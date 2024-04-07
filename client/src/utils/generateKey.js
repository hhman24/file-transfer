import crypto from 'crypto';
const keyLength = 2048;

function generateRSAKey() {
  const { publicKey, privateKey } = crypto.generateKeyPair('rsa', {
    modulusLength: keyLength,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });
  return {
    publicKey,
    privateKey,
  };
}

function generateAESKey(publicKey) {
  const symmetricKey = crypto.randomBytes(32).toString('hex');
  const encryptedSymmetricKey = crypto.publicEncrypt(publicKey, Buffer.from(symmetricKey, 'hex')).toString('hex');
  return {
    encryptedSymmetricKey,
  };
}

function decryptAESKey(encryptedSymmetricKey, privateKey) {
  const symmetricKey = crypto.privateDecrypt(privateKey, Buffer.from(encryptedSymmetricKey, 'hex')).toString('hex');
  return symmetricKey;
}

function encryptData(data, symmetricKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(symmetricKey, 'hex'), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptData(data, symmetricKey) {
  const parts = data.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(symmetricKey, 'hex'), iv);
  let decrypted = decipher.update(Buffer.from(parts[1], 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

//test
// const { publicKey, privateKey } = generateRSAKey();
// const { encryptedSymmetricKey } = generateAESKey(publicKey);
// const symmetricKey = decryptAESKey(encryptedSymmetricKey, privateKey);
// const data = 'Hello World';
// const encryptedData = encryptData(data, symmetricKey);
// const decryptedData = decryptData(encryptedData, symmetricKey);
// console.log('Original data:', data);
// console.log('Encrypted data:', encryptedData);
// console.log('Decrypted data:', decryptedData);

export const generateKey = {
  generateRSAKey,
  generateAESKey,
  decryptAESKey,
  encryptData,
  decryptData,
};
