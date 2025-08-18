# Maestro E2Eテスト

このディレクトリには、Expo Templateアプリの基本機能を確認するためのMaestro E2Eテストが含まれています。

## 概要

`smoke_test.yaml` は、アプリの主要な表示要素と基本的なインタラクションが正常に動作することを確認するシンプルなテストです。

## 必要条件

### 1. Maestro CLIのインストール

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

### 2. シミュレーター/エミュレーターの準備

#### iOS Simulator

```bash
# Xcode Simulatorを起動
open -a Simulator
```

#### Android Emulator

```bash
# Android Studioで作成済みのエミュレーターを起動
emulator -avd <your_avd_name>
```

### 3. アプリの起動

#### Expo Goを使用する場合（推奨）

```bash
# Expo Goアプリをシミュレーターにインストール
npm start
# QRコードをスキャンまたはシミュレーターで開く
```

#### 開発ビルドを使用する場合

```bash
# iOS
npm run ios

# Android
npm run android
```

## テスト実行

### 基本実行

```bash
npm run maestro:test
```

または

```bash
maestro test maestro/smoke_test.yaml
```

**注意**: アプリの起動には時間がかかる場合があります。テストには適切な待機時間が設定されているため、通常は2-3分程度で完了します。

### Maestro Studio（インタラクティブモード）

```bash
npm run maestro:studio
```

## テスト内容

### 1. アプリ起動確認

- **スマートな起動フロー**: Expo Goの状態に応じて自動判定
  - Expo Goホーム画面が表示されている場合 → `expo-template`をタップして起動
  - アプリが既に起動済みの場合 → そのまま継続
- アプリが正常に起動すること

### 2. 主要UI要素の表示確認

- タイトル「Tamagui Template」
- カードコンポーネント
- ボタンコンポーネント（デフォルト、ブルー、グリーン）
- インタラクティブコンポーネント（スイッチ）
- テーマ切り替えボタン

### 3. インタラクション確認

- シートの表示・非表示
- テーマ切り替え（ダーク ⇔ ライト）
- フォーム入力（名前、メール）

### 4. スクロール動作

- 画面の下部までスクロール可能

## トラブルシューティング

### アプリIDの設定

Expo Goを使用しない場合、アプリのBundle ID/Package Nameに応じて`smoke_test.yaml`の`appId`を変更してください：

```yaml
# iOS開発ビルドの場合
appId: com.yourcompany.yourapp

# Android開発ビルドの場合
appId: com.yourcompany.yourapp
```

### アプリIDの確認方法

#### iOS

```bash
xcrun simctl listapps booted | grep CFBundleIdentifier
```

#### Android

```bash
adb shell pm list packages | grep <app_name>
```

### よくある問題

1. **"App not found" エラー**
   - アプリがシミュレーター/エミュレーターで起動していることを確認
   - appIdが正しく設定されていることを確認

2. **要素が見つからない**
   - アプリの読み込みが完了するまで待つ
   - テキストの表記が変更されていないか確認

3. **シミュレーターに接続できない**
   - シミュレーターが起動していることを確認
   - 必要に応じて`maestro --device <device_id> test`でデバイスを指定

## 新しいテストの追加

テンプレートの機能を拡張した際は、対応するテストを`smoke_test.yaml`に追加するか、新しいテストファイルを作成してください。

```yaml
# 新しいアサーション例
- assertVisible: '新しい機能'
- tapOn: '新しいボタン'
- assertVisible: '期待される結果'
```
