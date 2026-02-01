import { supabase } from '@/utils/supabaseClient';
import { redirect } from 'next/navigation';
import { dsarSchema } from '@/utils/validation';

export default function DSARForm({ companyId }: { companyId: string }) {
  async function handleSubmit(formData: FormData) {
    'use server';
    const values = {
      requester_name: formData.get('requester_name'),
      requester_email: formData.get('requester_email'),
      requester_phone: formData.get('requester_phone'),
      request_text: formData.get('request_text'),
    };
    const parse = dsarSchema.safeParse(values);
    if (!parse.success) {
      return;
    }
  
    const { error } = await supabase.from('dsar_requests').insert({
      company_id: companyId,
      ...parse.data,
      status: 'open',
    });
    if (!error) {
      console.log('DSAR created:', parse.data);
      redirect(`/c/${companyId}?success=1`);
    }
    
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
      <form action={handleSubmit} className="space-y-6">
        <input name="requester_name" placeholder="Your Name" className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        <input name="requester_email" type="email" placeholder="Your Email" className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        <input name="requester_phone" placeholder="Your Phone" className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <textarea name="request_text" placeholder="Request Details" className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow hover:scale-105 transition-transform">Submit DSAR</button>
      </form>
    </div>
  );
}
