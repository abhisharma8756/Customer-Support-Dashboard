import { Headphones } from "lucide-react";
export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <Headphones size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">SupportDesk</h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Customer Support Dashboard
            </p>
          </div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
          AS
        </div>
      </div>
    </header>
  );
}
