import { supabase } from '../../utils/supabaseClient';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  // Fetch current user and check admin role
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') redirect('/auth/login');

  // Fetch pending companies
  const { data: pendingCompanies } = await supabase
    .from('companies')
    .select('*')
    .eq('status', 'pending');

  // Fetch all DSAR requests
  const { data: dsarRequests } = await supabase
    .from('dsar_requests')
    .select('*, company:company_id(name)')
    .order('created_at', { ascending: false });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <div className="max-w-4xl w-full p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-white mb-8 text-center">Admin Dashboard</h1>
        <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-700 dark:text-gray-200">Pending Companies</h2>
        <ul className="mb-10 space-y-4">
          {pendingCompanies?.length ? pendingCompanies.map((company: any) => (
            <li key={company.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 shadow">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg text-indigo-700 dark:text-indigo-300">{company.name}</span> <span className="text-gray-500">- {company.email}</span>
                </div>
                <form action={`/admin/approve-reject`} method="POST" className="flex gap-2">
                  <input type="hidden" name="company_id" value={company.id} />
                  <button name="action" value="approve" className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform">Approve</button>
                  <button name="action" value="reject" className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform">Reject</button>
                </form>
              </div>
            </li>
          )) : <li className="text-gray-400">No pending companies.</li>}
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700 dark:text-gray-200">All DSAR Requests</h2>
        <ul>
          {dsarRequests?.length ? dsarRequests.map((dsar: any) => (
            <li key={dsar.id} className="mb-2 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <div>
                <span className="font-bold text-indigo-700 dark:text-indigo-300">{dsar.requester_name}</span> <span className="text-gray-500">- {dsar.requester_email}</span> | <span className="italic text-sm text-gray-600 dark:text-gray-400">{dsar.status}</span>
                <div className="text-sm text-gray-600 dark:text-gray-400">Company: {dsar.company?.name || 'N/A'}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Request: {dsar.request_text}</div>
              </div>
            </li>
          )) : <li className="text-gray-400">No DSAR requests.</li>}
        </ul>
      </div>
    </div>
  );
}
