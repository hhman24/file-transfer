const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types')
const https = require('https');
const CLIENT_ID = '971864785107-648297u9chr17u4ddddc3m3pauksc0pm.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//048fnXN_8eDZ9CgYIARAAGAQSNgF-L9Ir5sL5AZLudal5Ysy8VCfhdHwwjbNR0WghPG88byznOzw5vUaOhWUQS8sGUz0h5uRMug';
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
const getToken = async () => {
  // Function to make the HTTP request to get the token
  const tokenRequest = () => {
      return new Promise((resolve, reject) => {
          // Data to be sent in the request body
          const data = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&refresh_token=${REFRESH_TOKEN}&grant_type=refresh_token`;
          // Options for the HTTP request
          const options = {
              hostname: 'oauth2.googleapis.com',
              port: 443,
              path: '/token',
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Content-Length': Buffer.byteLength(data)
              }
          };

          // Create the HTTP request
          const req = https.request(options, (res) => {
              let responseData = '';

              // A chunk of data has been received.
              res.on('data', (chunk) => {
                  responseData += chunk;
              });

              // The whole response has been received.
              res.on('end', () => {
                  // Resolve the promise with the response data
                  resolve(responseData);
              });
          });

          // Handle errors in the request
          req.on('error', (error) => {
              // Reject the promise with the error
              reject(error);
          });
          // Write data to request body
          req.write(data);
          req.end();
      });
  };
  try {
      const result = await tokenRequest();
      const token = JSON.parse(result).access_token;
      return token;
  } catch (error) {
      throw error;
  }
};

const revokedToken = async (token) => {
  // Function to make the HTTP request to get the token
  const revokeRequest = () => {
      return new Promise((resolve, reject) => {
          console.log(token)
          const data = "token=" + token;
          // Options for the HTTP request
          const options = {
              hostname: 'oauth2.googleapis.com',
              port: 443,
              path: '/revoke',
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Content-Length': Buffer.byteLength(data)
              }
          };

          // Create the HTTP request
          const req = https.request(options, (res) => {
              let responseData = '';
              res.setEncoding('utf8');
              // A chunk of data has been received.
              res.on('data', d => {
                console.log('Response: ' + d);
              });
              resolve(res.statusCode )
          });

          // Handle errors in the request
          req.on('error', (error) => {
              // Reject the promise with the error
              reject(error);
          });
          // Write data to request body
          req.write(data);
          req.end();
      });
  };
  try {
      const result = await revokeRequest();
      //console.log(result)
      return JSON.parse(result);;
  } catch (error) {
      throw error;
  }
};


export const uploadService = { getToken , revokedToken };