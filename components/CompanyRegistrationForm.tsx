import { supabase } from '@/utils/supabaseClient';
import { redirect } from 'next/navigation';
import { companySchema } from '@/utils/validation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default async function CompanyRegistrationForm() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  async function handleRegisterCompany(formData: FormData) {
    'use server';
    if (!user) return;
    const values = {
      name: formData.get('name'),
      logo_url: formData.get('logo_url'),
      address: formData.get('address'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      employees_count: formData.get('employees_count'),
      field: formData.get('field'),
      representation: formData.get('representation'),
    };
    const parse = companySchema.safeParse(values);
    if (!parse.success) {
      return;
    }
    const { error } = await supabase.from('companies').insert({
      owner_id: user.id,
      ...parse.data,
      status: 'pending',
    });
    if (!error) {
      redirect('/owner');
    }
   
  }

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto" }}>
      <Card>
        <CardHeader>
          <CardTitle style={{ textAlign: "center" }}>Register Your Company</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleRegisterCompany} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Input name="name" placeholder="Company Name" required />
            <Input name="logo_url" placeholder="Logo URL" />
            <Input name="address" placeholder="Address" required />
            <Input name="email" type="email" placeholder="Company Email" required />
            <Input name="phone" placeholder="Phone Number" required />
            <Input name="employees_count" type="number" placeholder="# Employees" required />
            <Input name="field" placeholder="Field of Work/Service" required />
            <Select name="representation" required>
              <SelectTrigger>
                <SelectValue placeholder="Representation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EU">EU</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="EU_UK">EU & UK</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Register Company</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}