import forge from 'node-forge';

async function generateRSAKey(keyLength = 2048) {
  const rsa = forge.pki.rsa.generateKeyPair({ bits: keyLength });
  return {
    publicKey: forge.pki.publicKeyToPem(rsa.publicKey),
    privateKey: forge.pki.privateKeyToPem(rsa.privateKey),
  };
}

async function generateAESKey(publicKeyA, publicKeyB) {
  const symmetricKey = forge.random.getBytesSync(32).toString();
  const encryptedSymmetricKeyA = forge.pki.publicKeyFromPem(publicKeyA).encrypt(symmetricKey);
  const encryptedSymmetricKeyB = forge.pki.publicKeyFromPem(publicKeyB).encrypt(symmetricKey);
  return {
    encryptedSymmetricKeyA,
    encryptedSymmetricKeyB,
  };
}

async function decryptAESKey(encryptedSymmetricKey, privateKey) {
  const symmetricKey = forge.pki.privateKeyFromPem(privateKey).decrypt(encryptedSymmetricKey);
  return symmetricKey;
}

function encryptData(data, symmetricKey) {
  const iv = forge.random.getBytesSync(16);
  const cipher = forge.cipher.createCipher('AES-CBC', symmetricKey);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(data));
  cipher.finish();
  const encryptedData = cipher.output.data;
  return `${forge.util.encode64(iv)}:${forge.util.encode64(encryptedData)}`;
}

function decryptData(data, symmetricKey) {
  const parts = data.split(':');
  const iv = forge.util.decode64(parts[0]);
  const encryptedData = forge.util.decode64(parts[1]);
  const decipher = forge.cipher.createDecipher('AES-CBC', symmetricKey);
  decipher.start({ iv });
  decipher.update(forge.util.createBuffer(encryptedData));
  decipher.finish();
  const decryptedData = decipher.output.data;
  return decryptedData;
}

function signMessage(privateKey) {
  const privateKeyObject = forge.pki.privateKeyFromPem(privateKey);
  const md = forge.md.sha256.create();
  md.update(new Date().toString(), 'utf8');
  const signature = privateKeyObject.sign(md);
  return {
    signature: forge.util.encode64(signature),
    time: new Date().toString(),
  };
}

//test
// const keyA = await generateRSAKey();
// const keyB = await generateRSAKey();
// const { encryptedSymmetricKeyA, encryptedSymmetricKeyB } = await generateAESKey(keyA.publicKey, keyB.publicKey);
// const symmetricKey = await decryptAESKey(encryptedSymmetricKeyA, keyA.privateKey);
// const data = 'Hello World';
// const encryptedData = encryptData(data, symmetricKey);
// const decryptedData = decryptData(encryptedData, symmetricKey);
// console.log('Original data:', data);
// console.log('Encrypted data:', encryptedData);
// console.log('Decrypted data:', decryptedData);

// function verifySignature(message, signature, publicKey){
//   const publicKeyObject = forge.pki.publicKeyFromPem(publicKey);
//   const md = forge.md.sha256.create();
//   md.update(message, 'utf8');
//   const signatureBytes = forge.util.decode64(signature);
//   const isValid = publicKeyObject.verify(md.digest().bytes(), signatureBytes);
//   return isValid;
// };

// const { signature, time } = signMessage(privateKey);
// console.log('Decrypted time: ', verifySignature(time, signature, publicKey));

export const generateKey = {
  generateRSAKey,
  generateAESKey,
  decryptAESKey,
  encryptData,
  decryptData,
  signMessage,
};
