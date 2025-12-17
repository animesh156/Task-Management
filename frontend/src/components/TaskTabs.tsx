type Tab = "assigned" | "created" | "overdue";

export default function TaskTabs({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 bg-gray-100 p-1 rounded-lg mt-4">
      {(["assigned", "created", "overdue"] as Tab[]).map((t) => {
        const active = tab === t;

        return (
          <button 
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition
              ${
                active
                  ? "bg-black text-white shadow"
                  : "text-gray-600 hover:bg-white"
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
