# nextchapter-mobile

React Native companion app for [NextChapter](https://nextchapter.fly.dev) — a quiet space for intentional readers to gather.

Built with Expo SDK 55, Expo Router, TypeScript, Uniwind, and React Native Reusables. Authenticates against the NextChapter Rails API via JWT.

## Prerequisites

- Node 20+
- pnpm
- Expo CLI (`pnpm add -g expo-cli`)
- A running instance of the [nextchapter](https://github.com/stevebutler2210/nextchapter) Rails API (local or deployed)
- GitHub Packages token with `read:packages` scope (for design tokens)

## Setup

```bash
# Set your GitHub Packages token
export PACKAGES_TOKEN=your_token_here

# Install dependencies
pnpm install

# Start the dev server
pnpm start
```

Open in a dev build on iOS simulator:

```bash
pnpm run ios
```

> Expo Go is not supported — a development build is required due to native modules.

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

For the deployed API use `https://nextchapter.fly.dev`.

## Design tokens

Styles are driven by the shared `@stevebutler2210/nextchapter-design-tokens` package, published to GitHub Packages. This is the single source of truth for colours, spacing, and typography across both the Rails app and this mobile app. See [`docs/DESIGN.md`](../nextchapter/docs/DESIGN.md) for the full design record.

## Stack

| Concern    | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | Expo SDK 55 / React Native 0.83                    |
| Navigation | Expo Router (file-based)                           |
| Styling    | Uniwind (Tailwind v4 for React Native)             |
| Components | React Native Reusables                             |
| Auth       | JWT via Rails API, persisted with Expo SecureStore |
| HTTP       | apisauce                                           |
| State      | React context + hooks                              |

## Screens

| Screen            | Status         |
| ----------------- | -------------- |
| Sign in           | Day 9          |
| Sign up           | Day 9          |
| Clubs list        | Day 9          |
| Club detail       | Day 9          |
| ISBN barcode scan | Day 9 (tier 2) |
