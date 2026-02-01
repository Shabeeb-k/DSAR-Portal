import { supabase } from '../../utils/supabaseClient';
import { redirect } from 'next/navigation';
import { logAudit } from '../../utils/audit';

export async function POST(request: Request) {
  const formData = await request.formData();
  const dsar_id = formData.get('dsar_id') as string;
  const status = formData.get('status') as string;
  if (!dsar_id || !['open','in_progress','in_review','closed'].includes(status)) {
    return new Response('Invalid request', { status: 400 });
  }
 
  const { data: dsar } = await supabase.from('dsar_requests').select('status').eq('id', dsar_id).single();
  await supabase.from('dsar_requests').update({ status }).eq('id', dsar_id);

  await logAudit({
    entity_type: 'dsar_request',
    entity_id: dsar_id,
    action: 'update_status',
    performed_by: 'owner', 
    old_status: dsar?.status,
    new_status: status,
  });
  redirect('/owner');
}
