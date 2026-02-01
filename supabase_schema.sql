create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text check (role in ('admin', 'owner')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);


create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  name text not null,
  logo_url text,
  address text,
  email text,
  phone text,
  employees_count integer,
  field text,
  representation text check (representation in ('EU', 'UK', 'EU_UK')),
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  slug text unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text check (subscription_status in ('inactive', 'trialing', 'active', 'canceled', 'past_due')) default 'inactive',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists public.dsar_requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  requester_name text not null,
  requester_email text not null,
  requester_phone text,
  request_text text not null,
  document_url text,
  status text check (status in ('open', 'in_progress', 'in_review', 'closed')) default 'open',
  created_at timestamp with time zone default timezone('utc'::text, now())
);


create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  performed_by uuid references public.profiles(id),
  old_status text,
  new_status text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);


create index if not exists idx_companies_owner_id on public.companies(owner_id);
create index if not exists idx_dsar_requests_company_id on public.dsar_requests(company_id);
create index if not exists idx_audit_logs_entity_id on public.audit_logs(entity_id);
