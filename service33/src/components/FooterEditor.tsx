import React, { useState } from 'react';

const FooterEditor: React.FC = () => {
    const [footerText, setFooterText] = useState('');
    const [offers, setOffers] = useState('');

    const handleFooterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFooterText(e.target.value);
    };

    const handleOffersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOffers(e.target.value);
    };

    return (
        <div className="footer-editor">
            <h2 className="text-lg font-semibold">Footer Editor</h2>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Footer Text</label>
                <textarea
                    value={footerText}
                    onChange={handleFooterChange}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    placeholder="Enter footer text here..."
                />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Offers</label>
                <textarea
                    value={offers}
                    onChange={handleOffersChange}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    placeholder="Enter offers here..."
                />
            </div>
        </div>
    );
};

export default FooterEditor;