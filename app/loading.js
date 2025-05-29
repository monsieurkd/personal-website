export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Loading...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we load the content
        </p>
      </div>
    </div>
  );
}
