-- Create saved_queries table
create table saved_queries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null default auth.uid(),
  query_text text not null,
  explanation text not null,
  complexity text not null,
  optimization_tips jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table saved_queries enable row level security;

-- Policies for Row Level Security
create policy "Users can select own queries"
  on saved_queries for select
  using ( auth.uid() = user_id );

create policy "Users can insert own queries"
  on saved_queries for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete own queries"
  on saved_queries for delete
  using ( auth.uid() = user_id );
