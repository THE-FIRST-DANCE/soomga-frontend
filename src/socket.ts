import { io } from 'socket.io-client'
import { GLOBAL_CONFIG } from 'global.config'
import { getCookie } from 'utils/cookie'

export const socket = io(GLOBAL_CONFIG.VITE_APP_SOCKET_URL, {
  autoConnect: true,
  auth: {
    accessToken: getCookie('accessToken'),
  },
})
