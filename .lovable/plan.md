## Scope

Build all remaining modules as **frontend-only** (mock data, no backend). Phase 1–3 (public site) is done. This plan covers Phases 4–10 in a single continuous build, structured by role.

## Architecture

- **Routing** (TanStack Start, file-based under `src/routes/`):
  - `_app.*` — public site (already built)
  - `_guest.*` — Guest dashboard (mock-logged-in guest)
  - `_admin.*` — Hotel Admin dashboard
  - `_super.*` — Super Admin dashboard
  - `_reception.*` — Receptionist
  - `_housekeeping.*` — Housekeeping
  - `_restaurant.*` — Restaurant staff
  - Single `/login` mock page with role switcher (stores role in `localStorage`)
- **Shared shell**: `DashboardLayout` with collapsible shadcn `Sidebar`, topbar (search, notifications, role switcher, avatar), breadcrumbs.
- **Mock data**: expand `src/mock/` with `bookings`, `guests`, `employees`, `housekeeping`, `restaurantOrders`, `inventory`, `analytics`, `invoices`, `loyalty`, `chatMessages`, `reviews`, `chains`, `subscriptions`, `auditLogs`.
- **Charts**: Recharts wrapped by existing `chart.tsx` — revenue line, occupancy area, room-type bar, ratings radial, restaurant sales bar.
- **Design language**: same luxury tokens (navy + antique gold on ivory) but with a denser "operations" variant — smaller type scale, tabular numerics, subtle gold accents on KPIs, editorial section headings kept. This differentiates it from generic admin templates while staying on-brand.

## Modules & pages

**Phase 4 — Guest Dashboard** (`/account/*`)
Overview (upcoming stay, current stay, loyalty tier progress), Bookings history, Invoices (downloadable mock PDF layout), Room Service (order from menu), Support Chat (mock threaded UI), Reviews (submit + list), Profile.

**Phase 5 — Super Admin** (`/super/*`)
Overview KPIs (chains, hotels, MRR, active users), Hotel Chains (CRUD table), Subscriptions (plans + billing table), Platform Analytics (charts), System Settings, Audit Logs (filterable table).

**Phase 6 — Hotel Admin** (`/admin/*`)
Overview, Rooms (list + create/edit sheet), Employees (table with roles), Reservations (calendar-style + table), Pricing (rate calendar), Restaurant management, Inventory management, Reports.

**Phase 7 — Reception** (`/reception/*`)
Dashboard (4 KPI cards: check-in / check-out / occupied / available / pending payments), Recent Bookings table, Walk-in booking form, Guest list, Check-in / Check-out flows (multi-step), Room allocation picker, Invoice generator, Payment collection modal.

**Phase 8 — Housekeeping** (`/housekeeping/*`)
Room status board (Dirty / In-progress / Ready / Maintenance columns) with drag-and-drop (`@dnd-kit/core`), Room detail (update status, upload photo mock, request maintenance), My Assignments.

**Phase 9 — Restaurant** (`/restaurant-ops/*`)
Kitchen Display System — columns New / Preparing / Ready / Delivered, order cards advance on click, mock "real-time" via `setInterval` new orders, print-ticket modal.

**Phase 10 — Inventory + Analytics + polish**
Inventory categories (Bedsheets, Soap, Shampoo, Food, Cleaning, Beverages) with stock levels, low-stock alerts, reorder modal. Analytics dashboard with all 6 charts. Global responsive pass, keyboard nav, ARIA on interactive widgets, empty states, loading skeletons.

## Tech additions

- `bun add @dnd-kit/core @dnd-kit/sortable` (housekeeping + KDS drag)
- `date-fns` already in shadcn calendar deps
- No backend; a `useMockAuth()` hook reads role from `localStorage`, `/login` sets it, each layout guards its route.

## Deliverables

~50 new route files, ~30 shared dashboard components (KPICard, DataTable wrapper, StatusPill, TimelineItem, ChartCard, EmptyState, PrintableInvoice, ChatThread, KanbanBoard, RateCalendar, StockBar), full mock datasets, and one login/role-switcher page. All navigable from a "Staff / Guest login" link added to the public navbar.

## Notes

- This is a large build (~1 continuous execution). No auth, no persistence beyond `localStorage`.
- If you later enable Lovable Cloud, the mock services in `src/mock/` are structured so each can be swapped for a `createServerFn` call without touching components.
