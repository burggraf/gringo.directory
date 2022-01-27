create table if not exists public.orgs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT,
  photourl      TEXT NULL,
  logourl       TEXT NULL,
  notes         TEXT NULL,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW(),
  created_by    UUID REFERENCES auth.users,
  metadata      JSONB NULL,
  xtra          JSONB NULL
);

