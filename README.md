<p align="center">
  <img src="docs/screenshots/home.png" alt="CINEMAX" width="100%">
</p>

<h1 align="center">🎬 CINEMAX</h1>

<p align="center">
  <strong>แพลตฟอร์มสตรีมมิ่งซีรีย์ออนไลน์ระดับพรีเมียม</strong>
  <br>
  <em>Premium Streaming Platform for Thai, Korean & Chinese Series</em>
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#architecture"><strong>Architecture</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5.7-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.1.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Stripe-Payments-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe">
  <img src="https://img.shields.io/badge/Zustand-State-000000?style=for-the-badge&logo=react&logoColor=white" alt="Zustand">
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/danya0365/cinemax-nextjs?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/code%20style-prettier-ff69b4?style=flat-square" alt="Code Style">
</p>

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🎥 Streaming</h3>
      <ul>
        <li>HD/4K Video Streaming</li>
        <li>Multi-episode Support</li>
        <li>Continue Watching</li>
        <li>My List (Watchlist)</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🔐 Authentication</h3>
      <ul>
        <li>Email/Password Login</li>
        <li>Social Auth (Google)</li>
        <li>Password Recovery</li>
        <li>Session Management</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>💳 Payments</h3>
      <ul>
        <li>Stripe Integration</li>
        <li>Per-series Purchase</li>
        <li>Subscription Plans</li>
        <li>Payment History</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🛠️ Admin Panel</h3>
      <ul>
        <li>Series Management</li>
        <li>Episode Upload</li>
        <li>User Management</li>
        <li>Analytics Dashboard</li>
      </ul>
    </td>
  </tr>
</table>

---

## 📊 Project Stats

```
📁 Project Structure
├── 75+ Components
├── 76+ Presenters (MVP Architecture)
├── 50+ Pages & Routes
├── 7+ Custom Hooks
└── 5+ State Stores (Zustand)
```

| Metric | Count |
|--------|-------|
| 🧩 Components | 75+ |
| 📄 Pages | 50+ |
| 🎨 Presenters | 76+ |
| 🔧 Custom Hooks | 7+ |
| 📦 Dependencies | 20+ |

---

## 🖼️ Demo

### 🏠 Landing Page
The stunning hero section with featured series and smooth animations.

<p align="center">
  <img src="docs/screenshots/home.png" alt="Home Page" width="100%">
</p>

### 📺 Series Catalog
Browse through our extensive collection of Thai, Korean, and Chinese series.

<p align="center">
  <img src="docs/screenshots/series.png" alt="Series Catalog" width="100%">
</p>

### 🔑 Authentication
Beautiful and secure login experience.

<p align="center">
  <img src="docs/screenshots/login.png" alt="Login Page" width="100%">
</p>

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 15.5.7 | React Framework with App Router |
| [React](https://react.dev/) | 19.1.2 | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type Safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0.8 | State Management |

### Backend & Services
| Service | Purpose |
|---------|---------|
| [Supabase](https://supabase.com/) | PostgreSQL Database & Auth |
| [Stripe](https://stripe.com/) | Payment Processing |
| [Vercel](https://vercel.com/) | Deployment Platform |

### Development Tools
| Tool | Purpose |
|------|---------|
| ESLint | Code Linting |
| Prettier | Code Formatting |
| Turbopack | Fast Bundling |

---

## 📦 Installation

### Prerequisites

- Node.js 18.17+
- npm/pnpm/yarn
- Docker (for local Supabase)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/danya0365/cinemax-nextjs.git
cd cinemax-nextjs

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Start Supabase (optional - for local development)
npm run supabase-start

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

Create a `.env.local` file with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Mock Data (for development)
USE_MOCK_DATA=true
```

---

## 🏗️ Architecture

This project follows **Clean Architecture** with **MVP (Model-View-Presenter)** pattern:

```
src/
├── domain/           # Business Logic & Entities
│   ├── entities/     # Core business models
│   └── types/        # TypeScript types
│
├── data/             # Data Layer
│   ├── repositories/ # Data access
│   └── local/        # Local/mock data
│
├── infrastructure/   # External Services
│   ├── config/       # App configuration
│   └── services/     # External APIs (Supabase, Stripe)
│
├── presentation/     # UI Layer
│   ├── components/   # Reusable UI components
│   ├── presenters/   # Business logic for views
│   ├── hooks/        # Custom React hooks
│   └── stores/       # Zustand state stores
│
└── i18n/             # Internationalization
    └── locales/      # Translation files
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run supabase-start` | Start local Supabase |
| `npm run supabase-stop` | Stop local Supabase |
| `npm run supabase-reset` | Reset Supabase database |
| `npm run supabase-generate` | Generate TypeScript types from Supabase |

---

## 📂 Key Directories

```
app/                    # Next.js App Router pages
├── (auth)/             # Authentication pages
├── admin/              # Admin dashboard
├── api/                # API routes
├── categories/         # Category pages
├── payment/            # Payment flow
├── profile/            # User profile
├── search/             # Search functionality
└── series/             # Series detail & episodes
```

---

## 🔒 Security Features

- 🔐 **JWT Authentication** via Supabase Auth
- 🛡️ **Row Level Security (RLS)** on all database tables
- 🔑 **Environment Variable Protection**
- 🚫 **XSS & CSRF Protection**
- 📝 **Input Validation** with Zod

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Danya0365**

- GitHub: [@danya0365](https://github.com/danya0365)

---

<p align="center">
  Made with ❤️ and ☕ in Thailand
</p>

<p align="center">
  <a href="#-cinemax">⬆️ Back to Top</a>
</p>
