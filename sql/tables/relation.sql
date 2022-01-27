create table if not exists public.relation (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ownerid    UUID,
  type       TEXT NULL,
  name       TEXT NULL,
  personid   UUID NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users,
  xtra       JSONB NULL
);
