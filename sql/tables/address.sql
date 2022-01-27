create table if not exists public.address (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ownerid    UUID,
  type       TEXT NULL,
  name       TEXT NULL,
  address    TEXT NULL,
  address2   TEXT NULL,
  city       TEXT NULL,
  province   TEXT NULL,
  postalcode TEXT NULL,
  country    TEXT NULL,
  pluscode   TEXT NULL,
  latitude   NUMERIC NULL,
  longitude  NUMERIC NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users,
  xtra       JSONB NULL
);
