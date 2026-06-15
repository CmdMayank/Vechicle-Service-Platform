# 🛠️ RoadRescue — 24/7 Roadside Assistance Platform

RoadRescue is a modern, premium, and fully responsive web application built with **React 19** and **Vite**. It provides a sleek, interactive user experience for drivers needing emergency roadside assistance. The app features dynamic theme support (light/dark mode), live service provider simulation, interactive guides, animations, and an instant emergency SOS request system.

---

## ✨ Features

- **🌓 Dynamic Theme Support**: Seamless toggle between a high-contrast dark mode (default) and a clean light mode with persistent storage using `localStorage`.
- **🚨 Instant Floating SOS**: An ever-present, attention-grabbing SOS button that opens the request modal pre-configured for emergency dispatch.
- **🚛 Custom Tow Truck Animation**: A delightful, custom-coded CSS road scene showcasing tow truck animations that bring the page to life.
- **🗺️ Live Provider Finder**: An interactive mock dashboard allowing users to find real-time nearby assistance providers based on their vehicle type and location.
- **📋 Step-by-Step Request Modal**: A sleek, multi-functional assistance request form with input validation, vehicle detail collection, and location auto-detect capabilities.
- **📊 Animated Key Stats**: Dynamic counters highlighting average response times, vehicles assisted, and client satisfaction.
- **💬 Accordion FAQ**: Smoothly animated collapsable question-and-answer panels answering common roadside queries.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Grid, custom transitions, keyframe animations)
- **Icons & Assets**: SVG inline icons for crisp scaling and fast loading

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (recommended version `v18` or higher).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prakhar2006-bit/Vechicle-Service-Platform.git
   cd Vechicle-Service-Platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready assets will be compiled into the `dist` folder.

---

## 📁 Directory Structure

```text
├── public/                 # Static assets (Favicons, shared SVGs)
├── src/
│   ├── assets/             # Images, static media
│   ├── components/         # Reusable React components
│   │   ├── FAQ.jsx         # Accordion style Q&A
│   │   ├── Footer.jsx      # Footer with links and socials
│   │   ├── Hero.jsx        # Landing hero section with primary CTA
│   │   ├── HowItWorks.jsx  # Step-by-step guidance section
│   │   ├── Navbar.jsx      # Header navigation with light/dark toggle
│   │   ├── Providers.jsx   # Interactive service provider search simulation
│   │   ├── RequestModal.jsx# Multi-step assistance request form
│   │   ├── RoadScene.jsx   # Tow truck animation canvas
│   │   ├── SOSButton.jsx   # Emergency floating button
│   │   ├── Services.jsx    # Grid of roadside assistance details
│   │   ├── Stats.jsx       # Key highlights and metric counters
│   │   └── Testimonials.jsx# Customer feedback showcase
│   ├── hooks/
│   │   └── useFadeIn.js    # Intersection observer hook for scroll animations
│   ├── App.jsx             # Main App layout and state manager
│   ├── index.css           # Global CSS variables, theme classes, resets
│   └── main.jsx            # React entry point
├── package.json            # Project configuration and script commands
└── README.md               # Project documentation
```
