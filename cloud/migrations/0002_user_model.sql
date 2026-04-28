-- 1. Create the `users` table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  google_sub TEXT,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Backfill a bootstrap admin user (so existing connections aren't orphaned)
INSERT INTO public.users (id, email, name)
VALUES ('00000000-0000-0000-0000-000000000000', 'admin@local', 'Admin')
ON CONFLICT (email) DO NOTHING;

-- 3. Add user_id to provider_connections
ALTER TABLE public.provider_connections ADD COLUMN user_id UUID REFERENCES public.users(id) ON DELETE CASCADE;

-- 4. Assign existing connections to the bootstrap user
UPDATE public.provider_connections SET user_id = '00000000-0000-0000-0000-000000000000' WHERE user_id IS NULL;

-- 5. Enforce non-null and add indexes
ALTER TABLE public.provider_connections ALTER COLUMN user_id SET NOT NULL;
CREATE INDEX idx_provider_connections_user_id ON public.provider_connections(user_id);
