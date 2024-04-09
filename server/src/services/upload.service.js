const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types')

const CLIENT_ID = '971864785107-648297u9chr17u4ddddc3m3pauksc0pm.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04CICjpnciLJgCgYIARAAGAQSNgF-L9Ir-7SV_okWiVsku6A_MnN_wzCrQ0bss2qSrbCYkx8Q40LkWPVWcIiqPFkhDWMF6CsiSw';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });


  async function generatePublicUrl(id) {
    try {
      const fileId = id;
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
  
      /* 
      webViewLink: View the file in browser
      webContentLink: Direct download link 
      */
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      return result.data
    } catch (error) {
      console.log(error.message);
    }
  }

 async function upload(file_path) {
  try {
    const mime_type = mime.lookup(file_path)
    const response = await drive.files.create({
      requestBody: {
        name: path.basename(file_path), //This can be name of your choice
        mimeType: mime_type,
      },
      media: {
        mimeType: mime_type,
        body: fs.createReadStream(file_path),
      },
    });
    const result = await generatePublicUrl(response.data.id)
    return result


  } catch (error) {
    console.log(error.message);
  }
} 



const uploadFile = async (path) => {
    try {
        const result =  await upload (path)
      return result;
    } catch (error) {
      throw error;
    }
  };
  
 

  export const uploadService = { uploadFile };