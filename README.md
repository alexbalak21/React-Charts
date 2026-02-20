# React Charts Components

A modern dashboard demo built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It visualizes support ticket data using reusable chart components.

### Screenshot
![Dark Dashboard Screenshot](/project-images/dark.jpg)

![Light Dashboard Screenshot](/project-images/light.jpg)
## Features

- 📊 Donut, bar, and matrix charts for ticket analytics
- 🎨 Beautiful, responsive UI with Tailwind CSS
- ⚡ Fast Vite dev server and build
- 🧩 Modular, typed React components
- 📁 Demo data for users, tickets, priorities, and statuses

## Demo

The dashboard displays:
- Tickets by priority (donut)
- Tickets by status (donut)
- Tickets per support agent (bar)
- Tickets per user (vertical bar)
- Tickets per agent × priority (matrix & grouped bar)
- Per-agent donut breakdowns

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install dependencies
```sh
npm install
# or
yarn install
```

### Run the app in development
```sh
npm run dev
# or
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production
```sh
npm run build
# or
yarn build
```

### Lint
```sh
npm run lint
```

## Project Structure

- `src/` — React components and entry point
- `data/` — Demo JSON data (users, tickets, priorities, statuses)
- `public/` — Static assets
- `project-images/` — (Optional) Images for documentation or demo

## Data Model

- **users.json**: Support agents and normal users
- **tickets.json**: Tickets with priority, status, creator, and assignee
- **priorities.json**: Priority levels (Low, Medium, High, Critical)
- **statuses.json**: Ticket status (Open, In Progress, Waiting, etc.)

## Main Dependencies

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/) (with React & TypeScript plugins)

## License

MIT (see LICENSE if present)
