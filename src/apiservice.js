// fetch l'api de stories
// fetch l'api de users


const BASE_URL = 'http://localhost:3000/api/userstories';

export const ApiService = {
    async login(email, password) {
        const response = await fetch(`${BASE_URL}/login`, {
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
    async register(name, email, password) {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        return response.json();
    },
    async getProfile(token) {
        const response = await fetch(`${BASE_URL}/profile`, {
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

    updateStory(id, story) {
        const response = fetch(`${BASE_URL}/${id}`, {
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
        const { user, action, need, status, priority, assignedTo } = story;
    }
}

// Utilisation (Par exemple sur login.jsx)
// On importe le service
import { apiService } from "../ApiService";

// On appelle le service
                    // email et password récupéré depuis la page login.jsx
const datas = await apiService.login(email, password);

// Récupérer le profil
const profile = await apiService.getProfile(datas.token)