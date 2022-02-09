create table if not exists public.orgs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT,
  photourl      TEXT NULL,
  logourl       TEXT NULL,
  notes         TEXT NULL,
  categories    TEXT[] NULL,
  address       JSONB NULL,
  email         JSONB NULL,
  instantmessage JSONB NULL,
  phone         JSONB NULL,
  socialprofile JSONB NULL,
  url           JSONB NULL,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW(),
  created_by    UUID REFERENCES auth.users,
  metadata      JSONB NULL,
  xtra          JSONB NULL
);
CREATE INDEX idx_orgs_categories on public.orgs USING GIN (categories);
