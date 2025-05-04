-- Create a table for caching data
CREATE TABLE IF NOT EXISTS public.cache (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at BIGINT NOT NULL
);

-- Set up RLS policies
ALTER TABLE public.cache ENABLE ROW LEVEL SECURITY;

-- Allow the service role to manage the cache
CREATE POLICY "Service role can manage cache" ON public.cache
    USING (true)
    WITH CHECK (true);

-- Grant permissions to authenticated users to read the cache
CREATE POLICY "Authenticated users can read cache" ON public.cache
    FOR SELECT
    TO authenticated
    USING (true);
