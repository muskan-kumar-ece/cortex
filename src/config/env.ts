/**
 * Environment variables — centralised, validated at startup.
 * NEXT_PUBLIC_* vars are inlined at build time (browser-safe).
 * Non-prefixed vars are server-only.
 */
export const env = {
  /** Full base URL including /api/v1  e.g. http://localhost:8000/api/v1 */
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1",
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
} as const;
