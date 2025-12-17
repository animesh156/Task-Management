export default function TaskSkeleton() {
  return (
    <div className="border rounded p-4 animate-pulse">
      <div className="h-4 bg-gray-300 w-2/3 mb-2" />
      <div className="h-3 bg-gray-200 w-full mb-1" />
      <div className="h-3 bg-gray-200 w-5/6 mb-3" />
      <div className="h-3 bg-gray-300 w-24" />
    </div>
  );
}
