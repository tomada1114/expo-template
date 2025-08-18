# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

## Development Notes

The project includes a reset script that can move the example code to `/app-example` and create a minimal starting point. The current setup appears to be in a minimal state with basic routing already configured.