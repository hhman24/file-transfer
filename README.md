# 🔒 file-transfer

In today’s interconnected world, ensuring the privacy and security of communication is paramount. Our goal is to build a robust application that allows users to exchange messages and files securely. Here’s how our application will work:

1. User Authentication:

   - Users will register or log in to the application using their credentials.
   - We’ll use industry-standard practices for authentication and session management.

2. Key Exchange using RSA:

   - When two users want to communicate, we’ll establish a secure channel by exchanging encryption keys.
   - RSA, an asymmetric encryption algorithm, will facilitate this key exchange.
   - The sender will encrypt a symmetric key (used for message encryption) with the recipient’s public key.
   - The recipient will decrypt the symmetric key using their private key.

3. Message Encryption using AES:

   - For efficient and fast encryption, we’ll use AES, a symmetric encryption algorithm.
   - Each user will have their unique symmetric key for message encryption.
   - When sending a message, the sender will encrypt it using AES and the recipient’s symmetric key.
   - Only the recipient, possessing the correct symmetric key, can decrypt and read the message.

4. File Transfer:
   - Users can securely transfer files (documents, images, etc.) through our application.
   - Before transmission, files will be encrypted using AES.
   - The recipient will decrypt the file using their symmetric key.

# 🚀 Members:

[Hoang Huu Minh An](https://github.com/hhman24), [Tran Tien Hoang](https://github.com/tienhoangggg), [Le Nguyen Minh Quang](https://github.com/LnmQuang), [Tran Quang Duy](https://github.com/tduy20)

