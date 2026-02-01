import { supabase } from '@/utils/supabaseClient';
import { redirect } from 'next/navigation';

export default async function OwnerDSARRequests() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: company } = await supabase
    .from('companies')
    .select('id')
    .eq('owner_id', user.id)
    .single();
  if (!company) return <div>No company found.</div>;

  const { data: dsarRequests } = await supabase
    .from('dsar_requests')
    .select('*')
    .eq('company_id', company.id)
    .order('created_at', { ascending: false });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-white text-center">DSAR Requests</h2>
      <ul className="space-y-4">
        {dsarRequests?.length ? dsarRequests.map((dsar: any) => (
          <li key={dsar.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 shadow">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-indigo-700 dark:text-indigo-300">{dsar.requester_name}</span>
                <span className={
                  dsar.status === 'open' ? 'text-yellow-500 font-semibold' :
                  dsar.status === 'in_progress' ? 'text-blue-500 font-semibold' :
                  dsar.status === 'in_review' ? 'text-purple-500 font-semibold' :
                  dsar.status === 'closed' ? 'text-green-600 font-semibold' :
                  'text-gray-500'
                }>{dsar.status.replace('_', ' ')}</span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">{dsar.requester_email}</div>
              <div className="text-gray-600 dark:text-gray-300">Request: {dsar.request_text}</div>
              <form action={`/owner/update-dsar-status`} method="POST" className="mt-2 flex gap-2">
                <input type="hidden" name="dsar_id" value={dsar.id} />
                <select name="status" defaultValue={dsar.status} className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="in_review">In Review</option>
                  <option value="closed">Closed</option>
                </select>
                <button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform">Update</button>
              </form>
            </div>
          </li>
        )) : <li className="text-center text-gray-500 dark:text-gray-400">No DSAR requests.</li>}
      </ul>
    </div>
  );
}
