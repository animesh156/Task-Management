type Tab = "assigned" | "created" | "overdue";

export default function TaskTabs({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
}) {
  return (
    <div className="flex gap-2 mt-4">
      {["assigned", "created", "overdue"].map((t) => (
        <button
          key={t}
          onClick={() => setTab(t as Tab)}
          className={`px-4 py-2 rounded text-sm ${
            tab === t
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          {t.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
