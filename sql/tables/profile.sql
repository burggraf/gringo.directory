create table if not exists public.profile (
  id            UUID PRIMARY KEY REFERENCES auth.users,
  email         TEXT,
  firstname     TEXT,
  lastname      TEXT,
  phone         TEXT,
  address       TEXT,
  city          TEXT,
  state         TEXT,
  postal_code   TEXT,
  bio           TEXT,
  photo_url     TEXT,
  xtra          JSONB
);

ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authenticated users can read any profile" ON public.profile FOR SELECT USING ((auth.role() = 'authenticated'::text));
CREATE POLICY "users can create their own profile" ON public.profile FOR INSERT WITH CHECK ((auth.uid() = id));
CREATE POLICY "users can delete their own profile" ON public.profile FOR DELETE USING ((auth.uid() = id));
CREATE POLICY "users can update their own profile" ON public.profile FOR UPDATE USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));

-- Create trigger that creates a profile for a new user
DROP TRIGGER IF EXISTS on_auth_user_created on auth.users;
DROP FUNCTION IF EXISTS handle_new_user;

create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profile (id, email)
  values (new.id, new.email);
  insert into public.userroles (userid, roles)
  values (new.id, ARRAY [new.role]);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- UPDATE USER 
create or replace function public.handle_user_update() 
returns trigger as $$
begin
  --select ARRAY(SELECT DISTINCT UNNEST(new.userroles || '{a,b,c}')) from tabl1

  IF new.email_confirmed_at is not null THEN
    update public.userroles
    set roles = ARRAY(
      SELECT DISTINCT UNNEST(
        (select roles from public.userroles where userid = new.id) || ARRAY['verified', new.role])
    )
    where userid = new.id;
  ELSE
    update public.userroles
    set roles = ARRAY(
      SELECT DISTINCT UNNEST(
        (select roles from public.userroles where userid = new.id) || ARRAY[new.role])
    )
    where userid = new.id;
  END IF;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_update();
