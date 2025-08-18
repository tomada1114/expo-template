import { ChevronDown } from '@tamagui/lucide-icons';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  H1,
  H2,
  Paragraph,
  ScrollView,
  Separator,
  Sheet,
  Switch,
  Theme,
  XStack,
  YStack,
} from 'tamagui';

export default function Index() {
  const [open, setOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Theme name={theme}>
      <ScrollView background="$background">
        <YStack p="$4" pt="$6" pb="$10" gap="$4">
          <H1 size="$9" style={{ textAlign: 'center' }} color="$color12">
            Tamagui Template
          </H1>
          <Paragraph size="$5" style={{ textAlign: 'center' }} color="$color11">
            このテンプレートでTamaguiの基本コンポーネントを確認できます
          </Paragraph>

          <Separator borderColor="$borderColor" />

          <Card
            elevate
            bordered
            padding="$4"
            bg="$background"
            borderColor="$borderColor"
          >
            <YStack gap="$3">
              <H2 color="$color12">カードコンポーネント</H2>
              <Paragraph color="$color11">
                これはTamaguiのCardコンポーネントです。elevateとborderedプロパティを使用しています。
              </Paragraph>
            </YStack>
          </Card>

          <YStack
            gap="$3"
            p="$4"
            bg="$color2"
            style={{ borderRadius: 16, borderWidth: 1 }}
            borderColor="$borderColor"
          >
            <H2 color="$color12">ボタンコンポーネント</H2>
            <XStack gap="$3" style={{ justifyContent: 'center' }}>
              <Button size="$3" bg="$color8" color="$color1">
                デフォルト
              </Button>
              <Button size="$3" theme="blue">
                ブルー
              </Button>
              <Button size="$3" theme="green">
                グリーン
              </Button>
            </XStack>
            <XStack gap="$3" style={{ justifyContent: 'center' }}>
              <Button size="$2" circular theme="red">
                S
              </Button>
              <Button size="$4" iconAfter={ChevronDown} theme="blue">
                アイコン付き
              </Button>
            </XStack>
          </YStack>

          <YStack
            gap="$3"
            p="$4"
            bg="$color2"
            style={{ borderRadius: 16, borderWidth: 1 }}
            borderColor="$borderColor"
          >
            <H2 color="$color12">インタラクティブコンポーネント</H2>
            <XStack gap="$4" style={{ alignItems: 'center' }}>
              <Paragraph color="$color11">スイッチ:</Paragraph>
              <Switch
                size="$4"
                checked={switchOn}
                onCheckedChange={setSwitchOn}
                bg={switchOn ? '$green10' : '$color6'}
              >
                <Switch.Thumb animation="quick" />
              </Switch>
              <Paragraph color="$color11">{switchOn ? 'ON' : 'OFF'}</Paragraph>
            </XStack>

            <Button onPress={() => setOpen(true)} theme="blue">
              シートを開く
            </Button>
          </YStack>

          <YStack
            gap="$3"
            p="$4"
            bg="$color2"
            style={{ borderRadius: 16, borderWidth: 1 }}
            borderColor="$borderColor"
          >
            <H2 color="$color12">テーマ切り替え</H2>
            <XStack gap="$3" style={{ justifyContent: 'center' }}>
              <Button
                theme={theme === 'light' ? 'blue' : undefined}
                onPress={() => setTheme('light')}
              >
                ライト
              </Button>
              <Button
                theme={theme === 'dark' ? 'blue' : undefined}
                onPress={() => setTheme('dark')}
              >
                ダーク
              </Button>
            </XStack>
          </YStack>

          <Sheet
            forceRemoveScrollEnabled={open}
            modal
            open={open}
            onOpenChange={setOpen}
            snapPoints={[85, 50, 25]}
            dismissOnSnapToBottom
          >
            <Sheet.Overlay style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />
            <Sheet.Handle bg="$color8" />
            <Sheet.Frame
              bg="$background"
              style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            >
              <YStack p="$4" gap="$3">
                <H2 color="$color12">シートコンポーネント</H2>
                <Paragraph color="$color11">
                  これはTamaguiのSheetコンポーネントです。
                  下から上にスライドして表示され、複数のスナップポイントを設定できます。
                </Paragraph>
                <Button onPress={() => setOpen(false)} theme="blue">
                  閉じる
                </Button>
              </YStack>
            </Sheet.Frame>
          </Sheet>
        </YStack>
      </ScrollView>
    </Theme>
  );
}
