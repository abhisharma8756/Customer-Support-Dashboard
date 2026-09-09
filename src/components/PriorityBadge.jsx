const styles = {
  Low: "bg-slate-100 text-slate-700",
  Medium: "bg-orange-100 text-orange-700",
  High: "bg-red-100 text-red-700",
};
export default function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}
