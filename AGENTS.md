# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## リポジトリの目的

このリポジトリは、Expo開発における汎用的なテンプレートリポジトリとして設計されています。
今後のプロジェクトで再利用可能な、高品質なコードベースと完備されたテスト環境を提供することを目的としています。

## Project Overview

This is an Expo React Native template project featuring:

- **Expo SDK ~53.0** with React Native 0.79.5 and React 19.0.0
- **Expo Router** for file-based navigation with typed routes
- **TypeScript** with strict mode enabled
- **Tamagui** as the UI system with theme support
- **React Hook Form + Zod** for form validation
- **Zustand** for global state management with persistence
- **ESLint + Prettier** with comprehensive code quality setup
- **Jest + Testing Library** for unit and integration testing

## Development Commands

### Build and Development

- `npm install` - Install dependencies
- `npm start` or `npx expo start` - Start development server
- `npm run android` - Start Android development build
- `npm run ios` - Start iOS development build
- `npm run ios:tunnel` - Start iOS development build with tunnel
- `npm run web` - Start web development build
- `npm run reset-project` - Reset to blank project (moves starter code to app-example/)

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check Prettier formatting
- `npm run type-check` - Run TypeScript type checking

### Testing

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests in CI mode (optimized for CI/CD pipelines)
- `jest [filename]` - Run specific test file
- `jest --findRelatedTests [filename]` - Run tests related to specific source file

### E2E Testing (Maestro)

- `npm run maestro:test` - Run all test scenarios in maestro/ directory
- `npm run maestro:test:file <filepath>` - Run specific test file
- `npm run maestro:studio` - Launch Maestro Studio for interactive testing

## Architecture

### Technology Stack Integration

The project integrates several key technologies in a specific way:

1. **Tamagui Provider Hierarchy**: `TamaguiProvider` wraps `PortalProvider` which wraps `ThemeProvider` in `app/_layout.tsx`
2. **Theme System**: Automatic dark/light theme detection via `useColorScheme()` with React Navigation theme integration
3. **Form Validation Pattern**: React Hook Form controller + Zod resolver + Tamagui UI components
4. **State Management**: Zustand stores with AsyncStorage persistence and DevTools integration
5. **Type Safety**: TypeScript strict mode with Zod schema inference for form data types

### File Structure

- `/app` - Expo Router file-based routing (main application)
- `/app-example` - Original Expo template code (preserved as reference)
- `/components` - Reusable UI components (SampleForm, StoreExample)
- `/schemas` - Zod validation schemas (sampleForm.ts)
- `/stores` - Zustand state management stores with types
- `/assets` - Static assets (fonts, images)
- `tamagui.config.ts` - Tamagui configuration using default v4 config

### Key Implementation Patterns

**Form Handling Pattern:**

```typescript
// 1. Define Zod schema in /schemas
export const schema = z.object({...})
export type FormData = z.infer<typeof schema>

// 2. Use with React Hook Form + Tamagui
const { control, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema),
  mode: 'onChange'
})
```

**Tamagui Layout Workarounds:**

- Use React Native `View` with `style` prop instead of Tamagui shorthand props (ai, jc) to avoid Babel parser errors
- Pattern: `<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>`

**Component Integration:**

- Import `Check` from `@tamagui/lucide-icons` for checkbox indicators
- Use `Alert.alert` from React Native for simple notifications
- Manual validation triggering with `trigger()` function for better UX

**Date Selection Pattern:**

- Use `@react-native-community/datetimepicker` for Expo-compatible date selection
- Always-visible calendar with `display={Platform.OS === 'ios' ? 'compact' : 'calendar'}`
- Date formatting to YYYY-MM-DD format for form submission
- Platform-specific handling for iOS/Android differences

**State Management Pattern:**

```typescript
// 1. Define types in /stores/types.ts
export interface StoreState {
  data: any;
}
export interface StoreActions {
  action: () => void;
}
export type Store = StoreState & StoreActions;

// 2. Create store with persistence in /stores/[storeName].ts
const useStore = create<Store>()(
  devtools(
    persist(
      set => ({
        data: null,
        action: () => set({ data: newData }),
      }),
      {
        name: 'store-name',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);

// 3. Use in components with selectors
const data = useStore(state => state.data);
const action = useStore(state => state.action);
```

