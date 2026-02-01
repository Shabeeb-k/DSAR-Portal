import Stripe from 'stripe';
import { supabase } from '@/utils/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-01-28.clover' });
export async function POST(request: Request) {
    const sig = request.headers.get('stripe-signature');
    const body = await request.text();
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const customerId = session.customer;
     
        const { data: company } = await supabase.from('companies').select('id').eq('stripe_customer_id', customerId).single();
        if (company) {
            await supabase.from('companies').update({ subscription_status: 'active', stripe_subscription_id: session.subscription }).eq('id', company.id);
        }
    }

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.created') {
        const subscription = event.data.object as any;
        const customerId = subscription.customer;
        let status = subscription.status;
     
        if (status === 'trialing' || status === 'active') {
            status = status;
        } else if (status === 'canceled' || status === 'past_due' || status === 'unpaid' || status === 'incomplete') {
            status = 'inactive';
        }
        const { data: company } = await supabase.from('companies').select('id').eq('stripe_customer_id', customerId).single();
        if (company) {
            await supabase.from('companies').update({ subscription_status: status, stripe_subscription_id: subscription.id }).eq('id', company.id);
        }
    }

    return new Response('Webhook received', { status: 200 });
}
