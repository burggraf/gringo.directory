create table if not exists public.userroles (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  userid        UUID REFERENCES auth.users,
  roles         TEXT[],
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.userroles ENABLE ROW LEVEL SECURITY;
-- no access for anyone
-- CREATE POLICY "select userroles" ON public.groups FOR SELECT USING (true);
-- CREATE POLICY "insert userroles" ON public.groups FOR INSERT WITH CHECK (false);
-- CREATE POLICY "delete userroles" ON public.groups FOR DELETE USING (false);
-- CREATE POLICY "update userroles" ON public.groups FOR UPDATE USING (false) WITH CHECK (false);

--INSERT INTO public.userroles (userid, role)
--VALUES (, 'admin');