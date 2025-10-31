# 🎨 NEXTRIP Design Patterns & Examples

## Quick Reference Guide for Glassmorphism Implementation

---

## 🔮 Glass Effect Variants

### 1. Light Glass (Subtle)
**Use for:** Badges, subtle overlays, secondary elements

```tsx
<div className="glass rounded-full px-4 py-2">
  <span>AI-Powered</span>
</div>
```

**CSS Equivalent:**
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.18);
```

---

### 2. Strong Glass
**Use for:** Navigation, prominent containers, modal backgrounds

```tsx
<nav className="glass-strong rounded-2xl shadow-lg">
  {/* Navigation content */}
</nav>
```

**CSS Equivalent:**
```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.25);
```

---

### 3. Glass Card
**Use for:** Feature cards, content blocks, panels

```tsx
<div className="glass-card rounded-3xl p-8 hover:scale-105 transition-all">
  {/* Card content */}
</div>
```

**CSS Equivalent:**
```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.12);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
```

---

### 4. Dark Glass
**Use for:** Overlays on bright backgrounds, dark mode modals

```tsx
<div className="glass-dark rounded-lg p-6">
  {/* Dark overlay content */}
</div>
```

**CSS Equivalent:**
```css
background: rgba(0, 0, 0, 0.2);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

---

## ✨ Glow Effects

### 1. Static Glow
**Use for:** Always-on emphasis, important CTAs

```tsx
<Button className="glow-primary">
  Premium Feature
</Button>
```

**CSS Equivalent:**
```css
box-shadow: 0 0 20px rgba(236, 73, 19, 0.3),
            0 0 40px rgba(236, 73, 19, 0.15);
```

---

### 2. Hover Glow
**Use for:** Interactive elements, buttons, cards

```tsx
<Button className="glow-primary-hover">
  Click Me
</Button>
```

**CSS Equivalent:**
```css
.glow-primary-hover {
  transition: all 0.3s ease;
}

.glow-primary-hover:hover {
  box-shadow: 0 0 30px rgba(236, 73, 19, 0.5),
              0 0 60px rgba(236, 73, 19, 0.25);
  transform: translateY(-2px);
}
```

---

### 3. Expanding Glow (Ripple)
**Use for:** Special interactions, "magic" moments

```tsx
<button className="hover-glow rounded-lg px-6 py-3">
  Magical Button
</button>
```

**CSS Equivalent:**
```css
.hover-glow {
  position: relative;
  overflow: hidden;
}

.hover-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(236, 73, 19, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.hover-glow:hover::before {
  width: 300px;
  height: 300px;
}
```

---

## 🎨 Gradient Effects

### 1. Gradient Mesh Background
**Use for:** Section backgrounds, hero areas

```tsx
<section className="gradient-mesh py-20">
  {/* Section content */}
</section>
```

**CSS Equivalent:**
```css
background: linear-gradient(
  135deg,
  hsl(var(--primary) / 0.1) 0%,
  hsl(var(--primary) / 0.05) 25%,
  transparent 50%,
  hsl(var(--primary) / 0.05) 75%,
  hsl(var(--primary) / 0.1) 100%
);
```

---

### 2. Gradient Text
**Use for:** Headlines, brand names, emphasis

```tsx
<h1 className="text-gradient-primary text-6xl font-bold">
  Morocco with AI
</h1>
```

**CSS Equivalent:**
```css
background: linear-gradient(
  135deg,
  hsl(var(--primary)),
  hsl(var(--primary) / 0.7)
);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

### 3. Animated Gradient
**Use for:** Background effects, loading states

```tsx
<div className="animate-gradient bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
  {/* Content */}
</div>
```

**CSS Equivalent:**
```css
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## 🎭 Animation Patterns

### 1. Floating Elements
**Use for:** Background decorations, orbs, patterns

```tsx
<div className="animate-float w-64 h-64 opacity-20">
  {/* Floating decoration */}
</div>
```

**Duration:** 6s
**Effect:** Gentle X/Y translation

---

### 2. Slow Float with Rotation
**Use for:** Large decorative elements

```tsx
<div className="animate-float-slow w-96 h-96">
  {/* Slowly floating element */}
</div>
```

**Duration:** 8s
**Effect:** Y translation + rotation

---

