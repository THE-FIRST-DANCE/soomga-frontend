type OAuthProvider = 'google' | 'line'

export function onOAuthConnect(provider: OAuthProvider, redirectUrl?: string) {
  const url = `${import.meta.env.VITE_APP_BASE_URL}auth/${provider}`

  window.sessionStorage.setItem('redirect', redirectUrl || window.location.pathname)

  window.open(url, '_self')
}

export function onGoogleLogin(redirectUrl?: string) {
  onOAuthConnect('google', redirectUrl)
}

export function onLineLogin(redirectUrl?: string) {
  onOAuthConnect('line', redirectUrl)
}
