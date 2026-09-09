const styles = {
  Open: "bg-red-50 text-red-700 border-red-200",
  "In Progress": "bg-yellow-50 text-yellow-700 border-yellow-200",
  Resolved: "bg-green-50 text-green-700 border-green-200",
};
export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
