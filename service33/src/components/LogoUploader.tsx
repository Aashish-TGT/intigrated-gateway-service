import React, { useState } from 'react';

const LogoUploader: React.FC = () => {
    const [logo, setLogo] = useState<string | ArrayBuffer | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileType = file.type;
            if (fileType === 'image/png' || fileType === 'image/svg+xml') {
                const reader = new FileReader();
                reader.onload = () => {
                    setLogo(reader.result);
                    setError(null);
                };
                reader.readAsDataURL(file);
            } else {
                setError('Please upload a PNG or SVG file.');
            }
        }
    };

    return (
        <div className="logo-uploader">
            <input
                type="file"
                accept=".png, .svg"
                onChange={handleLogoUpload}
                className="file-input"
            />
            {error && <p className="error-message">{error}</p>}
            {logo && (
                <div className="logo-preview">
                    <img src={logo as string} alt="Uploaded Logo" />
                </div>
            )}
        </div>
    );
};

export default LogoUploader;