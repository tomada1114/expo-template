import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import { CounterStore, User } from './types';

export const useExampleStore = create<CounterStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        counter: 0,
        count: 0,
        user: null,

        // Actions
        increment: () =>
          set(state => ({
            counter: state.counter + 1,
            count: state.count + 1,
          })),
        decrement: () =>
          set(state => ({
            counter: Math.max(0, state.counter - 1),
            count: Math.max(0, state.count - 1),
          })),
        setCounter: (value: number) =>
          set({ counter: Math.max(0, value), count: Math.max(0, value) }),
        reset: () => set({ counter: 0, count: 0, user: null }),
        setUser: (user: User) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'example-store',
        storage: createJSONStorage(() => AsyncStorage),
        // Persist only specific fields if needed
        partialize: state => ({
          counter: state.counter,
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
