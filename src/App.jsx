import { useEffect, useMemo } from "react";
import { Ticket, CircleAlert, Clock3, CheckCircle2 } from "lucide-react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TicketFilters from "./components/TicketFilters";
import TicketTable from "./components/TicketTable";
import TicketDetails from "./components/TicketDetails";
import useTicketStore from "./store/ticketStore";
export default function App() {
  const s = useTicketStore();
  useEffect(() => {
    s.fetchTickets();
  }, []);
  const stats = useMemo(
    () => ({
      total: s.tickets.length,
      open: s.tickets.filter((t) => t.status === "Open").length,
      progress: s.tickets.filter((t) => t.status === "In Progress").length,
      resolved: s.tickets.filter((t) => t.status === "Resolved").length,
    }),
    [s.tickets],
  );
  const filtered = useMemo(
    () =>
      s.tickets.filter((t) => {
        const q = s.search.toLowerCase();
        return (
          (t.customer.name.toLowerCase().includes(q) ||
            t.customer.email.toLowerCase().includes(q) ||
            t.subject.toLowerCase().includes(q)) &&
          (s.statusFilter === "All" || t.status === s.statusFilter) &&
          (s.priorityFilter === "All" || t.priority === s.priorityFilter)
        );
      }),
    [s.tickets, s.search, s.statusFilter, s.priorityFilter],
  );
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Support Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and respond to customer support tickets.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Tickets"
            value={stats.total}
            description="All support tickets"
            icon={<Ticket size={20} />}
          />
          <StatCard
            title="Open"
            value={stats.open}
            description="Needs attention"
            icon={<CircleAlert size={20} />}
          />
          <StatCard
            title="In Progress"
            value={stats.progress}
            description="Currently being handled"
            icon={<Clock3 size={20} />}
          />
          <StatCard
            title="Resolved"
            value={stats.resolved}
            description="Successfully completed"
            icon={<CheckCircle2 size={20} />}
          />
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold">Support Tickets</h2>
          <p className="text-sm text-slate-500">
            Search and manage incoming customer requests.
          </p>
          <div className="mt-4">
            <TicketFilters />
          </div>
          <div className="mt-4">
            {s.loading ? (
              <div className="rounded-2xl border bg-white p-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
                <p className="mt-3 text-sm text-slate-500">
                  Loading tickets...
                </p>
              </div>
            ) : s.error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
                <p>{s.error}</p>
                <button
                  onClick={s.fetchTickets}
                  className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <TicketTable tickets={filtered} />
            )}
          </div>
        </div>
      </main>
      <TicketDetails />
    </div>
  );
}
