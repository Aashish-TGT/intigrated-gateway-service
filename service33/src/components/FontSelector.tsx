import React from 'react';

const fonts = [
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Courier New', value: '"Courier New", monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Times New Roman', value: '"Times New Roman", serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
];

const FontSelector = ({ selectedFont, onFontChange }) => {
    return (
        <div className="font-selector">
            <label htmlFor="font-select" className="block text-sm font-medium text-gray-700">
                Select Font
            </label>
            <select
                id="font-select"
                value={selectedFont}
                onChange={(e) => onFontChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            >
                {fonts.map((font) => (
                    <option key={font.value} value={font.value}>
                        {font.name}
                    </option>
                ))}
            </select>

            <label htmlFor="text-alignment" className="block text-sm font-medium text-gray-700 mt-4">
                Text Alignment
            </label>
            <select
                id="text-alignment"
                onChange={(e) => onFontChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
            </select>
        </div>
    );
};

export default FontSelector;