### 3. Pulse Glow
**Use for:** Attention-grabbing particles, indicators

```tsx
<div className="animate-pulse-glow rounded-full w-40 h-40 bg-primary/30 blur-2xl">
</div>
```

**Duration:** 3s
**Effect:** Opacity and scale pulsing

---

### 4. Fade In Up
**Use for:** Content reveals, staggered hero elements

```tsx
<div className="animate-fade-in-up delay-100">
  <h1>Appears from bottom</h1>
</div>
```

**Duration:** 0.8s
**Effect:** Opacity 0→1, translateY(30px)→0

---

### 5. Fade In Scale
**Use for:** Cards, modals, popups

```tsx
<div className="animate-fade-in-scale delay-200">
  <Card>Content</Card>
</div>
```

**Duration:** 0.6s
**Effect:** Opacity 0→1, scale(0.9)→1

---

### 6. Shimmer
**Use for:** Loading states, premium elements

```tsx
<div className="animate-shimmer h-32 rounded-lg">
  {/* Shimmering element */}
</div>
```

**Duration:** 3s infinite
**Effect:** Moving highlight across element

---

## 🏗️ Layout Patterns

### 1. Glass Hero Section
```tsx
<section className="relative pt-32 pb-20 px-6">
  <div className="mx-auto max-w-7xl">
    {/* Badge */}
    <div className="animate-fade-in-up glass rounded-full px-4 py-2 inline-flex">
      <Sparkles className="h-4 w-4 text-primary" />
      <span>AI-Powered</span>
    </div>

    {/* Heading */}
    <h1 className="animate-fade-in-up delay-100 text-7xl font-bold">
      <span className="text-foreground">Discover the Magic of</span>
      <span className="text-gradient-primary">Morocco with AI</span>
    </h1>

    {/* CTA */}
    <Button className="glow-primary-hover animate-fade-in-up delay-300">
      Start Planning
    </Button>
  </div>
</section>
```

---

### 2. Glass Feature Card
```tsx
<div className="glass-card rounded-3xl p-8 hover:scale-105 transition-all group">
  {/* Icon with gradient */}
  <div className="relative mb-6">
    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600">
      <Icon className="h-7 w-7 text-white" />
    </div>
    <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-br from-primary to-transparent" />
  </div>

  {/* Content */}
  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
    Feature Title
  </h3>
  <p className="text-muted-foreground">
    Feature description text
  </p>
</div>
```

---

### 3. Glass CTA Section
```tsx
<div className="glass-strong rounded-3xl p-16 relative overflow-hidden">
  {/* Decorative glows */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50" />
  <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />

  {/* Content */}
  <div className="relative z-10">
    <h2 className="text-5xl font-bold mb-6">
      <span className="text-foreground">Ready to Explore </span>
      <span className="text-gradient-primary">Morocco?</span>
    </h2>
    <Button size="lg" className="glow-primary-hover">
      Plan Your Trip Now
    </Button>
  </div>
</div>
```

---

### 4. Glass Navbar
```tsx
<nav className="fixed top-0 left-0 right-0 z-50">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mt-6 glass-strong rounded-2xl shadow-lg">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Compass className="h-8 w-8 text-primary group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-xl font-bold text-gradient-primary">NEXTRIP</span>
        </Link>

        {/* Links */}
        <div className="flex space-x-8">
          <Link href="/" className="relative group">
            <span>Home</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all" />
          </Link>
        </div>

        {/* CTAs */}
        <div className="flex space-x-3">
          <Button variant="ghost" className="hover-glow">Sign In</Button>
          <Button className="glow-primary-hover">Get Started</Button>
        </div>
      </div>
    </div>
  </div>
</nav>
```

---

## 🎯 Background Patterns

### 1. Moroccan Pattern Overlay
```tsx
<div className="moroccan-pattern fixed inset-0 opacity-40 pointer-events-none" />
```

**CSS:**
```css
.moroccan-pattern {
  background-image:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 35px,
      rgba(236, 73, 19, 0.03) 35px,
      rgba(236, 73, 19, 0.03) 70px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 35px,
      rgba(236, 73, 19, 0.03) 35px,
      rgba(236, 73, 19, 0.03) 70px
    );
}
```

---

