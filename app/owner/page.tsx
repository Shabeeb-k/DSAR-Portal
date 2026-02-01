import { supabase } from '../../utils/supabaseClient';
import { redirect } from 'next/navigation';
import CompanyRegistrationForm from '../../components/CompanyRegistrationForm';
import OwnerDSARRequests from '../../components/OwnerDSARRequests';

export default async function OwnerDashboard() {

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <div className="max-w-2xl w-full p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-white mb-6 text-center">Owner Dashboard</h1>
        {company ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">Company: {company.name}</h2>
            <p className="mb-2 text-sm text-gray-500">Status: <span className={company.status === 'approved' ? 'text-green-600 font-semibold' : company.status === 'pending' ? 'text-yellow-500 font-semibold' : 'text-red-600 font-semibold'}>{company.status}</span></p>
            <form action="/owner/subscribe" method="POST" className="mb-6">
              <input type="hidden" name="company_id" value={company.id} />
              <button type="submit" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:scale-105 transition-transform">{company.subscription_status === 'active' || company.subscription_status === 'trialing' ? 'Manage Subscription' : 'Subscribe'}</button>
            </form>
            <OwnerDSARRequests />
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow">
            <p className="text-gray-600 dark:text-gray-300 text-center">No company registered yet.</p>
            <div className="mt-6">
              <CompanyRegistrationForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
