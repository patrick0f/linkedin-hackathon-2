import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envPath = path.resolve(__dirname, '../../.env');

// Debug file existence
console.log('Checking .env file:', {
  envPath,
  exists: fs.existsSync(envPath),
});

// Load environment variables from .env file
const result = dotenv.config({ path: envPath });

// Debug dotenv result
console.log('Dotenv config result:', {
  error: result.error ? 'Error loading .env' : 'No error',
  parsed: result.parsed ? 'Config parsed' : 'No config found'
});

// TEMPORARY: For testing only
// process.env.SUPABASE_URL = 'https://your-project-url.supabase.co';  // Replace this with your actual URL
// process.env.SUPABASE_SERVICE_ROLE_KEY = 'your-service-role-key';     // Replace this with your actual key

// Use either the backend-specific vars or the Next.js public vars
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Environment variables loaded:', {
  hasUrl: Boolean(supabaseUrl),
  hasKey: Boolean(supabaseKey)
});

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey); 