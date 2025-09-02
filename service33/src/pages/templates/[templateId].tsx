import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TemplateForm from '../../components/TemplateForm';
import { fetchTemplate } from '../../utils/api';
import { Template } from '../../types';

const TemplateEditPage = () => {
    const router = useRouter();
    const { templateId } = router.query;
    const [template, setTemplate] = useState<Template | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (templateId) {
            const getTemplate = async () => {
                const fetchedTemplate = await fetchTemplate(templateId as string);
                setTemplate(fetchedTemplate);
                setLoading(false);
            };
            getTemplate();
        }
    }, [templateId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!template) {
        return <div>Template not found</div>;
    }

    return (
        <div>
            <h1>Edit Receipt Template</h1>
            <TemplateForm initialTemplate={template} />
        </div>
    );
};

export default TemplateEditPage;