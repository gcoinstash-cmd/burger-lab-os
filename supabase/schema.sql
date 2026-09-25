-- ==============================================================================
-- BURGER LAB OS — SUPABASE RELATIONAL SCHEMA (ENGINE B & ENTERPRISE GRADE)
-- Craft Smash Burger, Fast-Casual Ordering & Kitchen Display System (KDS) OS
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. MASTER MENU & RECIPE COMPOSITION
create table if not exists public.menu_items (
    id uuid primary key default gen_random_uuid(),
    item_code text unique not null,
    name text not null,
    category text not null check (category in ('burgers', 'sides', 'shakes', 'late-night')),
    description text not null,
    price numeric(10, 2) not null,
    calories text not null,
    grill_temp text not null,
    fat_ratio text not null,
    maillard_score numeric(3, 1) default 9.5,
    stock_status text not null default 'available' check (stock_status in ('available', 'low_stock', 'sold_out')),
    image_url text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. KITCHEN DISPLAY SYSTEM (KDS) & DISPATCH ORDERS
create table if not exists public.orders (
    id uuid primary key default gen_random_uuid(),
    order_number text unique not null,
    customer_name text not null,
    customer_phone text,
    order_type text not null default 'Dine-In' check (order_type in ('Dine-In', 'Takeout', 'VIP Counter', 'Delivery')),
    status text not null default 'received' check (status in ('received', 'on_grill', 'plating', 'ready', 'dispatched')),
    subtotal numeric(10, 2) not null,
    tax numeric(10, 2) not null,
    total numeric(10, 2) not null,
    special_instructions text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDER LINE ITEMS & CUSTOM BUILD MODIFIERS
create table if not exists public.order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid references public.orders(id) on delete cascade,
    menu_item_id uuid references public.menu_items(id) on delete set null,
    item_name text not null,
    quantity integer not null default 1,
    unit_price numeric(10, 2) not null,
    modifiers jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. GRILL STATION & HARDWARE METRICS
create table if not exists public.grill_stations (
    id uuid primary key default gen_random_uuid(),
    station_code text unique not null,
    name text not null,
    hardware text not null,
    target_temp text not null,
    current_temp text not null,
    load_factor text not null,
    active_task text,
    status text not null default 'ACTIVE' check (status in ('ACTIVE', 'PREHEATING', 'MAINTENANCE', 'OFFLINE')),
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. CATERING & PRIVATE VIP COUNTER INQUIRIES
create table if not exists public.event_inquiries (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    email text not null,
    guest_count integer not null,
    event_date date not null,
    package_type text not null,
    notes text,
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.menu_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.grill_stations enable row level security;
alter table public.event_inquiries enable row level security;

-- Public Read for Menu and Grill Status
create policy "Allow public read access to menu_items" on public.menu_items for select using (true);
create policy "Allow public read access to grill_stations" on public.grill_stations for select using (true);

-- Public Insert for Orders and Event Inquiries
create policy "Allow customer order creation" on public.orders for insert with check (true);
create policy "Allow order item creation" on public.order_items for insert with check (true);
create policy "Allow public inquiries" on public.event_inquiries for insert with check (true);

-- Authenticated Staff Full Access
create policy "Allow staff full access to menu_items" on public.menu_items for all using (auth.role() = 'authenticated');
create policy "Allow staff full access to orders" on public.orders for all using (auth.role() = 'authenticated');
create policy "Allow staff full access to order_items" on public.order_items for all using (auth.role() = 'authenticated');
create policy "Allow staff full access to grill_stations" on public.grill_stations for all using (auth.role() = 'authenticated');
create policy "Allow staff full access to event_inquiries" on public.event_inquiries for all using (auth.role() = 'authenticated');
