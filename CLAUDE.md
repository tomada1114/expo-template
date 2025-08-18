# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## リポジトリの目的

このリポジトリは、Expo開発における汎用的なテンプレートリポジトリとして設計されています。
今後のプロジェクトで再利用可能な、高品質なコードベースと完備されたテスト環境を提供することを目的としています。

### 主な特徴

- コード品質を担保する各種リンター・フォーマッター設定
- テスト環境の完全なセットアップ
- ベストプラクティスに基づいたプロジェクト構造
- CI/CDパイプラインの基本設定
- 開発効率を向上させる各種ツールの統合

## Project Overview

This is an Expo React Native project created with `create-expo-app`. It uses:

- **Expo SDK ~53.0** with React Native 0.79.5 and React 19.0.0
- **Expo Router** for file-based navigation with typed routes enabled
- **TypeScript** with strict mode enabled
- **ESLint** with Expo configuration

## Development Commands

- `npm install` - Install dependencies
- `npm start` or `npx expo start` - Start development server
- `npm run android` - Start Android development build
- `npm run ios` - Start iOS development build
- `npm run web` - Start web development build
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset to blank project (moves starter code to app-example/)

## Architecture

### File-based Routing

- Routes are defined by files in the `/app` directory
- Uses Expo Router with Stack navigation as the root layout
- TypeScript path alias `@/*` maps to project root

### Project Structure

- `/app` - Main application routes and screens
- `/app-example` - Contains starter template code (components, hooks, constants)
- `/assets` - Static assets (fonts, images)
- `/components` - Reusable UI components (when not using starter template)
- `/hooks` - Custom React hooks
- `/constants` - App constants like colors

### Key Features

- New Architecture enabled for React Native
- Cross-platform support (iOS, Android, Web)
- Haptics, fonts, and image optimization via Expo modules
- Automatic dark/light theme support

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

The project includes a reset script that can move the example code to `/app-example` and create a minimal starting point. The current setup appears to be in a minimal state with basic routing already configured.
