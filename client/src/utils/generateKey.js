import crypto from 'crypto';
const keyLength = 2048;

function generateKey() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
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

function generateSymmetricKey(publicKey) {
  const symmetricKey = crypto.randomBytes(32).toString('hex');
  const encryptedSymmetricKey = crypto.publicEncrypt(publicKey, Buffer.from(symmetricKey, 'hex')).toString('hex');
  return {
    encryptedSymmetricKey,
  };
}

function decryptSymmetricKey(encryptedSymmetricKey, privateKey) {
  const symmetricKey = crypto.privateDecrypt(privateKey, Buffer.from(encryptedSymmetricKey, 'hex')).toString('hex');
  return symmetricKey;
}

export const generateKeyAlgorithm = {
  generateKey,
  generateSymmetricKey,
  decryptSymmetricKey,
};

const privateKey = generateKey().privateKey;
const encryptedSymmetricKey = generateSymmetricKey(generateKey().publicKey).encryptedSymmetricKey;
console.log(decryptSymmetricKey(encryptedSymmetricKey, privateKey));
