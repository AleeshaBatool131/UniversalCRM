// Static UI-only data for the dashboard. No backend wiring — Day 1 scope
// is layout, navigation, and visual design only.

export const statCards = [
  {
    id: "customers",
    label: "Total Customers",
    value: "8,492",
    delta: "+12.4%",
    trend: "up",
    icon: "fa-solid fa-users",
    accent: "bg-brand-500/10 text-brand-600",
  },
  {
    id: "leads",
    label: "Active Leads",
    value: "1,267",
    delta: "+5.1%",
    trend: "up",
    icon: "fa-solid fa-bullseye",
    accent: "bg-gold-500/10 text-gold-500",
  },
  {
    id: "employees",
    label: "Employees",
    value: "184",
    delta: "+2 new",
    trend: "up",
    icon: "fa-solid fa-id-badge",
    accent: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "tasks",
    label: "Pending Tasks",
    value: "37",
    delta: "-8 today",
    trend: "down",
    icon: "fa-solid fa-list-check",
    accent: "bg-rose-500/10 text-rose-600",
  },
];

export const revenueData = [
  { month: "Jan", revenue: 32000, target: 30000 },
  { month: "Feb", revenue: 41000, target: 32000 },
  { month: "Mar", revenue: 38500, target: 34000 },
  { month: "Apr", revenue: 47200, target: 36000 },
  { month: "May", revenue: 52800, target: 38000 },
  { month: "Jun", revenue: 49600, target: 40000 },
  { month: "Jul", revenue: 61200, target: 42000 },
  { month: "Aug", revenue: 58300, target: 44000 },
  { month: "Sep", revenue: 67900, target: 46000 },
  { month: "Oct", revenue: 72100, target: 48000 },
  { month: "Nov", revenue: 69800, target: 50000 },
  { month: "Dec", revenue: 81400, target: 52000 },
];

export const recentActivity = [
  {
    id: 1,
    user: "Ayesha Khan",
    action: "closed a deal with",
    target: "Northwind Traders",
    time: "8 min ago",
    icon: "fa-solid fa-handshake",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    id: 2,
    user: "Hamza Ahmed",
    action: "added a new lead",
    target: "Bluepeak Logistics",
    time: "34 min ago",
    icon: "fa-solid fa-user-plus",
    color: "text-brand-600 bg-brand-50",
  },
  {
    id: 3,
    user: "Fatima Ali",
    action: "scheduled a meeting with",
    target: "Orbit Manufacturing",
    time: "1 hr ago",
    icon: "fa-solid fa-calendar-check",
    color: "text-gold-500 bg-gold-400/10",
  },
  {
    id: 4,
    user: "System",
    action: "flagged an overdue task for",
    target: "Hara & Sons",
    time: "2 hr ago",
    icon: "fa-solid fa-triangle-exclamation",
    color: "text-rose-600 bg-rose-50",
  },
  {
    id: 5,
    user: "Usman Malik",
    action: "updated the profile of",
    target: "Sienna Coffee Co.",
    time: "3 hr ago",
    icon: "fa-solid fa-pen",
    color: "text-violet-600 bg-violet-50",
  },
  {
    id: 6,
    user: "Sara Iqbal",
    action: "onboarded a new employee,",
    target: "Bilal Hussain",
    time: "5 hr ago",
    icon: "fa-solid fa-id-badge",
    color: "text-brand-600 bg-brand-50",
  },
];

export const sidebarNav = [
  { label: "Dashboard", icon: "fa-solid fa-grid-2", path: "/dashboard" },
  { label: "Customers", icon: "fa-solid fa-users", path: "/customers" },
  { label: "Leads", icon: "fa-solid fa-bullseye", path: "/leads" },
  { label: "Employees", icon: "fa-solid fa-id-badge", path: "/employees" },
  { label: "Tasks", icon: "fa-solid fa-list-check", path: "/tasks" },
  { label: "Meetings", icon: "fa-solid fa-calendar-check", path: "/meetings" },
  { label: "Calendar", icon: "fa-solid fa-calendar-days", path: "/calendar" },
  { label: "Reports", icon: "fa-solid fa-chart-pie", path: "/reports" },
  { label: "Settings", icon: "fa-solid fa-gear", path: "/settings" },
];

export const notifications = [
  {
    id: 1,
    title: "New lead assigned",
    body: "Bluepeak Logistics was assigned to you.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Task overdue",
    body: "Follow-up call with Hara & Sons is overdue.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: 3,
    title: "Meeting reminder",
    body: "Orbit Manufacturing sync starts in 30 minutes.",
    time: "2 hr ago",
    unread: false,
  },
  {
    id: 4,
    title: "Monthly report ready",
    body: "Your May performance report has been generated.",
    time: "Yesterday",
    unread: false,
  },
];

export const currentUser = {
  name: "Sana Ahmed",
  role: "Sales Operations Manager",
  email: "sana.ahmed@universalcrm.com",
  avatarInitials: "SA",
};