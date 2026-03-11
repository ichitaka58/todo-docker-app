# Todo Docker App

個人のDocker学習用のTodoアプリケーションです。

## 技術スタック / アーキテクチャ

本アプリは以下の技術を用いて構築されています。

### フロントエンド
- **React** (UIライブラリ)
- **Vite** (ビルドツール)
- **Tailwind CSS v4** (スタイリング)
- **TypeScript**

### バックエンド (API)
- **Hono** (Webフレームワーク)
- **Node.js** (実行環境として `@hono/node-server` を利用)
- **Prisma** (ORM)
- **TypeScript**

### データベース・インフラ
- **PostgreSQL** (リレーショナルデータベース)
- **Docker / Docker Compose** (コンテナ環境)

## 起動方法

Docker Composeを使ってすべてのコンテナを立ち上げます。

```bash
docker-compose up -d
```

起動後、以下のURLからアクセスできます。

- フロントエンド: [http://localhost:5173](http://localhost:5173)
- バックエンド(API): [http://localhost:3000](http://localhost:3000)
- Prisma Studio: [http://localhost:5555](http://localhost:5555)

## 停止方法

```bash
docker-compose down
```