## 品質チェックとコミットの指針

### 必須の品質チェック

すべての開発作業において、以下のチェックを必ず実行してください：

1. **ESLintチェック**: `npm run lint`
2. **TypeScriptチェック**: `npm run type-check`
3. **Prettierフォーマット**: `npm run format`
4. **フォーマット確認**: `npm run format:check`
5. **テスト実行**: `npm test` (全56テストが成功すること)

これらのチェックはすべてパスする必要があります。エラーがある場合は修正してから次の工程に進んでください。

### コミットプロセス

コード変更後は、Claude Codeが以下の手順でコミットを実行します：

1. 品質チェックの完了確認
2. `git status`で変更内容の確認
3. `git diff`で具体的な変更の確認
4. `git log`で最近のコミット履歴の確認
5. 適切なコミットメッセージでコミット実行

pre-commit hooksにより、コミット時にも自動的に品質チェックが実行されます。

## Development Notes

### Pre-commit Setup

The project uses Husky + lint-staged for automated code quality checks:

- TypeScript/JavaScript files: ESLint with auto-fix + Prettier formatting + Related tests execution
- JSON/Markdown/YAML files: Prettier formatting only
- Tests are automatically run for changed files using `jest --findRelatedTests`

### Template Features

- **Sample Form**: `/components/SampleForm.tsx` demonstrates React Hook Form + Zod + Tamagui integration
- **State Management Example**: `/components/StoreExample.tsx` demonstrates Zustand usage patterns
- **Reset Script**: `npm run reset-project` moves example code to `/app-example` for clean project start
- **TypeScript Configuration**: Strict mode enabled with path alias `@/*` mapping to project root

### Known Issues & Workarounds

1. **Tamagui Babel Parser**: Avoid object literals in style props; use React Native View component with style prop
2. **Form Validation**: Use `mode: 'onChange'` and manual `trigger()` for real-time validation
3. **Checkbox Icons**: Require explicit `<Check />` import from `@tamagui/lucide-icons`
4. **Tamagui Theme Props**: Some theme values like `"gray"` are not valid; use `"blue"`, `"red"`, `"green"`, `"yellow"` instead

### Dependencies Overview

- **Core**: Expo 53, React Native 0.79.5, React 19.0.0
- **UI**: Tamagui 1.132.20 with Lucide icons and Portal provider
- **Forms**: React Hook Form 7.62.0 + @hookform/resolvers 5.2.1 + Zod 4.0.17
- **State Management**: Zustand 5.0.7 with AsyncStorage 2.1.2 for persistence
- **Date Selection**: @react-native-community/datetimepicker 8.4.1 (Expo-compatible)
- **Development**: TypeScript 5.8.3, ESLint 9.25.0, Prettier 3.6.2, Husky 9.1.7
- **Testing**: Jest 29.7.0 with jest-expo preset, @testing-library/react-native 12.9.0

## Testing Environment

### Test Structure

- `/schemas/__tests__/` - Schema validation tests (Zod schemas)
- `/stores/__tests__/` - Store tests (Zustand state management)
- `/components/__tests__/` - Component tests (UI and integration)

### Test Configuration

- **jest.config.js**: Configured with jest-expo preset and jsdom environment
- **jest.setup.js**: Global test setup with mocks for Tamagui, AsyncStorage, and other dependencies
- **Coverage threshold**: 50% for all metrics (branches, functions, lines, statements)

### Writing Tests

```typescript
// Component tests
import { render, fireEvent } from '@testing-library/react-native';

// Store tests with AsyncStorage persistence
import { renderHook, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Schema validation tests
import { schema } from '../schemas/schemaName';
const result = schema.safeParse(testData);
```

### Test Mocking Strategy

- **Tamagui components**: Mocked with React Native base components (View, Text, TextInput)
- **@tamagui/lucide-icons**: Mocked as simple View components with testID
- **AsyncStorage**: Mocked using official jest mock from @react-native-async-storage/async-storage
- **Navigation**: Basic navigation methods mocked (@react-navigation/native)

