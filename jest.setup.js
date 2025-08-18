// Jest setup file for global test configuration

// Mock Expo imports
global.__ExpoImportMetaRegistry = {};

// Add TextEncoder/TextDecoder polyfills
const { TextDecoder, TextEncoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Setup window.matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock react-native-svg
jest.mock('react-native-svg', () => ({
  Svg: 'Svg',
  Circle: 'Circle',
  Ellipse: 'Ellipse',
  G: 'G',
  LinearGradient: 'LinearGradient',
  RadialGradient: 'RadialGradient',
  Line: 'Line',
  Path: 'Path',
  Polygon: 'Polygon',
  Polyline: 'Polyline',
  Rect: 'Rect',
  Text: 'Text',
  TSpan: 'TSpan',
  Defs: 'Defs',
  Stop: 'Stop',
  ClipPath: 'ClipPath',
  Pattern: 'Pattern',
  Mask: 'Mask',
}));

// Mock Expo modules
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(() => Promise.resolve()),
  hideAsync: jest.fn(() => Promise.resolve()),
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Mock @react-native-community/datetimepicker
jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    __esModule: true,
    default: props =>
      React.createElement(View, { testID: 'date-time-picker', ...props }),
  };
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Silence the warning: Animated: `useNativeDriver` is not supported
global.__reanimatedWorkletInit = jest.fn();

// Mock tamagui.config
jest.mock('./tamagui.config', () => ({
  config: {},
}));

// Mock Tamagui components to avoid rendering issues
jest.mock('tamagui', () => {
  const React = require('react');
  const { View, Text, TextInput, TouchableOpacity } = require('react-native');

  // Create RadioGroup with sub-components
  const RadioGroup = ({ children, ...props }) =>
    React.createElement(View, props, children);
  RadioGroup.Item = ({ children, ...props }) =>
    React.createElement(View, props, children);
  RadioGroup.Indicator = props => React.createElement(View, props);

  // Create Select with sub-components
  const Select = ({ children, ...props }) =>
    React.createElement(View, props, children);
  Select.Trigger = ({ children, ...props }) =>
    React.createElement(TouchableOpacity, props, children);
  Select.Value = ({ children, placeholder, ...props }) =>
    React.createElement(Text, props, children || placeholder);
  Select.Content = ({ children, ...props }) =>
    React.createElement(View, props, children);
  Select.Item = ({ children, ...props }) =>
    React.createElement(TouchableOpacity, props, children);
  Select.ItemText = ({ children, ...props }) =>
    React.createElement(Text, props, children);

  // Create Checkbox with sub-components
  const Checkbox = ({ children, checked, ...props }) =>
    React.createElement(TouchableOpacity, props, children);
  Checkbox.Indicator = ({ children, ...props }) =>
    React.createElement(View, props, children);

  return {
    Button: ({ children, onPress, ...props }) =>
      React.createElement(
        TouchableOpacity,
        { onPress, ...props },
        React.createElement(Text, null, children)
      ),
    Card: ({ children, ...props }) =>
      React.createElement(View, props, children),
    H3: ({ children, ...props }) => React.createElement(Text, props, children),
    Paragraph: ({ children, ...props }) =>
      React.createElement(Text, props, children),
    XStack: ({ children, ...props }) =>
      React.createElement(
        View,
        { ...props, style: { flexDirection: 'row', ...props.style } },
        children
      ),
    YStack: ({ children, ...props }) =>
      React.createElement(
        View,
        { ...props, style: { flexDirection: 'column', ...props.style } },
        children
      ),
    Input: ({ placeholder, value, onChangeText, ...props }) =>
      React.createElement(TextInput, {
        placeholder,
        value,
        onChangeText,
        ...props,
      }),
    Label: ({ children, ...props }) =>
      React.createElement(Text, props, children),
    Checkbox,
    RadioGroup,
    Select,
    Separator: props => React.createElement(View, props),
    TextArea: ({ placeholder, value, onChangeText, ...props }) =>
      React.createElement(TextInput, {
        placeholder,
        value,
        onChangeText,
        multiline: true,
        ...props,
      }),
    TamaguiProvider: ({ children }) => children,
  };
});

// Mock @tamagui/lucide-icons
jest.mock('@tamagui/lucide-icons', () => {
  const React = require('react');
  const { View } = require('react-native');

  // Create a mock icon component that doesn't require theme
  const createIcon = name => {
    const IconComponent = props =>
      React.createElement(View, { testID: `icon-${name}`, ...props });
    IconComponent.displayName = name;
    return IconComponent;
  };

  return {
    Check: createIcon('Check'),
    ChevronDown: createIcon('ChevronDown'),
    Calendar: createIcon('Calendar'),
    Mail: createIcon('Mail'),
    FileText: createIcon('FileText'),
    Hash: createIcon('Hash'),
    Tag: createIcon('Tag'),
    Circle: createIcon('Circle'),
    CheckCircle: createIcon('CheckCircle'),
    Star: createIcon('Star'),
    MessageSquare: createIcon('MessageSquare'),
    // Add more icons as needed
  };
});

// Mock navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useFocusEffect: jest.fn(),
  };
});

// Setup global test timeout
jest.setTimeout(30000);

// Suppress console warnings and errors in tests
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
