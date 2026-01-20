import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5001';

function App() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Fetch all files on component mount
    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/files`);
            setFiles(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setFiles([]);
            } else {
                console.error('Error fetching files:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Check if it's an image
            if (!selectedFile.type.startsWith('image/')) {
                setMessage({ text: 'Please select an image file', type: 'error' });
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setMessage({ text: '', type: '' });
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage({ text: 'Please select a file first', type: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        setMessage({ text: '', type: '' });

        try {
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage({
                text: `File uploaded successfully: ${response.data.file.filename}`,
                type: 'success'
            });
            setFile(null);

            // Reset file input
            document.getElementById('file-input').value = '';

            // Refresh file list
            fetchFiles();
        } catch (error) {
            setMessage({
                text: `Upload failed: ${error.response?.data?.error || error.message}`,
                type: 'error'
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="App">
            <div className="header">
                <h1>📸 GridFS File Upload</h1>
                <p>Upload and manage large files with MongoDB GridFS</p>
            </div>

            <div className="upload-section">
                <form className="upload-form" onSubmit={handleUpload}>
                    <div className="file-input-wrapper">
                        <input
                            id="file-input"
                            type="file"
                            className="file-input"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>

                    <button
                        type="submit"
                        className="upload-btn"
                        disabled={!file || uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>

                    {message.text && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                </form>
            </div>

            <div className="gallery-section">
                <h2>Image Gallery</h2>

                {loading ? (
                    <div className="loading">Loading images...</div>
                ) : files.length === 0 ? (
                    <div className="no-files">No images uploaded yet. Upload your first image above!</div>
                ) : (
                    <div className="gallery">
                        {files.map((file) => (
                            <div key={file._id} className="gallery-item">
                                <img
                                    src={`${API_URL}/image/${file.filename}`}
                                    alt={file.filename}
                                />
                                <div className="gallery-item-info">
                                    <p><strong>Name:</strong> {file.filename}</p>
                                    <p><strong>Size:</strong> {(file.length / 1024).toFixed(2)} KB</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
