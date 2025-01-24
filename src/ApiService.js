const BASE_URL = 'http://localhost:3000/api/userstories';
const BASE_URL_TWO = 'http://localhost:3000/api/auth';

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
        return response.json();
    },

    async getStories() {
        const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },
    
    async getStoryById(id) {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    async updateStory(id, story) {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(story),
        });
        return response.json();
    },

    async deleteStory(id) {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    async addStory(story) {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(story),
        });
        return response.json();
    }
}
