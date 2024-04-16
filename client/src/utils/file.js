import axios from 'axios';

// Function to set file permissions to anyone with link
async function setFilePermissions(fileId, authToken) {
  try {
    const permissionsEndpoint = `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`;
    const requestBody = {
      role: 'reader',
      type: 'anyone',
    };

    await axios.post(permissionsEndpoint, requestBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('File permissions set successfully.');
  } catch (error) {
    console.error('Error setting file permissions:', error);
    throw error;
  }
}

// Function to get sharable link for the uploaded file
// Function to get sharable link for the uploaded file
async function getSharableLink(fileId, authToken) {
  try {
    // Set file permissions to anyone with link
    await setFilePermissions(fileId, authToken);
    console.log(`Sharable link: https://drive.google.com/file/d/${fileId}/edit?usp=sharing`);
    return `https://drive.google.com/file/d/${fileId}/edit?usp=sharing`;
  } catch (error) {
    console.error('Error getting sharable link:', error);
    throw error;
  }
}

// Function to upload file to Google Drive
async function uploadToGoogleDrive(metadataFile, fileData, authToken) {
  try {
    const formData = new FormData();
    formData.append('metadata', metadataFile); // Append metadata file
    formData.append('file', new Blob([fileData])); // Append file data

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    });
    const responseBody = await response.text();
    console.log('Response body from Google Drive API:', responseBody);
    const responseObject = JSON.parse(responseBody);

    return responseObject;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
  }
}

const extractFileIdFromUrl = (url) => {
  const startIndex = url.indexOf('/d/') + 3;
  const endIndex = url.indexOf('/edit');
  return url.substring(startIndex, endIndex);
};

export const fileHandle = { uploadToGoogleDrive, getSharableLink, extractFileIdFromUrl };
