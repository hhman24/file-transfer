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
  return forge.util.createBuffer(iv).toHex() + ':' + cipher.output.toHex();
}

function decryptData(data, symmetricKey) {
  console.log(data);
  console.log(symmetricKey);
  const parts = data.split(':');
  console.log(parts);

  const iv = forge.util.createBuffer(parts[0], 'hex');
  console.log(iv);

  const decipher = forge.cipher.createDecipher('AES-CBC', symmetricKey);
  decipher.start({ iv });
  decipher.update(forge.util.createBuffer(forge.util.hexToBytes(parts[1])));
  decipher.finish();

  console.log(decipher.output);

  return decipher.output.toString();
}

async function signMessage(privateKey) {
  const privateKeyObject = forge.pki.privateKeyFromPem(privateKey);
  const md = forge.md.sha256.create();
  md.update(new Date().toString(), 'utf8');
  const signature = privateKeyObject.sign(md);
  return {
    signature: forge.util.encode64(signature),
    time: new Date().toString(), // time maybe not as the same line 49 ??
  };
}

//test
// const { publicKey, privateKey } = generateRSAKey();
// const { publicKey2, privateKey2 } = generateRSAKey();
const privateKeyA =
  'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQ0KTUlJQ1hBSUJBQUtCZ1FDTlFJQ2wyNVN0UTdHZUNaUFZNNFB3anNIRi91WXR5bWxHZTl2WUs2MGpQVnAzN1VjMQ0KcVVHUUFBV010MVBOdDAzWDJ1MUEwcUZrallKNjRFVWNMM0JMNnozTkVNUUNYVlRDRzhOSVVWcW1CU3BMZFN6Uw0Kc2t4OEVUUkxpUmkwWDc4OXpFVFVaQ2ZQRmx2QUhQa0J5MW54QThtdUtPVHEzZ0t0ZHoyNHkwUjgwUUlEQVFBQg0KQW9HQVF1MjJSMkJrOFRnckYvUDN6VVNzbHJZOTBLQTMxcWlhKzEvQ3lvbmZidHdxV3JyZVMrblgrL0JXc05kSQ0KNlNlYXhkV2hKMTdtUkN2ZEVIWGxxVFk5SWJhb2ZHTWh6ZlYydm4zdCtKTTJKWndCeFJUVFdpQUplM1I4WGFSRA0KQ0dtdGxIcXpGNlFaL1BBWFhWL1k3WXJxVnhaNkV6akNPRWRBRVJLZXhkMXc0QlVDUVFEVGtqejltV3JsdTZZNA0KWWVpWUEzaU5xZ0FRRTN1cU1pNWhNN0RPa3pWem13c1hWSXYxYUE0MmJXYWtJejI2YktoUDRCL0VEK3hyWHBTUg0KbVIzR0tzR0hBa0VBcXVvQWswSjFDK0JuTlRLdENOQ1FOQnlmeXJHd1hrdno3V3ZoMCtIeVJDVlZuaUdONlVRSA0KRURCU2VKd2xRNG1mWTc4aW55LzdlZUoxMFVIRjJIaEU1d0pBSC9xd3dWeFpMaFJwRVlpckVaOGtyN1VNZ1dHUQ0KaGE5RUYya3F4bTYxMjUySjFhTHY3TTRucDg1dGYwM2NYTHRqelg4QkRpK2grckMzSURMV3IwZHpMUUpCQUtKZA0KaU14Y252cjRaTE9wLzYzWERKY2s5anhGejRuVlY5YWQzVHcvY3JxQVNUVGZKWVNMaHJZL1lhbUlsUEh6Sk1OSw0KaWFaMm04MHZjTU9wV3oySkM5TUNRQUx3NzNNS3JzdlVFL0JLN0MvR3NYWkFqYkl1R1QrVHdQbXFnWTZRZzMvQw0KS0J2cHh0TThaMkdqa3hDL0Izd3h2OEVaUWxJdXY3eVFaUWQvS1QxVUpEWT0NCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tDQo=';

