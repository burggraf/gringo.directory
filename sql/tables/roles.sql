create table if not exists public.roles (
  role          TEXT PRIMARY KEY,
  description   TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
-- no access for anyone

INSERT INTO public.roles (role, description) 
VALUES ('admin', 'user with administrative privileges');
INSERT INTO public.roles (role, description) 
VALUES ('verified', 'verified user');
INSERT INTO public.roles (role, description) 
VALUES ('authenticated', 'authenticated user');
