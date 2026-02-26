# 電卓アプリ (Calculator App)

整数の四則演算に対応したWebベースの電卓アプリケーションです。

## 機能

- ✅ 四則演算（加算、減算、乗算、除算）
- ✅ 演算子の優先順位サポート
- ✅ 括弧による演算順序の制御
- ✅ 計算履歴の表示（最大5件）
- ✅ キーボード操作対応
- ✅ エラーハンドリング（ゼロ除算、桁あふれ、不正入力）
- ✅ 環境変数による設定のカスタマイズ

## 技術スタック

- **フロントエンド**: React 18
- **ビルドツール**: Vite 5
- **スタイリング**: CSS Modules
- **テスト**: Vitest + React Testing Library
- **ホスティング**: Azure Static Web Apps

## セットアップ

### 前提条件

- Node.js 18.x 以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install
```

### 環境変数の設定

`.env.example` をコピーして `.env` ファイルを作成し、必要に応じて値を調整してください。

```bash
# .env
VITE_MAX_DIGITS=10        # 表示可能な最大桁数
VITE_HISTORY_COUNT=5      # 計算履歴の保存件数
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

### ビルド

```bash
npm run build
```

ビルド成果物は `dist/` ディレクトリに生成されます。

### プレビュー

```bash
npm run preview
```

ビルドされたアプリケーションをローカルでプレビューします。

## テスト

```bash
# テストの実行
npm test

# UIモードでテストを実行
npm run test:ui

# カバレッジレポートの生成
npm run test:coverage
```

## 使い方

### マウス操作

- 数字ボタン（0-9）をクリックして数値を入力
- 演算子ボタン（+、-、×、÷）をクリックして演算子を入力
- 括弧ボタン（(、)）をクリックして演算順序を制御
- **=** ボタンで計算を実行
- **AC** ボタンで全てをクリア
- **Del** ボタンで最後の1文字を削除

### キーボード操作

| キー | 機能 |
|------|------|
| `0-9` | 数字入力 |
| `+` | 加算 |
| `-` | 減算 |
| `*` | 乗算（×として表示） |
| `/` | 除算（÷として表示） |
| `(` `)` | 括弧 |
| `Enter` | 計算実行（=） |
| `Escape` | 全クリア（AC） |
| `Backspace` | 1文字削除（Del） |

## プロジェクト構造

```
calc-app/
├── .github/              # GitHub設定
├── docs/                 # ドキュメント
│   ├── requirements.md
│   └── nonrequirements.md
├── public/               # 静的ファイル
│   └── calculator-icon.svg
├── src/
│   ├── components/       # Reactコンポーネント
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   ├── Calculator.jsx
│   │   ├── Calculator.module.css
│   │   ├── Display.jsx
│   │   ├── Display.module.css
│   │   ├── History.jsx
│   │   └── History.module.css
│   ├── utils/            # ユーティリティ
│   │   ├── parser.js
│   │   └── validator.js
│   ├── test/             # テスト設定
│   │   └── setup.js
│   ├── App.jsx
│   ├── App.module.css
│   ├── main.jsx
│   └── index.css
├── tests/                # テストファイル
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── README.md
```

## デプロイ

このアプリケーションは Azure Static Web Apps にデプロイされます。

### GitHub Actionsによる自動デプロイ

`release` ブランチへのマージをトリガーに、GitHub Actions が自動的にビルドとデプロイを実行します。

詳細は非機能要件ドキュメント（`docs/nonrequirements.md`）を参照してください。

## ライセンス

MIT License

## ドキュメント

- [機能要件](docs/requirements.md)
- [非機能要件](docs/nonrequirements.md)