import Stripe from 'stripe';
import { supabase } from '@/utils/supabaseClient';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-01-28.clover' });

export async function POST(request: Request) {
  const formData = await request.formData();
  const company_id = formData.get('company_id') as string;
  if (!company_id) return new Response('Missing company_id', { status: 400 });

  const { data: company } = await supabase.from('companies').select('id, owner_id, name, stripe_customer_id').eq('id', company_id).single();
  if (!company) return new Response('Company not found', { status: 404 });
  const { data: owner } = await supabase.from('profiles').select('email').eq('id', company.owner_id).single();
  if (!owner) return new Response('Owner not found', { status: 404 });

  let stripeCustomerId = company.stripe_customer_id;
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: owner.email,
      name: company.name,
      metadata: { company_id: company.id }
    });
    stripeCustomerId = customer.id;
    await supabase.from('companies').update({ stripe_customer_id: stripeCustomerId }).eq('id', company.id);
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{
      price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID!,
      quantity: 1
    }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/owner?subscribed=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/owner?canceled=1`,
  });

  redirect(session.url!);
}
