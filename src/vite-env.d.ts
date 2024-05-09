/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BASE_URL?: string;
  VITE_API_KEY?: string;
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
