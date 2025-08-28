import React, { useState } from 'react';
import LogoUploader from './LogoUploader';
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';
import TemplatePreview from './TemplatePreview';
import LegalNotesEditor from './LegalNotesEditor';
import FooterEditor from './FooterEditor';
import { saveTemplate } from '../utils/api';

const TemplateForm = () => {
    const [logo, setLogo] = useState(null);
    const [primaryColor, setPrimaryColor] = useState('#000000');
    const [secondaryColor, setSecondaryColor] = useState('#FFFFFF');
    const [font, setFont] = useState('Arial');
    const [textAlignment, setTextAlignment] = useState('left');
    const [legalNotes, setLegalNotes] = useState('');
    const [footerContent, setFooterContent] = useState('');
    const [templateName, setTemplateName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const templateData = {
            logo,
            primaryColor,
            secondaryColor,
            font,
            textAlignment,
            legalNotes,
            footerContent,
            templateName,
        };
        await saveTemplate(templateData);
        // Handle success or error feedback
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold">Receipt Template Customization</h1>
            <LogoUploader onLogoUpload={setLogo} />
            <ColorPicker 
                primaryColor={primaryColor} 
                setPrimaryColor={setPrimaryColor} 
                secondaryColor={secondaryColor} 
                setSecondaryColor={setSecondaryColor} 
            />
            <FontSelector 
                selectedFont={font} 
                setFont={setFont} 
                textAlignment={textAlignment} 
                setTextAlignment={setTextAlignment} 
            />
            <LegalNotesEditor legalNotes={legalNotes} setLegalNotes={setLegalNotes} />
            <FooterEditor footerContent={footerContent} setFooterContent={setFooterContent} />
            <input 
                type="text" 
                placeholder="Template Name" 
                value={templateName} 
                onChange={(e) => setTemplateName(e.target.value)} 
                className="border p-2 w-full"
            />
            <TemplatePreview 
                logo={logo} 
                primaryColor={primaryColor} 
                secondaryColor={secondaryColor} 
                font={font} 
                textAlignment={textAlignment} 
                legalNotes={legalNotes} 
                footerContent={footerContent} 
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Template</button>
        </form>
    );
};

export default TemplateForm;