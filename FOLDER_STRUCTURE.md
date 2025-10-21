# ChatHub - Code Structure Documentation

## 📁 Project Architecture

This project follows a **feature-based architecture** with clear separation between frontend and backend code.

---

## 🎨 Frontend Structure (`src/`)

```
src/
├── features/                    # Feature-based modules (main business logic)
│   ├── auth/                   # Authentication feature
│   │   ├── components/         # Auth-specific components
│   │   │   └── ProtectedRoute.tsx
│   │   ├── hooks/              # Auth-specific hooks
│   │   │   └── useAuth.tsx    # Authentication context & logic
│   │   └── pages/              # Auth-related pages
│   │       └── AuthPage.tsx   # Login/Signup page
│   │
│   ├── chat/                   # Chat/Dashboard feature
│   │   └── pages/
│   │       └── DashboardPage.tsx  # Main chat interface
│   │
│   ├── settings/               # Settings feature
│   │   └── pages/
│   │       └── SettingsPage.tsx
│   │
│   └── landing/                # Landing/Marketing feature
│       └── pages/
│           └── LandingPage.tsx
│
├── shared/                     # Shared resources across features
│   ├── components/             # Reusable components
│   │   └── ui/                # shadcn/ui components (Button, Card, etc.)
│   ├── lib/                   # Utility functions
│   │   └── utils.ts           # Helper functions (cn, etc.)
│   └── pages/                 # Generic pages
│       └── NotFoundPage.tsx
│
├── core/                       # Core app configuration
│   └── config/
│       └── queryClient.ts     # React Query configuration
│
├── integrations/               # Third-party integrations
│   └── supabase/
│       ├── client.ts          # Supabase client (auto-generated)
│       └── types.ts           # Database types (auto-generated)
│
├── App.tsx                     # Main app component with routing
├── main.tsx                    # App entry point
├── index.css                   # Global styles & design tokens
└── vite-env.d.ts              # TypeScript definitions
```

---

## ⚙️ Backend Structure (`supabase/`)

```
supabase/
├── functions/                  # Serverless Edge Functions
│   └── [function-name]/       # Individual function directories
│       └── index.ts           # Function implementation
│
├── migrations/                 # Database migrations (SQL)
│   └── YYYYMMDDHHMMSS_migration_name.sql
│
└── config.toml                # Supabase project configuration
```

---

## 📂 Other Important Files

```
root/
├── index.html                  # HTML entry point
├── vite.config.ts             # Vite bundler configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── .env                       # Environment variables (auto-generated)
├── package.json               # Dependencies & scripts
└── FOLDER_STRUCTURE.md        # This file
```

---

## 🏗️ Architecture Patterns

### **1. Feature-Based Organization**
Each major feature (`auth`, `chat`, `settings`) has its own folder with:
- `components/` - Feature-specific React components
- `hooks/` - Feature-specific custom hooks
- `pages/` - Feature-specific page components

**Benefits:**
- Easy to find related code
- Clear ownership of functionality
- Scalable as features grow
- Easy to add/remove features

### **2. Shared Resources**
Common code used across multiple features lives in `shared/`:
- UI components (buttons, cards, inputs)
- Utility functions
- Generic pages

### **3. Core Configuration**
App-wide configuration in `core/`:
- React Query setup
- Global providers
- App constants

### **4. Backend Separation**
All backend code is in `supabase/`:
- **Edge Functions**: Serverless backend logic
- **Migrations**: Database schema changes
- **Config**: Project settings

---

## 🔄 Data Flow

```
User Interaction
    ↓
Feature Page Component
    ↓
Feature Hook (useAuth, etc.)
    ↓
Supabase Client
    ↓
Backend (Edge Functions / Database)
    ↓
Supabase Client
    ↓
Feature Hook
    ↓
UI Update
```

---

## 🎯 Key Principles

1. **Separation of Concerns**: Frontend and backend are clearly separated
2. **Feature Isolation**: Each feature is self-contained
3. **Reusability**: Shared components are centralized
4. **Type Safety**: TypeScript throughout
5. **Auto-Generation**: Supabase types are auto-generated (don't edit manually)

---

## 🚀 Adding New Features

To add a new feature (e.g., "notifications"):

1. Create feature folder: `src/features/notifications/`
2. Add structure:
   ```
   notifications/
   ├── components/
   ├── hooks/
   └── pages/
   ```
3. Update routing in `App.tsx`
4. Add backend logic in `supabase/functions/` if needed
5. Create database tables via `supabase/migrations/` if needed

---

## 📝 Import Aliases

The project uses `@/` as an alias for `src/`:

```typescript
// ✅ Good
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

// ❌ Bad (relative imports)
import { Button } from "../../../shared/components/ui/button";
```

---

## 🔒 Protected vs Public Routes

- **Public Routes**: Landing page, Auth page
- **Protected Routes**: Dashboard, Settings (require authentication)
- Protection handled by `<ProtectedRoute>` wrapper component

---

## 🎨 Styling System

- **Tailwind CSS**: Utility-first CSS framework
- **Design Tokens**: Defined in `index.css` (colors, shadows, gradients)
- **shadcn/ui**: Pre-built accessible components
- **Semantic Classes**: Use design system tokens, not hardcoded colors

---

## 🔧 Environment Variables

Located in `.env` (auto-generated by Lovable Cloud):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

**⚠️ Never edit `.env` manually** - it's managed automatically.

---

## 📚 Further Reading

- **Feature folders**: Group by feature, not by type
- **Backend**: All backend code in `supabase/`
- **Shared code**: Reusable components in `shared/`
- **Type safety**: Auto-generated types from database schema

---

**Happy Coding! 🚀**
