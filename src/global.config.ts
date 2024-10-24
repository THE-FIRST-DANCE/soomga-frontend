export const GLOBAL_CONFIG = {
  VITE_APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL || '/api',
  VITE_APP_SOCKET_URL: import.meta.env.VITE_APP_SOCKET_URL || '/api',
  VITE_APP_SERVE_MODE: import.meta.env.VITE_APP_SERVE_MODE || 'development',
}