### Expo Compatibility Notes

- Use `npx expo install` for native dependencies to ensure SDK compatibility
- `@react-native-community/datetimepicker` is preferred over `react-native-date-picker` for Expo environments
- Avoid native libraries that require manual linking; prefer Expo-managed dependencies

## テスト戦略 (Testing Strategy)

### テストの種類と責務分担

#### 1. 単体テスト (Unit Tests) - `npm test`

**モック対象**: Tamagui UI、AsyncStorage、Navigation
**テスト対象**:

- **ビジネスロジック**: 純粋な関数、計算処理
- **Zodスキーマ**: 各フィールドのバリデーションルール
- **Zustandアクション**: increment、decrement、reset等の個別アクション
- **データ変換**: 日付フォーマット、型変換処理

**例**:

```typescript
// schemas/__tests__/sampleForm.test.ts
it('should validate email format', () => {
  const result = schema.safeParse({ email: 'invalid' });
  expect(result.success).toBe(false);
});
```

#### 2. 結合テスト (Integration Tests) - `npm test`

**部分モック**: UIライブラリのみモック、ロジックは実装使用
**テスト対象**:

- **フォーム統合**: React Hook Form + Zod + UI操作の連携
- **状態管理統合**: コンポーネントとZustandストアの相互作用
- **永続化**: AsyncStorageへの保存・読み込み
- **エラーハンドリング**: バリデーションエラーの表示

**例**:

```typescript
// components/__tests__/SampleForm.test.tsx
it('should submit form with valid data', async () => {
  fireEvent.changeText(getByPlaceholder('名前'), 'テスト太郎');
  fireEvent.press(getByText('送信'));
  await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
});
```

#### 3. E2Eテスト (End-to-End Tests) - `npm run maestro:test`

**実機環境**: シミュレーター/エミュレーターで実行
**テスト対象**:

- **クリティカルパス**: アプリ起動→主要機能の利用
- **視覚的確認**: UIコンポーネントの実際の表示
- **ネイティブ機能**: シート、モーダル、アニメーション
- **ユーザーフロー**: 実際の操作順序での動作確認

**例**:

```yaml
# maestro/smoke_test.yaml
- launchApp
- assertVisible: 'Tamagui Template'
- tapOn: 'シートを開く'
- assertVisible: 'シートコンポーネント'
```

### テスト実行の指針

1. **開発中**:
   - 変更したファイルの単体テスト: `jest --findRelatedTests [file]`
   - 関連コンポーネントの結合テスト: `npm test [component]`

2. **コミット前**:
   - 全単体・結合テスト: `npm test`
   - 品質チェック: `npm run lint && npm run type-check`

3. **機能完成時**:
   - 全E2Eテスト: `npm run maestro:test`
   - 特定シナリオ: `npm run maestro:test:file maestro/[scenario].yaml`
   - カバレッジ確認: `npm run test:coverage`

### モック戦略

| ライブラリ          | 単体テスト      | 結合テスト      | E2Eテスト           |
| ------------------- | --------------- | --------------- | ------------------- |
| **Tamagui UI**      | ✅ 完全モック   | ✅ 完全モック   | ❌ 実コンポーネント |
| **AsyncStorage**    | ✅ メモリモック | ✅ メモリモック | ❌ 実ストレージ     |
| **Navigation**      | ✅ 関数モック   | ⚠️ 部分モック   | ❌ 実ナビゲーション |
| **Zustand**         | ❌ 実装使用     | ❌ 実装使用     | ❌ 実装使用         |
| **React Hook Form** | ❌ 実装使用     | ❌ 実装使用     | ❌ 実装使用         |
| **Zod**             | ❌ 実装使用     | ❌ 実装使用     | ❌ 実装使用         |

### テストファイル配置

```
├── components/__tests__/        # コンポーネントの結合テスト
│   ├── *.test.tsx              # 詳細な結合テスト
│   └── *.simple.test.tsx       # 基本的な表示テスト
├── schemas/__tests__/           # スキーマの単体テスト
├── stores/__tests__/            # ストアの単体・結合テスト
└── maestro/                     # E2Eテスト
    └── smoke_test.yaml          # 基本動作確認
```
