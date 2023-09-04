// src/cells/MediaCell.jsx

import React, { useState } from 'react';
import axios from 'axios';

const MediaCell = ({ onMediaUpload }) => {
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('mediaFile', file);

        try {
            const response = await axios.post('http://localhost:5000/media', formData);
            onMediaUpload(response.data);
        } catch (error) {
            console.error("Error uploading media:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} disabled={loading} />
            {loading && <span>Uploading...</span>}
        </div>
    );
};

export default MediaCell;
