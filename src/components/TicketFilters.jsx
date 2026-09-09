import { Search, SlidersHorizontal } from "lucide-react";
import useTicketStore from "../store/ticketStore";
export default function TicketFilters() {
  const s = useTicketStore();
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={s.search}
            onChange={(e) => s.setSearch(e.target.value)}
            placeholder="Search tickets..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={18}
            className="hidden text-slate-400 sm:block"
          />
          <select
            value={s.statusFilter}
            onChange={(e) => s.setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm sm:w-44"
          >
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <select
            value={s.priorityFilter}
            onChange={(e) => s.setPriorityFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm sm:w-44"
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>
    </div>
  );
}
