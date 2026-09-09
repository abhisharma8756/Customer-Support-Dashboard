import TicketRow from "./TicketRow";
export default function TicketTable({ tickets }) {
  if (!tickets.length)
    return (
      <div className="flex min-h-[250px] items-center justify-center rounded-2xl border bg-white p-8">
        <div className="text-center">
          <p className="font-semibold text-slate-700">No tickets found</p>
          <p className="mt-1 text-sm text-slate-400">
            Try changing your search or filters.
          </p>
        </div>
      </div>
    );
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden border-b bg-slate-50 px-4 py-3 md:grid md:grid-cols-[1.3fr_2fr_120px_150px_120px_30px]">
        <span>Customer</span>
        <span>Issue</span>
        <span>Priority</span>
        <span>Status</span>
        <span>Created</span>
      </div>
      {tickets.map((t) => (
        <TicketRow key={t.id} ticket={t} />
      ))}
    </div>
  );
}
