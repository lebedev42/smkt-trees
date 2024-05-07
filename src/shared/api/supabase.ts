import { createClient } from '@supabase/supabase-js';

const REACT_APP_SUPABASE_URL = 'https://phkpwihunlfdndusegiu.supabase.co';
const REACT_APP_SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoa3B3aWh1bmxmZG5kdXNlZ2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwOTY4MDAsImV4cCI6MjAzMDY3MjgwMH0.hPhByDyZyvDNCKBuR4lWAAGIaU3vYTFdfuXZn3Vo6hU';

export const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_KEY,
);
