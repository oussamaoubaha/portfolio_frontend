import axios from 'axios';

const getBaseURL = () => {
    let url = import.meta.env.VITE_API_URL || '';

    // If we're in development and no URL is provided, default to local proxy
    if (!url && import.meta.env.DEV) return '/api';

    // Normalize URL: remove trailing slash
    url = url.replace(/\/$/, "");

    // Ensure it ends with /api to avoid "double /api/api" if the user input it, 
    // or if the calls expect it in the baseURL.
    // If the user provided '.../api', we keep it. 
    // If they provided '...', we append '/api'.
    if (!url.endsWith('/api')) {
        url += '/api';
    }

    return url;
};

const api = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor to add token if available (for future Admin use)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for better error logging
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error Interceptor:", {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        return Promise.reject(error);
    }
);

export default api;
