import React, { useState } from 'react';

const LegalNotesEditor: React.FC = () => {
    const [legalNotes, setLegalNotes] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLegalNotes(event.target.value);
    };

    return (
        <div className="legal-notes-editor">
            <h2 className="text-lg font-semibold">Legal Notes</h2>
            <textarea
                value={legalNotes}
                onChange={handleChange}
                placeholder="Enter legal notes here..."
                className="w-full h-32 p-2 border border-gray-300 rounded"
            />
        </div>
    );
};

export default LegalNotesEditor;