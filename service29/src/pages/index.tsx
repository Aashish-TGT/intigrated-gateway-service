import React from 'react';
import TemplateForm from '../components/TemplateForm';

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Receipt Template Customization</h1>
            <TemplateForm />
        </div>
    );
};

export default HomePage;