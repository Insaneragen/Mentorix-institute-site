import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fxxsfsvfdnzkvktabszr.supabase.co';
const supabaseAnonKey = 'sb_publishable_OA4HKf_oyP7s2HKo9Z8tvQ_qREEbLUi';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Testing session_logs table...');
  const { data, error } = await supabase.from('session_logs').select('*');
  if (error) {
    console.error('Error fetching session logs:', error.message);
  } else {
    console.log('Success! session_logs table exists. Number of rows found:', data.length);
  }
}

test();
