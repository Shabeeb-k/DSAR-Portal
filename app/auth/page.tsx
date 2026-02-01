export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-white mb-4">Welcome to DSAR Portal</h1>
        <div className="space-y-4">
          <a href="/auth/login" className="block w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition-transform">Login</a>
          <a href="/auth/register" className="block w-full py-3 px-6 rounded-lg bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold shadow hover:scale-105 transition-transform">Register</a>
        </div>
      </div>
    </div>
  );
}
