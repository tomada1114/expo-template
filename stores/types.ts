// Zustand Store Types

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CounterState {
  counter: number;
  count: number;
  user: User | null;
}

export interface CounterActions {
  increment: () => void;
  decrement: () => void;
  setCounter: (value: number) => void;
  reset: () => void;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export type CounterStore = CounterState & CounterActions;
