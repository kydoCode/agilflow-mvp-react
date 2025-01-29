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
      console.log('initializeAuth - start');
      const token = localStorage.getItem('token');
      console.log('initializeAuth - token:', token);
      if (token) {
        console.log('initializeAuth - token found, fetching profile');
        apiService.getProfile(token)
          .then(profile => {
            set({ isAuthenticated: true, user: profile });
            console.log('initializeAuth - profile fetched and set', profile);
            console.log('initializeAuth - user id:', profile.id);
          })
          .catch(error => {
            console.error('initializeAuth - error fetching profile:', error);
            localStorage.removeItem('token');
            set({ isAuthenticated: false, user: null });
          });
      } else {
        console.log('initializeAuth - no token found');
        set({ isAuthenticated: false, user: null });
      }
      console.log('initializeAuth - end');
    },

    login: async (email, password) => {
      const response = await apiService.login(email, password);
      if (response.token) {
        localStorage.setItem('token', response.token); // Store token first
        try {
          const profile = await apiService.getProfile(response.token);
          localStorage.setItem('user', JSON.stringify(profile));
          set({ user: profile, isAuthenticated: true });
          return true;
        } catch (error) {
          console.error("Get profile error:", error);
          return false;
        }
      }
      return false;
    },

    logout: () => {
      set({ isAuthenticated: false, user: null }); // Update isAuthenticated and clear user
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
          story.id === id ? response.userStory : story // Access userStory from response
        ),
      }));
    },

    deleteStory: async (id) => {
      await apiService.deleteStory(id);
      set((state) => ({
        stories: state.stories.filter((story) => story.id !== id),
      }));
    },

    moveStory: (id, status) => {
      set((state) => ({
        stories: state.stories.map((story) =>
          story.id === id ? { ...story, status } : story
        ),
      }));
      get().updateStory(id, { status });
    },

    fetchStories: async (userId) => {
      try {
        const user = get().user;
        console.log("store - fetchStories - user from store:", user); // Log user from store in fetchStories
        console.log("store - fetchStories - userId param:", userId); // Log userId param in fetchStories
        if (!user) {
          console.error("User not logged in");
          return;
        }
        const fetchedStories = await apiService.getStories(userId);
        set({ stories: fetchedStories });
      } catch (error) {
        console.error("Fetch stories error:", error);
      }
    },
  })
);
