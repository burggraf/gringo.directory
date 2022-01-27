create table if not exists public.persons (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uid           UUID REFERENCES auth.users NULL,
  firstname     TEXT,
  middlename    TEXT,
  lastname      TEXT,
  nickname      TEXT,
  company       TEXT,
  photourl      TEXT NULL,
  dob           DATE NULL,
  anniversary   DATE NULL,  
  notes         TEXT NULL,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW(),
  created_by    UUID REFERENCES auth.users,
  metadata      JSONB NULL,
  xtra          JSONB NULL
);

