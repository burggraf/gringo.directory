create table if not exists public.email (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ownerid    UUID,
  type       TEXT NULL,
  email      TEXT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users,
  xtra       JSONB NULL
);
