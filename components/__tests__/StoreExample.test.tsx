import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { useExampleStore } from '../../stores/exampleStore';
import StoreExample from '../StoreExample';

// Mock the store
jest.mock('../../stores/exampleStore');

describe('StoreExample', () => {
  const mockIncrement = jest.fn();
  const mockDecrement = jest.fn();
  const mockSetCounter = jest.fn();
  const mockSetUser = jest.fn();
  const mockClearUser = jest.fn();
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mock implementation
    (useExampleStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        counter: 0,
        user: null,
        isLoggedIn: false,
        increment: mockIncrement,
        decrement: mockDecrement,
        setCounter: mockSetCounter,
        setUser: mockSetUser,
        clearUser: mockClearUser,
        reset: mockReset,
      };

      return selector ? selector(state) : state;
    });
  });

  it('should render the component with initial state', () => {
    const { getByText } = render(<StoreExample />);

    expect(getByText('Zustand Store Example')).toBeTruthy();
    expect(getByText('カウンター: 0')).toBeTruthy();
    expect(getByText('ログイン状態: ログアウト中')).toBeTruthy();
  });

  it('should display counter value correctly', () => {
    (useExampleStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        counter: 5,
        user: null,
        isLoggedIn: false,
        increment: mockIncrement,
        decrement: mockDecrement,
        setCounter: mockSetCounter,
        setUser: mockSetUser,
        clearUser: mockClearUser,
        reset: mockReset,
      };

      return selector ? selector(state) : state;
    });

    const { getByText } = render(<StoreExample />);

    expect(getByText('カウンター: 5')).toBeTruthy();
  });

  it('should call increment when increment button is pressed', () => {
    const { getByText } = render(<StoreExample />);

    const incrementButton = getByText('増加');
    fireEvent.press(incrementButton);

    expect(mockIncrement).toHaveBeenCalledTimes(1);
  });

  it('should call decrement when decrement button is pressed', () => {
    const { getByText } = render(<StoreExample />);

    const decrementButton = getByText('減少');
    fireEvent.press(decrementButton);

    expect(mockDecrement).toHaveBeenCalledTimes(1);
  });

  it('should call setCounter when set to 10 button is pressed', () => {
    const { getByText } = render(<StoreExample />);

    const setButton = getByText('10にセット');
    fireEvent.press(setButton);

    expect(mockSetCounter).toHaveBeenCalledWith(10);
  });

  it('should display logged out state when user is null', () => {
    const { getByText } = render(<StoreExample />);

    expect(getByText('ログイン状態: ログアウト中')).toBeTruthy();
    expect(getByText('ユーザー: 未ログイン')).toBeTruthy();
  });

  it('should display logged in state when user exists', () => {
    (useExampleStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        counter: 0,
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
        },
        isLoggedIn: true,
        increment: mockIncrement,
        decrement: mockDecrement,
        setCounter: mockSetCounter,
        setUser: mockSetUser,
        clearUser: mockClearUser,
        reset: mockReset,
      };

      return selector ? selector(state) : state;
    });

    const { getByText } = render(<StoreExample />);

    expect(getByText('ログイン状態: ログイン中')).toBeTruthy();
    expect(getByText('ユーザー: Test User (test@example.com)')).toBeTruthy();
  });

  it('should call setUser when login button is pressed', () => {
    const { getByText } = render(<StoreExample />);

    const loginButton = getByText('サンプルユーザーでログイン');
    fireEvent.press(loginButton);

    expect(mockSetUser).toHaveBeenCalledWith({
      id: '1',
      name: 'サンプルユーザー',
      email: 'sample@example.com',
    });
  });

  it('should call clearUser when logout button is pressed', () => {
    (useExampleStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        counter: 0,
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
        },
        isLoggedIn: true,
        increment: mockIncrement,
        decrement: mockDecrement,
        setCounter: mockSetCounter,
        setUser: mockSetUser,
        clearUser: mockClearUser,
        reset: mockReset,
      };

      return selector ? selector(state) : state;
    });

    const { getByText } = render(<StoreExample />);

    const logoutButton = getByText('ログアウト');
    fireEvent.press(logoutButton);

    expect(mockClearUser).toHaveBeenCalledTimes(1);
  });

  it('should call reset when reset all button is pressed', () => {
    const { getByText } = render(<StoreExample />);

    const resetButton = getByText('全てリセット');
    fireEvent.press(resetButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('should render all sections correctly', () => {
    const { getByText } = render(<StoreExample />);

    // Check section titles
    expect(getByText('カウンター機能')).toBeTruthy();
    expect(getByText('ユーザー管理')).toBeTruthy();
    expect(getByText('リセット機能')).toBeTruthy();
  });

  it('should use selectors correctly to get specific state values', () => {
    let counterSelector: any;
    let userSelector: any;
    let isLoggedInSelector: any;

    (useExampleStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        counter: 3,
        user: { id: '1', name: 'Test', email: 'test@test.com' },
        isLoggedIn: true,
        increment: mockIncrement,
        decrement: mockDecrement,
        setCounter: mockSetCounter,
        setUser: mockSetUser,
        clearUser: mockClearUser,
        reset: mockReset,
      };

      if (selector) {
        // Store which selectors are being used
        const result = selector(state);
        if (typeof result === 'number') counterSelector = selector;
        else if (result === true || result === false)
          isLoggedInSelector = selector;
        else if (result && typeof result === 'object' && 'id' in result)
          userSelector = selector;
        return result;
      }

      return state;
    });

    render(<StoreExample />);

    // Verify that selectors were used
    expect(counterSelector).toBeDefined();
    expect(userSelector).toBeDefined();
    expect(isLoggedInSelector).toBeDefined();
  });
});
