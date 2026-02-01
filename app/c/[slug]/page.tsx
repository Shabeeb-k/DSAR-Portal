import { supabase } from '../../../utils/supabaseClient';
import { notFound } from 'next/navigation';
import DSARForm from '../../../components/DSARForm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PublicCompanyPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: company } = await supabase.from('companies').select('*').eq('slug', slug).single();
  if (!company) return notFound();

  const dsarFormEnabled = company.status === 'approved' && ['active', 'trialing'].includes(company.subscription_status);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card style={{ maxWidth: 700, width: "100%", padding: 0 }}>
        <CardHeader>
          <CardTitle style={{ textAlign: "center" }}>{company.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {company.logo_url && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <img src={company.logo_url} alt="Logo" style={{ height: 96, borderRadius: "50%", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }} />
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            <div><strong>Address:</strong> {company.address}</div>
            <div><strong>Email:</strong> {company.email}</div>
            <div><strong>Phone:</strong> {company.phone}</div>
            <div><strong>Field:</strong> {company.field}</div>
            <div><strong># Employees:</strong> {company.employees_count}</div>
            <div><strong>Representation:</strong> {company.representation}</div>
          </div>
          {dsarFormEnabled ? (
            <div style={{ marginTop: 40 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>Submit DSAR</h2>
              <DSARForm companyId={company.id} />
            </div>
          ) : (
            <div style={{ marginTop: 40, color: "red", fontWeight: 600, textAlign: "center" }}>
              This company’s DSAR portal is currently inactive
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}