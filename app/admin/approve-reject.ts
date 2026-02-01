import { supabase } from '../../utils/supabaseClient';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { logAudit } from '../../utils/audit';

export async function POST(request: Request) {
  const formData = await request.formData();
  const company_id = formData.get('company_id') as string;
  const action = formData.get('action') as string;

  if (!company_id || !['approve', 'reject'].includes(action)) {
    return new Response('Invalid request', { status: 400 });
  }

  // Get old status for audit
  const { data: company } = await supabase.from('companies').select('status').eq('id', company_id).single();
  let update: any = { status: action === 'approve' ? 'approved' : 'rejected' };
  if (action === 'approve') {
    // Generate unique slug
    const slug = `company-${company_id.slice(0, 6)}-${uuidv4().slice(0, 4)}`;
    update.slug = slug;
  }
  await supabase.from('companies').update(update).eq('id', company_id);
  // Audit log
  await logAudit({
    entity_type: 'company',
    entity_id: company_id,
    action: action,
    performed_by: 'admin', // Replace with actual admin id if available
    old_status: company?.status,
    new_status: update.status,
  });
  redirect('/admin');
}
