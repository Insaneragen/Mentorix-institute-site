import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fxxsfsvfdnzkvktabszr.supabase.co';
const supabaseAnonKey = 'sb_publishable_OA4HKf_oyP7s2HKo9Z8tvQ_qREEbLUi';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Fetching all user profiles from database...');
  const { data, error } = await supabase.from('profiles').select('email, role, name');
  if (error) {
    console.error('Error fetching profiles:', error.message);
  } else {
    console.log('Profiles found in database:');
    data.forEach(p => {
      console.log(`- Name: ${p.name}, Email: ${p.email}, Role: ${p.role}`);
    });
  }
}

test();
