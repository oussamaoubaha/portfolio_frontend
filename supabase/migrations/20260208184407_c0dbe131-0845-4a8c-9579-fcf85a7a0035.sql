
-- The "Anyone can submit feedback" INSERT policy with WITH CHECK (true) is intentional
-- since visitors must be able to submit comments without authentication.
-- We add a check to ensure visitor_name and message are not empty for basic validation.
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;
CREATE POLICY "Anyone can submit feedback" ON public.feedback 
  FOR INSERT 
  WITH CHECK (
    visitor_name IS NOT NULL AND 
    length(trim(visitor_name)) > 0 AND 
    message IS NOT NULL AND 
    length(trim(message)) > 0 AND
    approved = false
  );
