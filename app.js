// ----- Data layer (localStorage) -----
const STORAGE_KEY = "maintenance-core-services";

const SEED = [
  {
    code: "MC-8821",
    customer: "Alpha Logistics Ltd.",
    machine: "Forklift LX-200",
    serviceType: "Repair",
    status: "in-progress",
    technician: "Robert Chen",
    lastUpdate: "2024-10-24T08:45",
    notes: "Hydraulic system inspection in progress. Awaiting replacement seals from central warehouse.",
    tasks: ["Initial inspection completed", "Hydraulic seals ordered"]
  },
  {
    code: "MC-9034",
    customer: "Horizon Manufacturing",
    machine: "Conveyor System V3",
    serviceType: "Emergency Repair",
    status: "critical",
    technician: "Maria Lopez",
    lastUpdate: "2024-10-24T11:20",
    notes: "Belt motor failure. Production halted until replacement parts arrive.",
    tasks: ["Motor diagnosed", "Replacement parts ordered"]
  },
  {
    code: "MC-7412",
    customer: "Apex Food Processing",
    machine: "Industrial Mixer 400L",
    serviceType: "Preventive Maintenance",
    status: "scheduled",
    technician: "James Park",
    lastUpdate: "2024-10-22T09:00",
    notes: "Quarterly preventive maintenance scheduled.",
    tasks: ["Service date confirmed with customer"]
  },
  {
    code: "MC-8120",
    customer: "Global Pharma Supply",
    machine: "Cold Storage Unit B",
    serviceType: "Inspection",
    status: "hold",
    technician: "Unassigned",
    lastUpdate: "2024-10-20T14:30",
    notes: "On hold pending customer approval of quote.",
    tasks: []
  },
  {
    code: "WO-8842",
    customer: "Northern Industries",
    machine: "Industrial Compressor X1",
    serviceType: "Repair",
    status: "in-progress",
    technician: "Robert Chen",
    lastUpdate: "2024-10-24T08:45",
    notes: "Technician identified a pressure leakage in the secondary valve assembly. The unit has been partially dismantled for seal replacement. Initial diagnostics suggest cavitation issues caused by improper intake filtering.",
    tasks: [
      "Decompression sequence completed",
      "Intake manifold inspection ongoing",
      "Secondary pump recalibrated"
    ]
  }
];

const STATUS_META = {
  "in-progress": { label: "In Progress", badge: "bg-orange-100 text-orange-600", dot: "bg-orange-600", text: "text-orange-600" },
  "critical":    { label: "Critical",    badge: "bg-red-100 text-red-600",       dot: "bg-red-600",    text: "text-red-600" },
  "scheduled":   { label: "Scheduled",   badge: "bg-green-100 text-green-600",   dot: "bg-green-600",  text: "text-green-600" },
  "hold":        { label: "Hold",        badge: "bg-zinc-100 text-zinc-600",     dot: "bg-zinc-500",   text: "text-zinc-600" },
  "completed":   { label: "Completed",   badge: "bg-blue-100 text-blue-600",     dot: "bg-blue-600",   text: "text-blue-600" }
};

function loadServices() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
    return [...SEED];
  }
  try { return JSON.parse(raw); } catch { return [...SEED]; }
}

function saveServices(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function findService(code) {
  if (!code) return null;
  return loadServices().find(s => s.code.toUpperCase() === code.trim().toUpperCase()) || null;
}

function upsertService(service, originalCode) {
  const list = loadServices();
  const key = originalCode || service.code;
  const i = list.findIndex(s => s.code === key);
  if (i >= 0) list[i] = service;
  else list.unshift(service);
  saveServices(list);
}

function deleteService(code) {
  saveServices(loadServices().filter(s => s.code !== code));
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

// ----- Shared shell (header + sidebar + footer) -----
function renderShell(activePage) {
  const navItems = [
    { id: "tracker",  label: "Tracker",         icon: "search",                href: "index.html" },
    { id: "service",  label: "Service Details", icon: "visibility",            href: "service-details.html" },
    { id: "admin",    label: "Admin Dashboard", icon: "admin_panel_settings",  href: "admin.html" }
  ];

  const headerHtml = `
    <header class="bg-white flex justify-between items-center w-full px-6 h-16 fixed top-0 z-50 border-b border-zinc-200">
      <a href="index.html" class="flex items-center gap-3">
        <span class="material-symbols-outlined text-orange-600">factory</span>
        <h1 class="text-xl font-black uppercase tracking-tighter text-zinc-900">MAINTENANCE CORE</h1>
      </a>
      <div class="flex items-center gap-4">
        <span class="text-zinc-500 font-public-sans text-sm tracking-tight hidden md:block">Authorized Personnel Only</span>
        <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">
          <span class="text-xs font-bold text-orange-600">JD</span>
        </div>
      </div>
    </header>`;

  const sidebarHtml = `
    <aside class="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col pt-20 bg-zinc-50 border-r border-zinc-200 z-40">
      <div class="px-6 mb-8">
        <span class="font-public-sans text-xs uppercase font-semibold text-orange-600 tracking-wider">SYSTEM MENU</span>
      </div>
      <nav class="flex flex-col gap-1 px-2">
        ${navItems.map(item => {
          const active = item.id === activePage;
          const cls = active
            ? "flex items-center gap-4 bg-white text-orange-600 border-r-4 border-orange-600 px-4 py-3 font-public-sans text-xs uppercase font-semibold transition-all duration-200"
            : "flex items-center gap-4 text-zinc-600 px-4 py-3 font-public-sans text-xs uppercase font-semibold hover:bg-zinc-100 transition-all duration-200";
          return `<a class="${cls}" href="${item.href}">
                    <span class="material-symbols-outlined">${item.icon}</span>
                    ${item.label}
                  </a>`;
        }).join("")}
      </nav>
    </aside>`;

  const footerHtml = `
    <footer class="bg-zinc-100 flex flex-col md:flex-row justify-between items-center px-8 py-6 w-full mt-auto border-t border-zinc-200">
      <p class="font-public-sans text-xs tracking-wide text-zinc-600">
        © 2024 Industrial Maintenance Systems. Authorized Personnel Only.
      </p>
      <div class="flex gap-6 mt-4 md:mt-0">
        <a class="font-public-sans text-xs tracking-wide text-zinc-500 hover:text-orange-600 transition-colors" href="#">Support</a>
        <a class="font-public-sans text-xs tracking-wide text-zinc-500 hover:text-orange-600 transition-colors" href="#">Safety Protocols</a>
        <a class="font-public-sans text-xs tracking-wide text-zinc-500 hover:text-orange-600 transition-colors" href="#">Privacy</a>
      </div>
    </footer>`;

  document.body.insertAdjacentHTML("afterbegin", headerHtml + sidebarHtml);
  document.body.insertAdjacentHTML("beforeend", footerHtml);
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page) renderShell(page);
});
