const placeholderApiUrl = "https://your-render-url.onrender.com/api/v1";

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? placeholderApiUrl
};

export const configState = {
  hasSupabase: Boolean(env.supabaseUrl && env.supabaseAnonKey),
  hasApi: Boolean(env.apiUrl && env.apiUrl !== placeholderApiUrl),
  isReady: Boolean(env.supabaseUrl && env.supabaseAnonKey && env.apiUrl && env.apiUrl !== placeholderApiUrl)
};

export function getConfigurationIssues() {
  const issues: string[] = [];

  if (!configState.hasSupabase) {
    issues.push("Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to unlock live chain data.");
  }

  if (!configState.hasApi) {
    issues.push("Set NEXT_PUBLIC_API_URL so trusted actions and validation can run.");
  }

  return issues;
}
