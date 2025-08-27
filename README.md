# Hero Battle

A web-based tactical RPG game with character management and battle mechanics.

## Project Structure

```
heroBattle/
├── game/          # Game frontend (React + TypeScript)
├── admin/         # Admin panel (React + TypeScript)  
├── functions/     # Firebase Cloud Functions
├── shared/        # Shared types and utilities
└── .vscode/       # VS Code workspace settings
```

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Run game app (port 5173)
npm run dev:game

# Run admin app (port 5174)
npm run dev:admin

# Run both apps simultaneously
npm run dev:all
```

## Development

- **Game App**: Character battles and gameplay
- **Admin App**: Character and data management
- **Shared Types**: Common TypeScript definitions
- **Environment**: See `.env.example` for configuration

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Zustand (state management)
- Firebase (future integration)

## Development Credits

This project is developed with assistance from Claude AI for architecture, setup, and implementation guidance.

## License

Private project - All rights reserved