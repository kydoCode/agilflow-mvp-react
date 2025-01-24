import { create } from 'zustand';
import { apiService } from './ApiService';

export const useStore = create(
  (set, get) => ({
    stories: [],
    user: null,
    isAuthenticated: false,
    
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setToken: (token) => set({ token: token }),

    initializeAuth: () => {
      const token = localStorage.getItem('token');
      const currentIsAuthenticated = get().isAuthenticated;
      console.log('initializeAuth - token:', token, 'isAuthenticated:', currentIsAuthenticated);
      if (token && !currentIsAuthenticated) {
        set({ isAuthenticated: true });
        console.log('initializeAuth - setting isAuthenticated to true');
      } else if (!token && currentIsAuthenticated) {
        set({ isAuthenticated: false });
        console.log('initializeAuth - setting isAuthenticated to false');
      }
    },

    login: async (email, password) => {
      const response = await apiService.login(email, password);
      if (response.token) {
        set({ user: response.user, isAuthenticated: true });
        localStorage.setItem('token', response.token);
        return true;
      }
      return false;
    },

    logout: () => {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem('token');
    },

    register: async (name, email, password, role) => {
      const response = await apiService.register(name, email, password, role);
      if (response.token) {
        set({ user: response.user, isAuthenticated: true });
        localStorage.setItem('token', response.token);
      }
    },

    addStory: async (story) => {
      const response = await apiService.addStory(story);
      set((state) => ({
        stories: [
          ...state.stories,
          {
            ...response,
            createdAt: new Date(response.createdAt),
            updatedAt: new Date(response.updatedAt),
          },
        ],
      }));
    },

    updateStory: async (id, updatedStory) => {
      const response = await apiService.updateStory(id, updatedStory);
      set((state) => ({
        stories: state.stories.map((story) =>
          story.id === id ? { ...story, ...response, updatedAt: new Date(response.updatedAt) } : story
        ),
      }));
    },

    deleteStory: async (id) => {
      await apiService.deleteStory(id);
      set((state) => ({
        stories: state.stories.filter((story) => story.id !== id),
      }));
    },

    moveStory: (id, status) =>
      set((state) => ({
        stories: state.stories.map((story) =>
          story.id === id ? { ...story, status, updatedAt: new Date() } : story
        ),
      })),
  })
);
