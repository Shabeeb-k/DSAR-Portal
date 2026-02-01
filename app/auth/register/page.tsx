"use client";
import { supabase } from '@/utils/supabaseClient';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (!error && data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, email, role: 'owner' });
      setSuccessMsg('Registration successful! You can now log in.');
      e.currentTarget.reset();
    } else {
      setErrorMsg(error?.message || 'Registration failed. Please try again.');
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card style={{ maxWidth: 400, width: "100%" }}>
        <CardHeader>
          <CardTitle>Owner Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" required />
            <Button type="submit">Register</Button>
          </form>
          {successMsg && (
            <div style={{ marginTop: 16, color: "green", fontWeight: 600 }}>{successMsg}</div>
          )}
          {errorMsg && (
            <div style={{ marginTop: 16, color: "red", fontWeight: 600 }}>{errorMsg}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}