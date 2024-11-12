import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      stories: [
        {
          user: 'User 1',
          action: 'want to create a new story',
          need: 'to manage my tasks effectively',
          status: 'todo',
          id: '1',
          createdAt: new Date(),
        },
        {
          user: 'User 2',
          action: 'want to update an existing story',
          need: 'to reflect changes in my task',
          status: 'in progress',
          id: '2',
          createdAt: new Date(),
        },
        {
          user: 'User 3',
          action: 'want to delete a completed story',
          need: 'to keep my task list clean',
          status: 'done',
          id: '3',
          createdAt: new Date(),
        },
        {
          user: 'User 4',
          action: 'want to move a story to a different column',
          need: 'to reflect the progress of my task',
          status: 'todo',
          id: '4',
          createdAt: new Date(),
        },
        {
          user: 'User 5',
          action: 'want to add a new story to the list',
          need: 'to track my tasks',
          status: 'in progress',
          id: '5',
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

      addStory: (story) =>
        set((state) => ({
          stories: [
            ...state.stories,
            {
              ...story,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date(),
            },
          ],
        })),

      updateStory: (id, updatedStory) =>
        set((state) => ({
          stories: state.stories.map((story) =>
            story.id === id ? { ...story, ...updatedStory } : story
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
    }),
    {
      name: 'agilflow-storage', // unique name
    }
  )
);
