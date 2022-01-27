create table if not exists public.socialprofile (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ownerid    UUID,
  type       TEXT NULL,
  url        TEXT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users,
  xtra       JSONB NULL
);
