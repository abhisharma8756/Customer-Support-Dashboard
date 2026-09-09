import { X, Mail, Phone, Calendar, User } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import useTicketStore from "../store/ticketStore";
export default function TicketDetails() {
  const { selectedTicket, closeTicket, changeStatus } = useTicketStore();
  if (!selectedTicket) return null;
  const t = selectedTicket;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <p className="text-xs font-medium text-indigo-600">
              Ticket #{t.id}
            </p>
            <h2 className="mt-1 text-lg font-bold">{t.subject}</h2>
          </div>
          <button
            onClick={closeTicket}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <User size={17} className="text-indigo-600" />
                <h3 className="font-semibold">Customer Information</h3>
              </div>
              <p className="font-medium">{t.customer.name}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Mail size={14} />
                {t.customer.email}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Phone size={14} />
                {t.customer.phone}
              </p>
            </div>
            <div className="rounded-xl border bg-slate-50 p-4">
              <h3 className="mb-3 font-semibold">Ticket Information</h3>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={t.status} />
                <PriorityBadge priority={t.priority} />
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <Calendar size={14} />
                {new Date(t.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold">Issue Details</h3>
            <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {t.description}
            </p>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Conversation</h3>
              <select
                value={t.status}
                onChange={(e) => changeStatus(t.id, e.target.value)}
                className="rounded-lg border px-3 py-2 text-sm"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
            <div className="mt-3 space-y-3">
              {t.messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === "Support" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${m.sender === "Support" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-800"}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold">{m.sender}</span>
                      <span className="text-[10px] opacity-70">
                        {new Date(m.time).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="mt-2 text-sm">{m.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
