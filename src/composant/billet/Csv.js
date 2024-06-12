import React, { useState } from 'react';

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://etudiant-backend.vercel.app/billet/csv', {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-Type': 'multipart/form-data', // Do not set this header when using FormData with fetch
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('File uploaded successfully!');
        console.log('Response:', data);
      } else {
        setMessage('Error uploading file.');
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginBottom : '50px' }}>
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CsvUploader;