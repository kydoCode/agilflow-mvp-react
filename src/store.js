import { create } from 'zustand';

export const useStore = create((set) => ({
  stories: [],
  user: null,
  isAuthenticated: false,

  login: (email, password) => {
    if (email === 'test@test.com' && password === 'testtest') {
      set({ user: { email, password }, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  register: (email, password) => {
    set({ user: { email, password }, isAuthenticated: true });
  },

  addStory: (story) => set((state) => ({
    stories: [...state.stories, {
      ...story,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    }],
  })),

  updateStory: (id, updatedStory) => set((state) => ({
    stories: state.stories.map((story) =>
      story.id === id ? { ...story, ...updatedStory } : story
    ),
  })),

  deleteStory: (id) => set((state) => ({
    stories: state.stories.filter((story) => story.id !== id),
  })),

  moveStory: (id, status) => set((state) => ({
    stories: state.stories.map((story) =>
      story.id === id ? { ...story, status } : story
    ),
  })),
}));