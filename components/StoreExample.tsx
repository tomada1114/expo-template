import { Alert } from 'react-native';
import { Button, Card, H3, Paragraph, XStack, YStack } from 'tamagui';

import { useExampleStore, type User } from '../stores';

export default function StoreExample() {
  const { count, user, increment, decrement, reset, setUser, clearUser } =
    useExampleStore();

  const handleSetUser = () => {
    const newUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    setUser(newUser);
    Alert.alert('Success', 'User has been set!');
  };

  const handleClearUser = () => {
    clearUser();
    Alert.alert('Success', 'User has been cleared!');
  };

  return (
    <Card padding="$4" margin="$4">
      <YStack space="$4">
        <H3>Zustand Store Example</H3>

        <Card padding="$3" backgroundColor="$background">
          <YStack space="$2">
            <Paragraph fontWeight="bold">Counter: {count}</Paragraph>
            <XStack space="$2">
              <Button onPress={increment} theme="blue" flex={1}>
                +1
              </Button>
              <Button onPress={decrement} theme="red" flex={1}>
                -1
              </Button>
              <Button onPress={reset} theme="yellow" flex={1}>
                Reset
              </Button>
            </XStack>
          </YStack>
        </Card>

        <Card padding="$3" backgroundColor="$background">
          <YStack space="$2">
            <Paragraph fontWeight="bold">User Info:</Paragraph>
            {user ? (
              <YStack space="$1">
                <Paragraph>Name: {user.name}</Paragraph>
                <Paragraph>Email: {user.email}</Paragraph>
              </YStack>
            ) : (
              <Paragraph color="$color11">No user set</Paragraph>
            )}
            <XStack space="$2">
              <Button onPress={handleSetUser} theme="blue" flex={1}>
                Set User
              </Button>
              <Button onPress={handleClearUser} theme="red" flex={1}>
                Clear User
              </Button>
            </XStack>
          </YStack>
        </Card>

        <Card padding="$3" backgroundColor="$blue2">
          <YStack space="$1">
            <Paragraph fontSize="$2" fontWeight="bold" color="$blue11">
              💡 Features Demonstrated:
            </Paragraph>
            <Paragraph fontSize="$2" color="$blue11">
              • Global state management with Zustand
            </Paragraph>
            <Paragraph fontSize="$2" color="$blue11">
              • TypeScript type safety
            </Paragraph>
            <Paragraph fontSize="$2" color="$blue11">
              • AsyncStorage persistence
            </Paragraph>
            <Paragraph fontSize="$2" color="$blue11">
              • Dev tools integration
            </Paragraph>
          </YStack>
        </Card>
      </YStack>
    </Card>
  );
}
