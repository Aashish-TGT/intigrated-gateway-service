import React from 'react';

interface TemplatePreviewProps {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    font: string;
    textAlignment: 'left' | 'center' | 'right';
    legalNotes: string;
    footer: string;
    offers: string;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
    logo,
    primaryColor,
    secondaryColor,
    font,
    textAlignment,
    legalNotes,
    footer,
    offers,
}) => {
    return (
        <div className="template-preview" style={{ fontFamily: font }}>
            <div className="header" style={{ textAlign: textAlignment }}>
                {logo && <img src={logo} alt="POS Logo" className="logo" />}
                <h1 style={{ color: primaryColor }}>Receipt</h1>
            </div>
            <div className="content" style={{ color: secondaryColor }}>
                <p>Sample Item 1: $10.00</p>
                <p>Sample Item 2: $15.00</p>
                <p>Total: $25.00</p>
            </div>
            <div className="legal-notes" style={{ textAlign: textAlignment }}>
                <p>{legalNotes}</p>
            </div>
            <div className="footer" style={{ textAlign: textAlignment }}>
                <p>{footer}</p>
                <p>{offers}</p>
            </div>
        </div>
    );
};

export default TemplatePreview;