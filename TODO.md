# Cinemax - Micro Drama Streaming Platform TODO

## 📋 Project Overview

แพลตฟอร์มสตรีมมิ่งซีรีย์ไมโครดราม่า รองรับซีรีย์แนวตั้ง ซีรีย์สั้น และซีรีย์ปกติ

### Business Model

- **Episode 1 Free**: ตอนแรกดูฟรีทุกเรื่อง
- **Pay Per Episode**: ชำระเงินเพื่อดูตอนถัดไป
- **Membership**: ระบบสมาชิก

### Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Database**: Supabase
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Form**: react-hook-form + zod
- **Language**: TH | ENG | CHN

---

## 🎯 Phase 1: Foundation & Layout

### 1.1 Layout System

- [x] Create MainLayout component
- [x] Create Header component
  - Logo
  - Navigation menu
  - Language switcher (TH | ENG | CHN)
  - Theme toggle (Dark/Light mode)
  - Auth buttons (Login/Register)
- [x] Create Footer component
- [x] Setup ThemeProvider (next-themes)
- [x] Setup dark mode toggle

### 1.2 Core Pages Structure

- [x] Landing Page (/)
  - Hero section with featured series
  - Daily top rated series
  - Series categories
  - Call to action
- [x] Series Catalog Page (/series)
- [x] Series Detail Page (/series/[id])
- [x] Episode Player Page (/series/[id]/episode/[ep])
- [x] Categories Page (/categories)
- [x] Category Detail Page (/categories/[slug])

---

## 🎯 Phase 2: Authentication & User

### 2.1 Auth Pages

- [x] Login Page (/auth/login)
- [x] Register Page (/auth/register)
- [x] Forgot Password Page (/auth/forgot-password)
- [x] Reset Password Page (/auth/reset-password)

### 2.2 Auth Infrastructure

- [x] Supabase Auth configuration
- [x] Auth store (Zustand)
- [x] Protected route middleware
- [x] Social login (Google OAuth)

### 2.3 User Profile

- [x] Profile Page (/profile)
- [x] Edit Profile Page (/profile/edit)
- [x] Watch History Page (/profile/history)
- [x] My List Page (/profile/my-list)

---

## 🎯 Phase 3: Series & Content

### 3.1 Database Schema (Supabase)

- [x] `series` table
  - id, title, title_en, title_cn, description, thumbnail, poster
  - category_id, total_episodes, release_date, status
  - view_count, rating, is_featured, created_at, updated_at
- [x] `episodes` table
  - id, series_id, episode_number, title, description
  - video_url, duration, thumbnail, is_free, price
  - created_at, updated_at
- [x] `categories` table
  - id, name, name_en, name_cn, slug, description, icon
- [x] `profiles` table (extends Supabase auth)
  - id, email, username, avatar, language_preference
  - subscription_type, created_at, updated_at
- [x] `user_purchases` table
  - id, user_id, episode_id, amount, payment_method
  - transaction_id, status, purchased_at
- [x] `watch_history` table
  - id, user_id, episode_id, progress, watched_at
- [x] `user_favorites` table
  - id, user_id, series_id, created_at
- [x] `daily_ratings` table
  - id, series_id, date, view_count, rating

### 3.2 Content Features

- [x] Series listing with filters
- [x] Series detail with episodes list
- [x] Episode locking system (free vs paid)
- [x] Video player integration
- [x] Continue watching feature
- [x] Add to favorites/my list

---

## 🎯 Phase 4: Payment System

### 4.1 Payment Integration

- [x] Payment gateway integration (Stripe)
- [x] Episode purchase flow
- [x] Purchase history page
- [x] Payment success/cancel pages
- [ ] Receipt generation

### 4.2 Subscription System

- [x] Subscription plans page
- [x] User settings page
- [ ] Auto-renewal

---

## 🎯 Phase 5: Internationalization (i18n)

### 5.1 Language Support

- [x] Thai (TH) - Default
- [x] English (ENG)
- [x] Chinese (CHN)

### 5.2 i18n Infrastructure

- [x] Translation files (th.json, en.json, zh.json)
- [x] i18n utility functions
- [x] useLocale hook
- [x] Language switcher component (existing)
- [ ] Apply translations to all pages

---

## 🎯 Phase 6: Advanced Features

### 6.1 Daily Ratings

- [x] Daily view tracking
- [x] Top rated series section
- [x] Trending series algorithm

### 6.2 Search & Discovery

- [x] Full-text search
- [x] Filter by category
- [x] Sort options
- [x] Recommendations component

### 6.3 Admin Dashboard

- [x] Admin layout with sidebar
- [x] Dashboard overview page
- [x] Series list & create form
- [x] Category management
- [x] User management list
- [x] Episode management & upload
- [x] Payment reports page
- [x] Admin settings page
- [x] Analytics dashboard

---

## 📁 Folder Structure

```
cinemax-nextjs/
├── app/
│   ├── (main)/                    # Main layout group
│   │   ├── page.tsx               # Landing page
│   │   ├── series/
│   │   │   ├── page.tsx           # Series catalog
│   │   │   └── [id]/
│   │   │       ├── page.tsx       # Series detail
│   │   │       └── episode/
│   │   │           └── [ep]/
│   │   │               └── page.tsx
│   │   └── categories/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── callback/route.ts
│   ├── profile/
│   │   ├── page.tsx
│   │   ├── edit/page.tsx
│   │   ├── history/page.tsx
│   │   └── my-list/page.tsx
│   └── admin/                     # Admin dashboard
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── types/
│   ├── infrastructure/
│   │   ├── config/
│   │   └── repositories/
│   └── presentation/
│       ├── components/
│       │   ├── common/            # Shared components
│       │   │   ├── Header/
│       │   │   ├── Footer/
│       │   │   ├── ThemeToggle/
│       │   │   └── LanguageSwitcher/
│       │   ├── landing/
│       │   ├── series/
│       │   └── auth/
│       ├── presenters/
│       └── stores/
├── public/
│   ├── styles/
│   ├── images/
│   └── locales/
└── supabase/
    └── migrations/
```

---

## 🚀 Current Sprint: ALL PHASES COMPLETED ✅

**Completed Tasks:**

1. ✅ Create MainLayout with Header & Footer
2. ✅ Implement Theme Toggle (Dark/Light mode)
3. ✅ Create Landing Page with Hero, Categories, Trending
4. ✅ Setup Supabase client (server & client)
5. ✅ Create Auth Store (Zustand)
6. ✅ Create Login & Register Pages
7. ✅ Create Series Catalog Page
8. ✅ Create Series Detail Page with Episodes List

**All Core Features Completed:**

1. ✅ Episode Player Page
2. ✅ Search & Trending Pages
3. ✅ Subscription Page
4. ✅ Static Pages (Terms, Privacy, About, Contact, Help)
5. ✅ Settings Page
6. ✅ API Routes
7. ✅ Toast Notifications
8. ✅ Google OAuth
9. ✅ Admin Dashboard (10 pages)
10. ✅ Badge & EmptyState Components
11. ✅ Admin CRUD Pages
12. ✅ Payment Integration (Stripe)
13. ✅ i18n Setup (3 languages)

**Remaining (Optional):**

- [x] Analytics dashboard
- [ ] Receipt generation (PDF)
- [ ] Auto-renewal subscription
