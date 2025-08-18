import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Check, Calendar } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View, Platform } from 'react-native';
import {
  Button,
  Card,
  Checkbox,
  H3,
  Input,
  Label,
  Paragraph,
  RadioGroup,
  Select,
  Separator,
  TextArea,
  XStack,
  YStack,
} from 'tamagui';

import {
  type SampleFormData,
  defaultValues,
  sampleFormSchema,
} from '../schemas/sampleForm';

export default function SampleForm() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
  } = useForm<SampleFormData>({
    resolver: zodResolver(sampleFormSchema),
    defaultValues,
    mode: 'onChange', // リアルタイムバリデーションを有効化
  });

  const onSubmit = async (_data: SampleFormData) => {
    // デバッグ用（開発時のみ有効化）
    // console.log('フォームデータ:', _data);

    // 送信処理のシミュレーション（1秒の遅延）
    await new Promise(resolve => setTimeout(resolve, 1000));

    // アラートでの成功通知
    Alert.alert(
      'フォーム送信完了',
      'バリデーションが成功し、データが送信されました'
    );

    // フォームのリセット
    reset();
  };

  const handleFormSubmit = async () => {
    // 手動でバリデーションをトリガー
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Card
      elevate
      bordered
      padding="$4"
      bg="$background"
      borderColor="$borderColor"
    >
      <YStack gap="$4">
        <H3 color="$color12">Form Validation Demo</H3>
        <Paragraph color="$color11" size="$3">
          React Hook Form + Zod + Tamagui の統合サンプル
        </Paragraph>

        <Separator borderColor="$borderColor" />

        <YStack gap="$3" tag="form">
          {/* テキスト入力 */}
          <YStack gap="$2">
            <Label htmlFor="sampleText" color="$color12">
              サンプルテキスト{' '}
              <Paragraph color="$red10" tag="span">
                *
              </Paragraph>
            </Label>
            <Controller
              name="sampleText"
              control={control}
              render={({ field }) => (
                <Input
                  id="sampleText"
                  placeholder="3〜50文字で入力してください"
                  value={field.value}
                  onChangeText={field.onChange}
                  borderColor={errors.sampleText ? '$red8' : '$borderColor'}
                />
              )}
            />
            {errors.sampleText && (
              <Paragraph color="$red10" size="$2">
                {errors.sampleText.message}
              </Paragraph>
            )}
          </YStack>

          {/* メールアドレス */}
          <YStack gap="$2">
            <Label htmlFor="email" color="$color12">
              メールアドレス{' '}
              <Paragraph color="$red10" tag="span">
                *
              </Paragraph>
            </Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  placeholder="example@email.com"
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  borderColor={errors.email ? '$red8' : '$borderColor'}
                />
              )}
            />
            {errors.email && (
              <Paragraph color="$red10" size="$2">
                {errors.email.message}
              </Paragraph>
            )}
          </YStack>

          {/* 数値入力 */}
          <YStack gap="$2">
            <Label htmlFor="sampleNumber" color="$color12">
              サンプル数値 (1-100){' '}
              <Paragraph color="$red10" tag="span">
                *
              </Paragraph>
            </Label>
            <Controller
              name="sampleNumber"
              control={control}
              render={({ field }) => (
                <Input
                  id="sampleNumber"
                  placeholder="1〜100の数値を入力"
                  value={field.value?.toString() || ''}
                  onChangeText={text => {
                    const num = parseInt(text, 10);
                    field.onChange(isNaN(num) ? undefined : num);
                  }}
                  keyboardType="numeric"
                  borderColor={errors.sampleNumber ? '$red8' : '$borderColor'}
                />
              )}
            />
            {errors.sampleNumber && (
              <Paragraph color="$red10" size="$2">
                {errors.sampleNumber.message}
              </Paragraph>
            )}
          </YStack>

          {/* セレクトボックス */}
          <YStack gap="$2">
            <Label color="$color12">
              カテゴリー選択{' '}
              <Paragraph color="$red10" tag="span">
                *
              </Paragraph>
            </Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger>
                    <Select.Value placeholder="カテゴリーを選択してください" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item index={0} value="fruits">
                      <Select.ItemText>フルーツ</Select.ItemText>
                    </Select.Item>
                    <Select.Item index={1} value="colors">
                      <Select.ItemText>カラー</Select.ItemText>
                    </Select.Item>
                    <Select.Item index={2} value="animals">
                      <Select.ItemText>動物</Select.ItemText>
                    </Select.Item>
                  </Select.Content>
                </Select>
              )}
            />
            {errors.category && (
              <Paragraph color="$red10" size="$2">
                {errors.category.message}
              </Paragraph>
            )}
          </YStack>

          {/* ラジオボタン */}
          <YStack gap="$2">
            <Label color="$color12">
              オプション選択{' '}
              <Paragraph color="$red10" tag="span">
                *
              </Paragraph>
            </Label>
            <Controller
              name="option"
              control={control}
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <XStack gap="$4">
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <RadioGroup.Item value="optionA" id="optionA">
                        <RadioGroup.Indicator />
                      </RadioGroup.Item>
                      <Label htmlFor="optionA" color="$color11">
                        オプション A
                      </Label>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <RadioGroup.Item value="optionB" id="optionB">
                        <RadioGroup.Indicator />
                      </RadioGroup.Item>
                      <Label htmlFor="optionB" color="$color11">
                        オプション B
                      </Label>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <RadioGroup.Item value="optionC" id="optionC">
                        <RadioGroup.Indicator />
                      </RadioGroup.Item>
                      <Label htmlFor="optionC" color="$color11">
                        オプション C
                      </Label>
                    </View>
                  </XStack>
                </RadioGroup>
              )}
            />
            {errors.option && (
              <Paragraph color="$red10" size="$2">
                {errors.option.message}
              </Paragraph>
            )}
          </YStack>

          {/* チェックボックス（複数選択） */}
          <YStack gap="$2">
            <Label color="$color12">
              好み選択{' '}
              <Paragraph color="$red10" tag="span">
                *
              </Paragraph>
            </Label>
            <Controller
              name="preferences"
              control={control}
              render={({ field }) => (
                <YStack gap="$2">
                  {['reading', 'music', 'sports', 'cooking'].map(pref => (
                    <XStack
                      key={pref}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <Checkbox
                        id={pref}
                        checked={field.value?.includes(pref) || false}
                        onCheckedChange={checked => {
                          const currentValues = field.value || [];
                          if (checked) {
                            field.onChange([...currentValues, pref]);
                          } else {
                            field.onChange(
                              currentValues.filter(v => v !== pref)
                            );
                          }
                        }}
                      >
                        <Checkbox.Indicator>
                          <Check />
                        </Checkbox.Indicator>
                      </Checkbox>
                      <Label htmlFor={pref} color="$color11">
                        {pref === 'reading' && '読書'}
                        {pref === 'music' && '音楽'}
                        {pref === 'sports' && 'スポーツ'}
                        {pref === 'cooking' && '料理'}
                      </Label>
                    </XStack>
                  ))}
                </YStack>
              )}
            />
            {errors.preferences && (
              <Paragraph color="$red10" size="$2">
                {errors.preferences.message}
              </Paragraph>
            )}
          </YStack>

          {/* 日付選択 */}
          <YStack gap="$2">
            <Label color="$color12">
              日付選択{' '}
              <Paragraph color="$red10" tag="span">
                *
              </Paragraph>
            </Label>
            <Controller
              name="selectedDate"
              control={control}
              render={({ field }) => (
                <YStack gap="$2">
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      paddingVertical: 8,
                    }}
                  >
                    <Calendar size={16} color="$color11" />
                    <Paragraph color="$color11" size="$3">
                      選択された日付: {field.value || '未選択'}
                    </Paragraph>
                  </View>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'compact' : 'calendar'}
                    onChange={(event, date) => {
                      if (date) {
                        setSelectedDate(date);
                        field.onChange(formatDate(date));
                      }
                    }}
                    style={{
                      borderColor: errors.selectedDate
                        ? '#dc2626'
                        : 'transparent',
                      borderWidth: errors.selectedDate ? 1 : 0,
                      borderRadius: 8,
                    }}
                  />
                </YStack>
              )}
            />
            {errors.selectedDate && (
              <Paragraph color="$red10" size="$2">
                {errors.selectedDate.message}
              </Paragraph>
            )}
          </YStack>

          {/* コメント（オプション） */}
          <YStack gap="$2">
            <Label htmlFor="comments" color="$color12">
              コメント（任意）
            </Label>
            <Controller
              name="comments"
              control={control}
              render={({ field }) => (
                <TextArea
                  id="comments"
                  placeholder="任意でコメントを入力してください（500文字以下）"
                  value={field.value || ''}
                  onChangeText={field.onChange}
                  borderColor={errors.comments ? '$red8' : '$borderColor'}
                />
              )}
            />
            {errors.comments && (
              <Paragraph color="$red10" size="$2">
                {errors.comments.message}
              </Paragraph>
            )}
          </YStack>

          {/* 利用規約同意 */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Controller
              name="agreement"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="agreement"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                >
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox>
              )}
            />
            <Label htmlFor="agreement" color="$color11">
              サンプル利用規約に同意します{' '}
              <Paragraph color="$red10" tag="span">
                *
              </Paragraph>
            </Label>
          </View>
          {errors.agreement && (
            <Paragraph color="$red10" size="$2">
              {errors.agreement.message}
            </Paragraph>
          )}

          <Separator borderColor="$borderColor" />

          {/* 送信ボタン */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'center', gap: 12 }}
          >
            <Button
              theme="blue"
              onPress={handleFormSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? '送信中...' : '送信'}
            </Button>
            <Button
              variant="outlined"
              onPress={() => reset()}
              disabled={isSubmitting}
            >
              リセット
            </Button>
          </View>
        </YStack>
      </YStack>
    </Card>
  );
}
