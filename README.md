# Hello App

A simple landing page built with Next.js 14 and the App Router.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components (Button, Card)
- Responsive design
- Modern gradient background

## Getting Started

### Installation

The dependencies are already installed. If you need to reinstall them:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

After building, start the production server:

```bash
npm start
```

## Project Structure

```
hello-app/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles with Tailwind
├── components/
│   └── ui/
│       ├── button.tsx      # Button component
│       └── card.tsx        # Card component
├── lib/
│   └── utils.ts            # Utility functions
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Technologies Used

- **Next.js 14.2.33** - React framework with App Router
- **React 18.3.1** - JavaScript library for building user interfaces
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components built with Radix UI and Tailwind CSS
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Icon library

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Adding More Components

To add more shadcn/ui components, you can manually create them in the `components/ui` directory following the shadcn/ui documentation at [https://ui.shadcn.com](https://ui.shadcn.com).