const privateKeyB =
  'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQ0KTUlJQ1hBSUJBQUtCZ1FDTlFJQ2wyNVN0UTdHZUNaUFZNNFB3anNIRi91WXR5bWxHZTl2WUs2MGpQVnAzN1VjMQ0KcVVHUUFBV010MVBOdDAzWDJ1MUEwcUZrallKNjRFVWNMM0JMNnozTkVNUUNYVlRDRzhOSVVWcW1CU3BMZFN6Uw0Kc2t4OEVUUkxpUmkwWDc4OXpFVFVaQ2ZQRmx2QUhQa0J5MW54QThtdUtPVHEzZ0t0ZHoyNHkwUjgwUUlEQVFBQg0KQW9HQVF1MjJSMkJrOFRnckYvUDN6VVNzbHJZOTBLQTMxcWlhKzEvQ3lvbmZidHdxV3JyZVMrblgrL0JXc05kSQ0KNlNlYXhkV2hKMTdtUkN2ZEVIWGxxVFk5SWJhb2ZHTWh6ZlYydm4zdCtKTTJKWndCeFJUVFdpQUplM1I4WGFSRA0KQ0dtdGxIcXpGNlFaL1BBWFhWL1k3WXJxVnhaNkV6akNPRWRBRVJLZXhkMXc0QlVDUVFEVGtqejltV3JsdTZZNA0KWWVpWUEzaU5xZ0FRRTN1cU1pNWhNN0RPa3pWem13c1hWSXYxYUE0MmJXYWtJejI2YktoUDRCL0VEK3hyWHBTUg0KbVIzR0tzR0hBa0VBcXVvQWswSjFDK0JuTlRLdENOQ1FOQnlmeXJHd1hrdno3V3ZoMCtIeVJDVlZuaUdONlVRSA0KRURCU2VKd2xRNG1mWTc4aW55LzdlZUoxMFVIRjJIaEU1d0pBSC9xd3dWeFpMaFJwRVlpckVaOGtyN1VNZ1dHUQ0KaGE5RUYya3F4bTYxMjUySjFhTHY3TTRucDg1dGYwM2NYTHRqelg4QkRpK2grckMzSURMV3IwZHpMUUpCQUtKZA0KaU14Y252cjRaTE9wLzYzWERKY2s5anhGejRuVlY5YWQzVHcvY3JxQVNUVGZKWVNMaHJZL1lhbUlsUEh6Sk1OSw0KaWFaMm04MHZjTU9wV3oySkM5TUNRQUx3NzNNS3JzdlVFL0JLN0MvR3NYWkFqYkl1R1QrVHdQbXFnWTZRZzMvQw0KS0J2cHh0TThaMkdqa3hDL0Izd3h2OEVaUWxJdXY3eVFaUWQvS1QxVUpEWT0NCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tDQo=';

const encryptedSymmetricKeyA =
  'X5c0FiC82f2C+NtTm5L6a8XWitMVTtNC+TeMTPbhf7GR1unO8WHRRur034ix45cnz3ngtLYh6WyX5tgBMj+eX8fGngcrYKfOGTXmTDe4Mzo+aSyON0hEWGQ4PfKKgh0TpZN0z+yIOCT2zP8wpp0fJCoKhXylSBAy5BuuUim0HS0=';
const encryptedSymmetricKeyB =
  'Xm4pgtSBFHxjUIWoks+cYvA7ie+lFdp/d3N0i0oiorhd955JiWNl555AgmLNOebratLhDzTQ0HI6lX3TKPlMP2NahTF1nhV7yvmTtA7clb+fY4afeDUHbcG6nZVCb1/QNb8Pa/SF9Qc2j/idEPei8F7zU3WINkCIVUB7XFjpEUE=';
// const { encryptedSymmetricKey, encryptedSymmetricKey2 } = generateAESKey(publicKey, publicKey2);
const symmetricKeyA = decryptAESKey(encryptedSymmetricKeyA, privateKeyA);
const symmetricKeyA = decryptAESKey(encryptedSymmetricKeyA, privateKeyB);
// const data = 'ZTdlYjViY2QwYmM5OGY2NTVjMzg3NGQ5YTNmYTU2NzA6OWJjNzA2MzE5OGI4MTY4ZWY1NWMxNzJlZmRjZjNjNzI=';
// const symmetricKey = 'ykMF/s6pVZPwCChEXL8cfD1N/NxkZzRDLbTX832NerI=';
// const encryptedData = encryptData(data, symmetricKey);
// const decryptedData = decryptData(atob(data), atob(symmetricKey));
// console.log('Original data:', data);
// console.log('Encrypted data:', encryptedData);
// console.log('Decrypted data:', decryptedData);

export const generateKey = {
  generateRSAKey,
  generateAESKey,
  decryptAESKey,
  encryptData,
  decryptData,
  signMessage,
};
