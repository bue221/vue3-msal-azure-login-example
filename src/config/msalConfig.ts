import {
  PublicClientApplication,
  type AccountInfo,
  type RedirectRequest
} from '@azure/msal-browser'
import { reactive } from 'vue'

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID as string,
    authority: import.meta.env.VITE_MSAL_AUTHORITY as string,
    redirectUri: '/validateLogin'
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
}

export const graphScopes: RedirectRequest = {
  scopes: ['User.Read', 'User.ReadBasic.All', 'User.ReadWrite.All', 'Group.ReadWrite.All']
}

// Estado de autenticación global (usado en todas las rutas)
export const authState = reactive({
  isAuthenticated: false,
  user: null as AccountInfo | null
})

export const myMSALObj = new PublicClientApplication(msalConfig)
