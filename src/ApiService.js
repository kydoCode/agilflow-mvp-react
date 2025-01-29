const BASE_URL = 'http://127.0.0.1:3000/api/userstories';
const BASE_URL_TWO = 'http://127.0.0.1:3000/api/auth';

export const apiService = {
    async login(email, password) {
        const response = await fetch(`${BASE_URL_TWO}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        if (!response.ok) {
            const message = await response.json();
            console.error("getProfile error:", message);
            throw new Error(message.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    },
    async register(name, email, password, role) {
        const response = await fetch(`${BASE_URL_TWO}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role
            }),
        });
        return response.json();
    },
    async getProfile(token) {
        const response = await fetch(`${BASE_URL_TWO}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const message = await response.json();
            throw new Error(message.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    async getStories(userId) {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in.'); // Handle missing token
        }
        const response = await fetch(`${BASE_URL}?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const message = await response.json();
            throw new Error(message.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    async updateStory(id, updatedStory) {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in.');
        }
        const response = await fetch(`${BASE_URL}/${id}`, { // Use BASE_URL and include the id in the URL
            method: 'PUT', // Use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedStory),
        });
        if (!response.ok) {
            const message = await response.json();
            throw new Error(message.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    },
};
