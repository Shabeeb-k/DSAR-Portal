

export type Company = {
  id: string;
  owner_id: string;
  name: string;
  logo_url?: string;
  address: string;
  email: string;
  phone: string;
  employees_count: number;
  field: string;
  representation: 'EU' | 'UK' | 'EU_UK';
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
};

export type DSARRequest = {
  id: string;
  company_id: string;
  requester_name: string;
  requester_email: string;
  requester_phone?: string;
  request_text: string;
  status: 'open' | 'in_progress' | 'in_review' | 'closed';
  created_at?: string;
};

export type Profile = {
  id: string;
  email: string;
  role: 'admin' | 'owner';
  created_at?: string;
};
