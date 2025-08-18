import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, act } from '@testing-library/react-native';

import { useExampleStore } from '../exampleStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('exampleStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    const { result } = renderHook(() => useExampleStore());
    act(() => {
      result.current.reset();
    });
    // Clear AsyncStorage
    AsyncStorage.clear();
  });

  describe('counter functionality', () => {
    it('should have initial counter value of 0', () => {
      const { result } = renderHook(() => useExampleStore());
      expect(result.current.counter).toBe(0);
    });

    it('should increment counter', () => {
      const { result } = renderHook(() => useExampleStore());

      act(() => {
        result.current.increment();
      });

      expect(result.current.counter).toBe(1);

      act(() => {
        result.current.increment();
      });

      expect(result.current.counter).toBe(2);
    });

    it('should decrement counter', () => {
      const { result } = renderHook(() => useExampleStore());

      act(() => {
        result.current.increment();
        result.current.increment();
      });

      expect(result.current.counter).toBe(2);

      act(() => {
        result.current.decrement();
      });

      expect(result.current.counter).toBe(1);
    });

    it('should not decrement below 0', () => {
      const { result } = renderHook(() => useExampleStore());

      expect(result.current.counter).toBe(0);

      act(() => {
        result.current.decrement();
      });

      expect(result.current.counter).toBe(0);
    });

    it('should set counter to specific value', () => {
      const { result } = renderHook(() => useExampleStore());

      act(() => {
        result.current.setCounter(10);
      });

      expect(result.current.counter).toBe(10);

      act(() => {
        result.current.setCounter(5);
      });

      expect(result.current.counter).toBe(5);
    });

    it('should not set counter to negative value', () => {
      const { result } = renderHook(() => useExampleStore());

      act(() => {
        result.current.setCounter(-5);
      });

      expect(result.current.counter).toBe(0);
    });
  });

  describe('user data functionality', () => {
    it('should have initial user as null', () => {
      const { result } = renderHook(() => useExampleStore());
      expect(result.current.user).toBeNull();
    });

    it('should set user data', () => {
      const { result } = renderHook(() => useExampleStore());

      const userData = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };

      act(() => {
        result.current.setUser(userData);
      });

      expect(result.current.user).toEqual(userData);
    });

    it('should update existing user data', () => {
      const { result } = renderHook(() => useExampleStore());

      const initialUser = {
        id: '1',
        name: 'Initial User',
        email: 'initial@example.com',
      };

      const updatedUser = {
        id: '2',
        name: 'Updated User',
        email: 'updated@example.com',
      };

      act(() => {
        result.current.setUser(initialUser);
      });

      expect(result.current.user).toEqual(initialUser);

      act(() => {
        result.current.setUser(updatedUser);
      });

      expect(result.current.user).toEqual(updatedUser);
    });

    it('should clear user data', () => {
      const { result } = renderHook(() => useExampleStore());

      const userData = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };

      act(() => {
        result.current.setUser(userData);
      });

      expect(result.current.user).toEqual(userData);

      act(() => {
        result.current.clearUser();
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe('reset functionality', () => {
    it('should reset all store data to initial state', () => {
      const { result } = renderHook(() => useExampleStore());

      const userData = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };

      act(() => {
        result.current.setCounter(10);
        result.current.setUser(userData);
      });

      expect(result.current.counter).toBe(10);
      expect(result.current.user).toEqual(userData);

      act(() => {
        result.current.reset();
      });

      expect(result.current.counter).toBe(0);
      expect(result.current.user).toBeNull();
    });
  });

  describe('computed value', () => {
    it('should correctly compute isLoggedIn based on user', () => {
      const { result } = renderHook(() => useExampleStore());

      // isLoggedIn should be based on whether user is null or not
      expect(result.current.user).toBeNull();

      const userData = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };

      act(() => {
        result.current.setUser(userData);
      });

      expect(result.current.user).not.toBeNull();

      act(() => {
        result.current.clearUser();
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe('persistence', () => {
    it('should persist data to AsyncStorage', async () => {
      const { result } = renderHook(() => useExampleStore());

      const userData = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };

      act(() => {
        result.current.setCounter(5);
        result.current.setUser(userData);
      });

      // Wait for the state to be persisted
      await new Promise(resolve => setTimeout(resolve, 100));

      const storedData = await AsyncStorage.getItem('example-store');
      expect(storedData).toBeTruthy();

      const parsedData = JSON.parse(storedData!);
      expect(parsedData.state.counter).toBe(5);
      expect(parsedData.state.user).toEqual(userData);
    });
  });
});
