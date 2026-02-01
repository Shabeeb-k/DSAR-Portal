import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <div className="max-w-xl w-full p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 text-center">
        <div className="flex justify-center mb-6">
          <Image src="/favicon.ico" alt="DSAR Portal Logo" width={64} height={64} className="rounded-full shadow" />
        </div>
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-white mb-4">DSAR Portal</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">A modern SaaS platform for Data Subject Access Requests.<br />Role-based dashboards, Stripe subscriptions, and Supabase backend.</p>
        <div className="flex flex-col gap-4">
          <a href="/auth/login" className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition-transform">Login</a>
          <a href="/auth/register" className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold shadow hover:scale-105 transition-transform">Register</a>
          <a href="/admin" className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold shadow hover:scale-105 transition-transform">Admin Dashboard</a>
        </div>
        <div className="mt-8 text-sm text-gray-400 dark:text-gray-500">
          <span>© {new Date().getFullYear()} DSAR Portal. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}
