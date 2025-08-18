import { renderHook, act } from '@testing-library/react-native';

import { useExampleStore } from '../../stores/exampleStore';

// Mock the store module
jest.mock('../../stores/exampleStore');

describe('StoreExample functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle counter operations', () => {
    const mockIncrement = jest.fn();
    const mockDecrement = jest.fn();
    const mockSetCounter = jest.fn();

    (useExampleStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        counter: 5,
        user: null,
        increment: mockIncrement,
        decrement: mockDecrement,
        setCounter: mockSetCounter,
        setUser: jest.fn(),
        clearUser: jest.fn(),
        reset: jest.fn(),
      };

      return selector ? selector(state) : state;
    });

    // Simulate component using the store
    const { result } = renderHook(() => ({
      counter: useExampleStore(state => state.counter),
      increment: useExampleStore(state => state.increment),
      decrement: useExampleStore(state => state.decrement),
      setCounter: useExampleStore(state => state.setCounter),
    }));

    expect(result.current.counter).toBe(5);

    act(() => {
      result.current.increment();
    });
    expect(mockIncrement).toHaveBeenCalled();

    act(() => {
      result.current.decrement();
    });
    expect(mockDecrement).toHaveBeenCalled();

    act(() => {
      result.current.setCounter(10);
    });
    expect(mockSetCounter).toHaveBeenCalledWith(10);
  });

  it('should handle user operations', () => {
    const mockSetUser = jest.fn();
    const mockClearUser = jest.fn();

    (useExampleStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        counter: 0,
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        increment: jest.fn(),
        decrement: jest.fn(),
        setCounter: jest.fn(),
        setUser: mockSetUser,
        clearUser: mockClearUser,
        reset: jest.fn(),
      };

      return selector ? selector(state) : state;
    });

    const { result } = renderHook(() => ({
      user: useExampleStore(state => state.user),
      isLoggedIn: useExampleStore(state => state.user !== null),
      setUser: useExampleStore(state => state.setUser),
      clearUser: useExampleStore(state => state.clearUser),
    }));

    expect(result.current.user).toBeTruthy();
    expect(result.current.isLoggedIn).toBe(true);

    act(() => {
      result.current.clearUser();
    });
    expect(mockClearUser).toHaveBeenCalled();
  });
});
