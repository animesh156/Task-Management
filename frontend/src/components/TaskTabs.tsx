type Tab = "assigned" | "created" | "overdue";

export default function TaskTabs({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 bg-[#020617] border border-slate-800 p-1 rounded-xl mt-4">
      {(["assigned", "created", "overdue"] as Tab[]).map((t) => {
        const active = tab === t;

        return (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition
              ${
                active
                  ? "bg-slate-800 text-slate-100 shadow-sm"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }
            `}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        );
      })}
    </div>
  );
}
