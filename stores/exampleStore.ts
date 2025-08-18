import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import { CounterStore, User } from './types';

const useExampleStore = create<CounterStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        count: 0,
        user: null,

        // Actions
        increment: () => set(state => ({ count: state.count + 1 })),
        decrement: () => set(state => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
        setUser: (user: User) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'example-store',
        storage: createJSONStorage(() => AsyncStorage),
        // Persist only specific fields if needed
        partialize: state => ({
          count: state.count,
          user: state.user,
        }),
      }
    ),
    {
      name: 'example-store',
    }
  )
);

export default useExampleStore;
