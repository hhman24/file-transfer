import { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [metadataFile, setMetadataFile] = useState(null);
  const [authToken, setAuthToken] = useState('');
  const [fileId, setFileId] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  // Function to handle file input change
  function handleFileInputChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Automatically create metadata JSON object with file name
    const metadata = { name: file.name };
    const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    setMetadataFile(metadataBlob);
  }

  // Function to handle upload button click
  async function handleUploadButtonClick() {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    try {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(selectedFile);
      fileReader.onload = async () => {
        const fileData = fileReader.result;

        // Send request to get auth token from server
        const response = await axios.get('http://localhost:4000/v1/upload/token');

        // Get auth token from server response
        const authToken = response.data.access_token;
        setAuthToken(authToken);

        // If auth token is available, proceed to upload the file to Google Drive
        if (authToken) {
          const driveResponse = await uploadToGoogleDrive(fileData, selectedFile.name, authToken);
          console.log('File uploaded successfully:', driveResponse);
          setFileId(driveResponse.id);
          // Get sharable link
          await getSharableLink(driveResponse.id, authToken);
        }
      };
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  // Function to upload file to Google Drive
  async function uploadToGoogleDrive(fileData, fileName, authToken) {
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

  // Function to get sharable link for the uploaded file
  // Function to get sharable link for the uploaded file
  async function getSharableLink(fileId, authToken) {
    try {
      // Set file permissions to anyone with link
      await setFilePermissions(fileId, authToken);
      const link = `https://drive.google.com/file/d/${fileId}/edit?usp=sharing`;
      setShareableLink(link);
      console.log('Sharable link:', link);
    } catch (error) {
      console.error('Error getting sharable link:', error);
    }
  }

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
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadButtonClick}>Upload</button>
      {shareableLink && (
        <p>
          Shareable Link:{' '}
          <a href={shareableLink} target="_blank" rel="noopener noreferrer">
            {shareableLink}
          </a>
        </p>
      )}
    </div>
  );
}

export default UploadForm;
