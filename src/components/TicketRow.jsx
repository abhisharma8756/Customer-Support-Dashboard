import { ChevronRight } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import useTicketStore from "../store/ticketStore";
export default function TicketRow({ ticket }) {
  const { selectTicket, changeStatus } = useTicketStore();
  const date = new Date(ticket.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <div
      onClick={() => selectTicket(ticket)}
      className="group cursor-pointer border-b border-slate-100 p-4 hover:bg-slate-50 last:border-0"
    >
      <div className="grid gap-4 md:grid-cols-[1.3fr_2fr_120px_150px_120px_30px] md:items-center">
        <div>
          <p className="font-semibold text-slate-900">{ticket.customer.name}</p>
          <p className="text-xs text-slate-500">{ticket.customer.email}</p>
        </div>
        <div>
          <p className="font-medium text-slate-800">{ticket.subject}</p>
          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
            {ticket.description}
          </p>
        </div>
        <PriorityBadge priority={ticket.priority} />
        <div onClick={(e) => e.stopPropagation()}>
          <select
            value={ticket.status}
            onChange={(e) => changeStatus(ticket.id, e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
        <div className="text-sm text-slate-500">{date}</div>
        <ChevronRight
          size={18}
          className="text-slate-300 group-hover:text-indigo-500"
        />
      </div>
    </div>
  );
}
