import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { assignTemplateToBrand } from '../../utils/api';

const AssignTemplate = () => {
    const router = useRouter();
    const { brandId } = router.query;
    const [templateId, setTemplateId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAssignTemplate = async () => {
        if (!templateId) {
            setError('Please select a template to assign.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await assignTemplateToBrand(brandId, templateId);
            alert('Template assigned successfully!');
            router.push('/'); // Redirect to home or templates page
        } catch (err) {
            setError('Failed to assign template. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Assign Template to Brand</h1>
            <input
                type="text"
                placeholder="Enter Template ID"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="border p-2 mb-4"
            />
            <button
                onClick={handleAssignTemplate}
                disabled={isLoading}
                className={`bg-blue-500 text-white p-2 rounded ${isLoading ? 'opacity-50' : ''}`}
            >
                {isLoading ? 'Assigning...' : 'Assign Template'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default AssignTemplate;