### 2. Floating Orbs Setup
```tsx
{/* Large orbs */}
<div className="fixed inset-0 pointer-events-none overflow-hidden">
  <div
    className="absolute w-96 h-96 top-0 -right-48 opacity-20 rounded-full blur-3xl"
    style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
      animation: 'float 20s ease-in-out infinite'
    }}
  />
</div>

{/* Pulsing particles */}
<div
  className="absolute w-32 h-32 opacity-30 rounded-full blur-2xl animate-pulse-glow"
  style={{
    background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)'
  }}
/>
```

---

### 3. Gradient Background
```tsx
<main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100 dark:from-slate-950 dark:via-orange-950/20 dark:to-slate-900">
  {/* Content */}
</main>
```

---

## 📐 Spacing & Sizing

### Recommended Values

**Border Radius:**
- Buttons: `rounded-lg` (0.5rem)
- Cards: `rounded-2xl` or `rounded-3xl` (1rem - 1.5rem)
- Badges: `rounded-full`
- Navbar: `rounded-2xl`

**Padding:**
- Buttons: `px-6 py-3` or `px-8 py-4` (large)
- Cards: `p-6` or `p-8`
- Sections: `py-20` (vertical), `px-6 lg:px-8` (horizontal)

**Gaps:**
- Button groups: `gap-3` or `gap-4`
- Card grids: `gap-6` or `gap-8`
- Icon-text: `gap-2`

**Blur Amounts:**
- Light blur: `blur-md` (12px)
- Medium blur: `blur-xl` (20px)
- Heavy blur: `blur-2xl` or `blur-3xl` (24-40px)

---

## 🎨 Color Usage

### Primary Color (Orange)
- **Full strength:** Buttons, icons, accents
- **30-50% opacity:** Glows, orbs, overlays
- **5-10% opacity:** Background tints, patterns
- **Gradient:** Headlines, emphasis text

### Foreground
- **Full:** Primary text, headings
- **80%:** Navigation links, secondary text
- **Muted (45%):** Descriptions, meta text

### Glass
- **8-10%:** Subtle overlays
- **15-20%:** Prominent elements
- **Borders:** 10-25% white

---

## ⚡ Performance Tips

1. **Limit backdrop-filter** - Use sparingly, CPU-intensive
2. **Combine animations** - Use single animation when possible
3. **Reduce orb count** - On mobile, use fewer background elements
4. **Lazy load SVG** - Load Moroccan decorations on intersection
5. **Optimize blur** - Keep blur radius under 20px
6. **Use transform** - Better performance than position changes
7. **GPU acceleration** - `transform: translateZ(0)` when needed

---

## 🔧 Customization Guide

### Change Primary Color
Update in `globals.css`:
```css
:root {
  --primary: 11 86% 50%; /* Your HSL color */
}
```

All glows, gradients, and patterns update automatically!

### Adjust Glass Strength
```css
/* Lighter glass */
background: rgba(255, 255, 255, 0.05);

/* Stronger glass */
background: rgba(255, 255, 255, 0.25);
```

### Modify Animation Speed
```css
/* Faster */
animation: float 3s ease-in-out infinite;

/* Slower */
animation: float 12s ease-in-out infinite;
```

---

## 📱 Mobile Considerations

```tsx
{/* Hide on mobile for performance */}
<div className="hidden md:block">
  <MoroccanDecorations />
</div>

{/* Reduce orbs on mobile */}
<div className="opacity-10 md:opacity-20">
  <FloatingOrbs />
</div>

{/* Adjust text size */}
<h1 className="text-4xl md:text-6xl lg:text-8xl">
  Responsive Heading
</h1>
```

---

## ✅ Checklist for New Components

When creating a new glassmorphic component:

- [ ] Apply appropriate glass variant (`.glass`, `.glass-card`, etc.)
- [ ] Add border radius (`rounded-2xl` or similar)
- [ ] Include hover state (scale, glow, or color shift)
- [ ] Add animation if decorative (fade-in, float, etc.)
- [ ] Test in both light and dark mode
- [ ] Ensure text contrast meets accessibility standards
- [ ] Make responsive (adjust on `md:` and `lg:` breakpoints)
- [ ] Add `pointer-events-none` if purely decorative
- [ ] Optimize blur radius (≤ 20px preferred)
- [ ] Test on mobile devices

---

**Happy Designing! 🎨**
