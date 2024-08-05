// const API_BASE_URL = '/api';

const request = async (endpoint, options) => {
    const response = await fetch(`http://localhost:8080${endpoint}`, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await request('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    return response.token; // Assumes the backend returns a token in the response
};
