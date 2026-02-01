"use client";
import { supabase } from '@/utils/supabaseClient';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      window.location.href = '/owner';
    } else {
      setErrorMsg(error.message || 'Login failed. Please check your credentials.');
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card style={{ maxWidth: 400, width: "100%" }}>
        <CardHeader>
          <CardTitle>Owner Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" required />
            <Button type="submit">Login</Button>
          </form>
          {errorMsg && (
            <div style={{ marginTop: 16, color: "red", fontWeight: 600 }}>{errorMsg}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}