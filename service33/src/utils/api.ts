import axios from 'axios';

const API_BASE_URL = '/template-builder';

export const uploadLogo = async (logoFile) => {
    const formData = new FormData();
    formData.append('logo', logoFile);

    const response = await axios.post(`${API_BASE_URL}/upload-logo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const saveTemplate = async (templateData) => {
    const response = await axios.post(`${API_BASE_URL}/save`, templateData);
    return response.data;
};

export const fetchTemplate = async (templateId) => {
    const response = await axios.get(`${API_BASE_URL}/${templateId}`);
    return response.data;
};

export const assignTemplateToBrand = async (brandId, templateId) => {
    const response = await axios.post(`${API_BASE_URL}/assign/${brandId}`, { templateId });
    return response.data;
};