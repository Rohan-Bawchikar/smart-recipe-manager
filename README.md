# 🍳 Smart Recipe Manager - Enterprise Edition

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

A high-performance, enterprise-grade web application for managing recipes. Built entirely from scratch using **Vanilla TypeScript, HTML, and CSS** without relying on heavy frontend frameworks (no React, Vue, or Angular).

This project demonstrates strong architectural patterns, Object-Oriented Programming (OOP) principles, DOM manipulation, and premium modern UI/UX design.

---

## ✨ Features

- **Enterprise Architecture**: Built using strict Object-Oriented TypeScript (Services, Renderers, Models).
- **Aesthetic UI/UX**: Features a highly premium "glassmorphism" design, a floating pill navbar, and subtle micro-animations.
- **Hardware-Accelerated Parallax**: Smooth 60FPS scroll parallax hero section powered by pure CSS 3D transforms and TypeScript debouncing.
- **Data Persistence**: Recipes are seamlessly saved to and loaded from the browser's `localStorage`.
- **Advanced Filtering & Sorting**: Filter recipes by diet (Veg/Non-Veg), category, favorites, or search by text in real-time.
- **Dark/Light Mode**: Full theme switching support with CSS variables.
- **Detailed Recipe Views**: Split-layout detailed modal to view ingredients and cooking steps elegantly.

---

## 🏗️ Architecture & Folder Structure

The application separates concerns strictly to keep the codebase scalable:

```
src/
├── models/         # Data interfaces and types (e.g., Recipe.ts)
├── enums/          # Enumerations (e.g., Category.ts)
├── services/       # Core business logic
│   ├── StorageService.ts  # Handles localStorage interactions
│   ├── RecipeService.ts   # Manages recipe states, filtering, and sorting
│   └── ThemeService.ts    # Manages Light/Dark mode toggling
├── components/     # Reusable DOM generators
│   └── RecipeCard.ts      # Generates the HTML for individual recipe cards
├── ui/             # View layer controllers (DOM manipulation)
│   ├── DashboardRenderer.ts # Renders statistics
│   ├── RecipeRenderer.ts    # Renders the recipe grid
│   ├── ParallaxEffect.ts    # Manages scroll-based hero animations
│   ├── FilterPanel.ts       # Manages dropdown filters
│   └── SearchBar.ts         # Manages text search input
├── constants/      # App-wide constants (e.g., Mock Data)
├── main.ts         # Application entry point and orchestrator
└── style.css       # Core design tokens and styles
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Install all dependencies (Vite & TypeScript):
```bash
npm install
```

2. Start the local development server:
```bash
npm run dev
```

3. Build for Production:
```bash
npm run build
```
*This command invokes the TypeScript compiler (`tsc`) to ensure strict type safety, and then Vite bundles and minifies the assets into the `dist/` directory.*

---

## 💡 Key Technical Highlights

1. **Pure TypeScript Classes**: Avoiding global state spaghetti by encapsulating logic inside dedicated classes.
2. **Event Delegation**: DOM events are handled efficiently using callbacks passed from the orchestrator (`main.ts`) down to the UI classes.
3. **Optimized Rendering**: The UI only re-renders when data changes, and DOM updates are kept minimal.
4. **CSS Grid & Flexbox**: Layouts are fully responsive across mobile, tablet, and desktop without using Bootstrap or Tailwind.
5. **Accessibility**: Form elements and interactive components use appropriate `aria-label` tags for screen-reader compatibility.
