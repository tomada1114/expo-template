import { z } from 'zod';

// サンプルフォーム用のバリデーションスキーマ
// 実際のプロジェクトではビジネスロジックに応じて適切に変更してください
export const sampleFormSchema = z.object({
  // テキスト入力（文字数制限付き）
  sampleText: z
    .string()
    .min(1, 'テキストは必須です')
    .min(3, '3文字以上入力してください')
    .max(50, '50文字以下で入力してください'),

  // 数値入力（範囲指定）
  sampleNumber: z
    .number({ message: '数値を入力してください' })
    .min(1, '1以上の数値を入力してください')
    .max(100, '100以下の数値を入力してください'),

  // メールアドレス（フォーマット検証）
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email('正しいメールアドレス形式で入力してください'),

  // セレクトボックス（列挙値）
  category: z.enum(['fruits', 'colors', 'animals'], {
    message: 'カテゴリーを選択してください',
  }),

  // ラジオボタン（選択肢）
  option: z.enum(['optionA', 'optionB', 'optionC'], {
    message: 'オプションを選択してください',
  }),

  // チェックボックス（複数選択可能）
  preferences: z.array(z.string()).min(1, '少なくとも1つ選択してください'),

  // 同意チェックボックス（必須）
  agreement: z.boolean().refine(val => val === true, {
    message: '利用規約に同意してください',
  }),

  // 日付選択（YYYY-MM-DD形式）
  selectedDate: z
    .string()
    .min(1, '日付を選択してください')
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      '正しい日付形式（YYYY-MM-DD）で入力してください'
    ),

  // オプショナルなテキストエリア
  comments: z.string().max(500, '500文字以下で入力してください').optional(),
});

export type SampleFormData = z.infer<typeof sampleFormSchema>;

// フォームのデフォルト値
export const defaultValues: Partial<SampleFormData> = {
  sampleText: '',
  email: '',
  preferences: [],
  agreement: false,
  selectedDate: '',
  comments: '',
};
