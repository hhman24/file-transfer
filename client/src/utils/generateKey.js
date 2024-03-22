const crypto = require('crypto');
const keyLength = 2048;

function generateKey() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: keyLength,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });
    const aesKey = crypto.randomBytes(32).toString('hex');
    const encryptedAesKey = crypto.publicEncrypt(publicKey, Buffer.from(aesKey, 'hex')).toString('hex');
    return {
        publicKey: publicKey,
        privateKey: privateKey,
        encryptedAesKey: encryptedAesKey
    };
}

module.exports = generateKey;