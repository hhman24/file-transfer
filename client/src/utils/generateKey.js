import forge from 'node-forge';
const keyLength = 2048;

function generateRSAKey() {
  const rsa = forge.pki.rsa.generateKeyPair({ bits: keyLength });
  return {
    publicKey: forge.pki.publicKeyToPem(rsa.publicKey),
    privateKey: forge.pki.privateKeyToPem(rsa.privateKey),
  };
}

function generateAESKey(publicKey) {
  const symmetricKey = forge.random.getBytesSync(32).toString();
  const encryptedSymmetricKey = forge.pki.publicKeyFromPem(publicKey).encrypt(symmetricKey);
  return {
    encryptedSymmetricKey,
  };
}

function decryptAESKey(encryptedSymmetricKey, privateKey) {
  forge.pki.privateKeyFromPem(privateKey);
  const symmetricKey = forge.pki.privateKeyFromPem(privateKey).decrypt(encryptedSymmetricKey);
  return symmetricKey;
}

function encryptData(data, symmetricKey) {
  const iv = forge.random.getBytesSync(16);
  const cipher = forge.cipher.createCipher('AES-CBC', symmetricKey);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(data));
  cipher.finish();
  return iv.toString('hex') + ':' + cipher.output.toHex();
}

function decryptData(data, symmetricKey) {
  const parts = data.split(':');
  const iv = forge.util.createBuffer(parts[0], 'hex');
  const decipher = forge.cipher.createDecipher('AES-CBC', symmetricKey);
  decipher.start({ iv });
  decipher.update(forge.util.createBuffer(forge.util.hexToBytes(parts[1])));
  decipher.finish();
  return decipher.output.toString();
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
