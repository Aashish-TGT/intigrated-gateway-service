import React, { useState } from 'react';

const ColorPicker: React.FC<{ onChange: (colors: { primary: string; secondary: string }) => void }> = ({ onChange }) => {
    const [primaryColor, setPrimaryColor] = useState('#000000');
    const [secondaryColor, setSecondaryColor] = useState('#FFFFFF');

    const handlePrimaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        setPrimaryColor(color);
        onChange({ primary: color, secondary: secondaryColor });
    };

    const handleSecondaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        setSecondaryColor(color);
        onChange({ primary: primaryColor, secondary: color });
    };

    return (
        <div className="color-picker">
            <div className="color-picker__field">
                <label htmlFor="primary-color">Primary Color:</label>
                <input
                    type="color"
                    id="primary-color"
                    value={primaryColor}
                    onChange={handlePrimaryChange}
                />
            </div>
            <div className="color-picker__field">
                <label htmlFor="secondary-color">Secondary Color:</label>
                <input
                    type="color"
                    id="secondary-color"
                    value={secondaryColor}
                    onChange={handleSecondaryChange}
                />
            </div>
        </div>
    );
};

export default ColorPicker;