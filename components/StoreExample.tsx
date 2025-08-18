import { Alert } from 'react-native';
import { Button, Card, H3, Paragraph, XStack, YStack } from 'tamagui';

import { useExampleStore, type User } from '../stores';

export default function StoreExample() {
  const counter = useExampleStore(state => state.counter);
  const user = useExampleStore(state => state.user);
  const isLoggedIn = useExampleStore(state => state.user !== null);
  const increment = useExampleStore(state => state.increment);
  const decrement = useExampleStore(state => state.decrement);
  const setCounter = useExampleStore(state => state.setCounter);
  const reset = useExampleStore(state => state.reset);
  const setUser = useExampleStore(state => state.setUser);
  const clearUser = useExampleStore(state => state.clearUser);

  const handleSetUser = () => {
    const newUser: User = {
      id: '1',
      name: 'サンプルユーザー',
      email: 'sample@example.com',
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
            <H3>カウンター機能</H3>
            <Paragraph fontWeight="bold">カウンター: {counter}</Paragraph>
            <XStack space="$2">
              <Button onPress={increment} theme="blue" flex={1}>
                増加
              </Button>
              <Button onPress={decrement} theme="red" flex={1}>
                減少
              </Button>
              <Button onPress={() => setCounter(10)} theme="green" flex={1}>
                10にセット
              </Button>
            </XStack>
          </YStack>
        </Card>

        <Card padding="$3" backgroundColor="$background">
          <YStack space="$2">
            <H3>ユーザー管理</H3>
            <Paragraph fontWeight="bold">
              ログイン状態: {isLoggedIn ? 'ログイン中' : 'ログアウト中'}
            </Paragraph>
            {user ? (
              <YStack space="$1">
                <Paragraph>
                  ユーザー: {user.name} ({user.email})
                </Paragraph>
              </YStack>
            ) : (
              <Paragraph color="$color11">ユーザー: 未ログイン</Paragraph>
            )}
            <XStack space="$2">
              {!user ? (
                <Button onPress={handleSetUser} theme="blue" flex={1}>
                  サンプルユーザーでログイン
                </Button>
              ) : (
                <Button onPress={handleClearUser} theme="red" flex={1}>
                  ログアウト
                </Button>
              )}
            </XStack>
          </YStack>
        </Card>

        <Card padding="$3" backgroundColor="$background">
          <YStack space="$2">
            <H3>リセット機能</H3>
            <Button onPress={reset} theme="yellow">
              全てリセット
            </Button>
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
