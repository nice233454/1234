export function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
        <div className="h-24 bg-gray-100 rounded-lg"></div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-3">
          <div className="h-20 bg-gray-100 rounded-lg"></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="space-y-3">
          <div className="h-10 bg-gray-100 rounded-lg"></div>
          <div className="h-10 bg-gray-100 rounded-lg"></div>
          <div className="h-10 bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
