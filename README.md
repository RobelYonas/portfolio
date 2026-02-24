# Robel Yonas - Portfolio

A modern, interactive personal portfolio website built with React, TypeScript, and cutting-edge web technologies. Features smooth animations, custom cursor effects, and a responsive design.

![Portfolio Preview](app/public/profile-photo.png)

## ✨ Features

- **Modern Tech Stack**: Built with React 19, TypeScript, Vite, and Tailwind CSS
- **Smooth Animations**: GSAP + ScrollTrigger for scroll-based animations and transitions
- **Custom Cursor**: Interactive magnetic cursor with hover effects
- **Smooth Scrolling**: Lenis for buttery smooth scroll experiences
- **Particle Background**: Animated particle system in the hero section
- **Text Scramble Effects**: Cyberpunk-style text animations
- **Magnetic Buttons**: Interactive buttons with magnetic hover effects
- **Responsive Design**: Fully responsive across all devices
- **Performance Optimized**: Built with Vite for fast development and production builds

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19, TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 3.4, shadcn/ui |
| **Animations** | GSAP, ScrollTrigger, Lenis |
| **3D Graphics** | Three.js, React Three Fiber |
| **Icons** | Lucide React |
| **Forms** | React Hook Form, Zod |
| **Charts** | Recharts |

## 📁 Project Structure

```
app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui components (40+)
│   │   ├── CustomCursor.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── TextScramble.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── Testimonials.tsx
│   │   └── Contact.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useLenis.ts
│   │   ├── useCustomCursor.ts
│   │   ├── useScrollAnimation.ts
│   │   └── useMagneticEffect.ts
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio/app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Sections

| Section | Description |
|---------|-------------|
| **Hero** | Full-screen intro with particle background and animated text |
| **About** | Personal introduction with image reveal animation |
| **Experience** | Work history with timeline animations |
| **Projects** | Featured projects showcase |
| **Education** | Academic background |
| **Testimonials** | Client/colleague recommendations |
| **Contact** | Contact form and social links |

## 🎯 Customization

### Personal Information

Update your personal details in the section files:
- `src/sections/Hero.tsx` - Name, title, tagline
- `src/sections/About.tsx` - Bio and profile image
- `src/sections/Contact.tsx` - Contact information

### Styling

The project uses a custom color scheme defined in `tailwind.config.js`:

```javascript
colors: {
  charcoal: '#121212',      // Primary background
  'offwhite': '#f4f4f4',    // Primary text
  'offwhite-muted': '#a0a0a0', // Secondary text
  primary: '#c17c53',       // Accent color (burnt orange)
  // ...
}
```

### Adding Projects

Edit `src/sections/Projects.tsx` to add your own projects:

```typescript
const projects = [
  {
    title: 'Project Name',
    description: 'Project description',
    tech: ['React', 'TypeScript', 'Node.js'],
    image: '/project-image.png',
    link: 'https://github.com/...'
  }
];
```

## 📱 UI Components

This project includes 40+ pre-built UI components from shadcn/ui:

- Accordion, Alert, Alert Dialog
- Avatar, Badge, Breadcrumb
- Button, Card, Carousel
- Checkbox, Collapsible, Command
- Dialog, Drawer, Dropdown Menu
- Form components (Input, Select, Textarea, etc.)
- Navigation Menu, Popover, Sheet
- Table, Tabs, Toast, Tooltip
- And more...

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Robel Yonas](mailto:robel4872@gmail.com)
