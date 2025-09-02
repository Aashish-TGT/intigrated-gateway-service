export const logError = (error) => {
    console.error('Error:', error);
};

export const logInfo = (message) => {
    console.log('Info:', message);
};

export const handleResponse = (res, status, data) => {
    res.status(status).json(data);
};