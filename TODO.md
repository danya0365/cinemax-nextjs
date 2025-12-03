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

- [ ] Landing Page (/)
  - Hero section with featured series
  - Daily top rated series
  - Series categories
  - Call to action
- [ ] Series Catalog Page (/series)
- [ ] Series Detail Page (/series/[id])
- [ ] Episode Player Page (/series/[id]/episode/[ep])
- [ ] Categories Page (/categories)
- [ ] Category Detail Page (/categories/[slug])

---

## 🎯 Phase 2: Authentication & User

### 2.1 Auth Pages

- [ ] Login Page (/auth/login)
- [ ] Register Page (/auth/register)
- [ ] Forgot Password Page (/auth/forgot-password)
- [ ] Reset Password Page (/auth/reset-password)

### 2.2 Auth Infrastructure

- [ ] Supabase Auth configuration
- [ ] Auth store (Zustand)
- [ ] Protected route middleware
- [ ] Social login (Google, Facebook)

### 2.3 User Profile

- [ ] Profile Page (/profile)
- [ ] Edit Profile Page (/profile/edit)
- [ ] Watch History Page (/profile/history)
- [ ] My List Page (/profile/my-list)

---

## 🎯 Phase 3: Series & Content

### 3.1 Database Schema (Supabase)

- [ ] `series` table
  - id, title, title_en, title_cn, description, thumbnail, poster
  - category_id, total_episodes, release_date, status
  - view_count, rating, is_featured, created_at, updated_at
- [ ] `episodes` table
  - id, series_id, episode_number, title, description
  - video_url, duration, thumbnail, is_free, price
  - created_at, updated_at
- [ ] `categories` table
  - id, name, name_en, name_cn, slug, description, icon
- [ ] `users` table (extends Supabase auth)
  - id, email, username, avatar, language_preference
  - subscription_type, created_at, updated_at
- [ ] `user_purchases` table
  - id, user_id, episode_id, amount, payment_method
  - transaction_id, status, purchased_at
- [ ] `watch_history` table
  - id, user_id, episode_id, progress, watched_at
- [ ] `user_favorites` table
  - id, user_id, series_id, created_at
- [ ] `daily_ratings` table
  - id, series_id, date, view_count, rating

### 3.2 Content Features

- [ ] Series listing with filters
- [ ] Series detail with episodes list
- [ ] Episode locking system (free vs paid)
- [ ] Video player integration
- [ ] Continue watching feature
- [ ] Add to favorites/my list

---

## 🎯 Phase 4: Payment System

### 4.1 Payment Integration

- [ ] Payment gateway integration (TBD)
- [ ] Episode purchase flow
- [ ] Purchase history
- [ ] Receipt generation

### 4.2 Subscription System

- [ ] Subscription plans
- [ ] Subscription management
- [ ] Auto-renewal

---

## 🎯 Phase 5: Internationalization (i18n)

### 5.1 Language Support

- [ ] Thai (TH) - Default
- [ ] English (ENG)
- [ ] Chinese (CHN)

### 5.2 i18n Infrastructure

- [ ] Setup next-intl or similar
- [ ] Translation files structure
- [ ] Language switcher in header
- [ ] Content localization

---

## 🎯 Phase 6: Advanced Features

### 6.1 Daily Ratings

- [ ] Daily view tracking
- [ ] Top rated series section
- [ ] Trending series algorithm

### 6.2 Search & Discovery

- [ ] Full-text search
- [ ] Filter by category
- [ ] Sort options
- [ ] Recommendations

### 6.3 Admin Dashboard

- [ ] Series management
- [ ] Episode management
- [ ] User management
- [ ] Analytics dashboard

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

## 🚀 Current Sprint: Phase 1.1 - Layout System

**Priority Tasks:**

1. ✅ Create MainLayout with Header & Footer
2. ✅ Implement Theme Toggle (Dark/Light mode)
3. 🔄 Create Landing Page structure
