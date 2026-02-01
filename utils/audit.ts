import { supabase } from '@/utils/supabaseClient';

export async function logAudit({ entity_type, entity_id, action, performed_by, old_status, new_status }: {
  entity_type: string;
  entity_id: string;
  action: string;
  performed_by: string;
  old_status?: string;
  new_status?: string;
}) {
  await supabase.from('audit_logs').insert({
    entity_type,
    entity_id,
    action,
    performed_by,
    old_status,
    new_status,
  });
}
