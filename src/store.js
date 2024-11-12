import { create } from 'zustand';

export const useStore = create((set) => ({
  stories: [
    {
      id: '1',
      user: 'Product Manager',
      action: 'create new user stories',
      need: 'I can track project requirements',
      status: 'todo',
      createdAt: new Date(),
    },
    {
      id: '2',
      user: 'Developer',
      action: 'implement user stories',
      need: 'I can develop features',
      status: 'doing',
      createdAt: new Date(),
    },
    {
      id: '3',
      user: 'Tester',
      action: 'test user stories',
      need: 'I can ensure quality',
      status: 'done',
      createdAt: new Date(),
    },
  ],
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
