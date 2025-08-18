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
- **ESLint + Prettier** with comprehensive code quality setup

## Development Commands

- `npm install` - Install dependencies
- `npm start` or `npx expo start` - Start development server
- `npm run android` - Start Android development build
- `npm run ios` - Start iOS development build
- `npm run ios:tunnel` - Start iOS development build with tunnel
- `npm run web` - Start web development build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check Prettier formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run reset-project` - Reset to blank project (moves starter code to app-example/)

## Architecture

### Technology Stack Integration

The project integrates several key technologies in a specific way:

1. **Tamagui Provider Hierarchy**: `TamaguiProvider` wraps `PortalProvider` which wraps `ThemeProvider` in `app/_layout.tsx`
2. **Theme System**: Automatic dark/light theme detection via `useColorScheme()` with React Navigation theme integration
3. **Form Validation Pattern**: React Hook Form controller + Zod resolver + Tamagui UI components
4. **Type Safety**: TypeScript strict mode with Zod schema inference for form data types

### File Structure

- `/app` - Expo Router file-based routing (main application)
- `/app-example` - Original Expo template code (preserved as reference)
- `/components` - Reusable UI components (currently contains SampleForm)
- `/schemas` - Zod validation schemas (contains sampleForm.ts as example)
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

## 品質チェックとコミットの指針

### 必須の品質チェック

すべての開発作業において、以下のチェックを必ず実行してください：

1. **ESLintチェック**: `npm run lint`
2. **TypeScriptチェック**: `npm run type-check`
3. **Prettierフォーマット**: `npm run format`
4. **フォーマット確認**: `npm run format:check`

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

- TypeScript/JavaScript files: ESLint with auto-fix + Prettier formatting
- JSON/Markdown/YAML files: Prettier formatting only

### Template Features

- **Sample Form**: `/components/SampleForm.tsx` demonstrates React Hook Form + Zod + Tamagui integration
- **Reset Script**: `npm run reset-project` moves example code to `/app-example` for clean project start
- **TypeScript Configuration**: Strict mode enabled with path alias `@/*` mapping to project root

### Known Issues & Workarounds

1. **Tamagui Babel Parser**: Avoid object literals in style props; use React Native View component with style prop
2. **Form Validation**: Use `mode: 'onChange'` and manual `trigger()` for real-time validation
3. **Checkbox Icons**: Require explicit `<Check />` import from `@tamagui/lucide-icons`

### Dependencies Overview

- **Core**: Expo 53, React Native 0.79.5, React 19.0.0
- **UI**: Tamagui 1.132.20 with Lucide icons and Portal provider
- **Forms**: React Hook Form 7.62.0 + @hookform/resolvers 5.2.1 + Zod 4.0.17
- **Development**: TypeScript 5.8.3, ESLint 9.25.0, Prettier 3.6.2, Husky 9.1.7
