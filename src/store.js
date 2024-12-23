import { create } from 'zustand';

export const useStore = create(
  (set) => ({
    stories: [
      {
        user: 'developer',
        action: 'want to create a new story',
        need: 'to manage my tasks effectively',
        status: 'todo',
        id: '1',
        priority: 'medium',
        assignedTo: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user: 'product owner',
        action: 'want to update an existing story',
        need: 'to reflect changes in my task',
        status: 'doing',
        id: '2',
        priority: 'high',
        assignedTo: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user: 'tester',
        action: 'want to delete a completed story',
        need: 'to keep my task list clean',
        status: 'done',
        id: '3',
        priority: 'low',
        assignedTo: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user: 'teammate',
        action: 'want to move a story to a different column',
        need: 'to reflect the progress of my task',
        status: 'todo',
        id: '4',
        priority: 'medium',
        assignedTo: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user: 'scrum master',
        action: 'want to add a new story to the list',
        need: 'to track my tasks',
        status: 'doing',
        id: '5',
        priority: 'high',
        assignedTo: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    user: null,
    isAuthenticated: true,

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

    addStory: (story) =>
      set((state) => ({
        stories: [
          ...state.stories,
          {
            ...story,
            id: Math.random().toString(36).substr(2, 9), 
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      })),

    updateStory: (id, updatedStory) =>
      set((state) => ({
        stories: state.stories.map((story) =>
          story.id === id ? { ...story, ...updatedStory, updatedAt: new Date() } : story
        ),
      })),

    deleteStory: (id) =>
      set((state) => ({
        stories: state.stories.filter((story) => story.id !== id),
      })),

    moveStory: (id, status) =>
      set((state) => ({
        stories: state.stories.map((story) =>
          story.id === id ? { ...story, status, updatedAt: new Date() } : story
        ),
      })),
  })
);
