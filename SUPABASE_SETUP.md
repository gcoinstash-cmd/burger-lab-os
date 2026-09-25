# SUPABASE_SETUP.md — BURGER LAB OS

## Quick 3-Minute Database Deployment Guide

BURGER LAB OS is turnkey and production-ready for Supabase PostgreSQL. Follow these 3 fast steps to get your Kitchen Display System (KDS), online ordering, and real-time station metrics online:

---

### Step 1: Create a New Supabase Project
1. Log in to [supabase.com](https://supabase.com).
2. Click **New Project** and name it `burger-lab-os`.
3. Choose your nearest database region and generate a secure database password.

---

### Step 2: Run the Schema & Seed SQL
1. In your Supabase dashboard, click the **SQL Editor** tab (terminal icon on left sidebar).
2. Open `supabase/schema.sql` from this package, copy its entire contents, paste it into the SQL Editor, and click **Run**.
   - This creates tables: `menu_items`, `orders`, `order_items`, `grill_stations`, `event_inquiries`.
   - Automatically enables **Row Level Security (RLS)** with safe public ordering & read policies.
3. Open `supabase/seed.sql`, paste it into the SQL Editor, and click **Run**.
   - Seeds 10 gourmet menu items, 4 active grill stations, and initial KDS orders.

---

### Step 3: Wire Environment Variables
1. Go to **Project Settings** ➔ **API**.
2. Copy your **Project URL** and **anon / public key**.
3. Create a `.env.local` file in your root folder:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

4. Launch your application:
```bash
npm install
npm run dev
```

---

### 🔑 Demo Operator Bypass Passkey
- **Route**: `https://your-domain.com/admin` (or click `[ KDS / ADMIN ]` in navbar)
- **Passkey**: `burger2026`
- **1-Click Demo**: Includes instant 1-click auto-fill bypass button for frictionless investor/agency demos!
