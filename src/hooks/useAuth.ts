import { authState, myMSALObj } from '@/config/msalConfig'
import { ref } from 'vue'

export const useAuth = () => {
  const isAuthenticated = ref(false)

  const login = async () => {
    try {
      if (!myMSALObj) {
        throw new Error('MSAL Object is not initialized')
      }
      const loginResponse = await myMSALObj.loginRedirect()
      isAuthenticated.value = true
      console.log(loginResponse)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    if (!myMSALObj) {
      throw new Error('MSAL Object is not initialized')
    }
    myMSALObj.logoutRedirect()
    isAuthenticated.value = false
  }

  const handleRedirect = async () => {
    try {
      await myMSALObj.handleRedirectPromise()
      authState.isAuthenticated = (await myMSALObj.getAllAccounts().length) > 0
      authState.user = await myMSALObj.getAllAccounts()[0]
    } catch (error) {
      console.log(error)
    }
  }

  const initialize = async () => {
    try {
      await myMSALObj.initialize()
    } catch (error) {
      console.log('Initialize error', error)
    }
  }

  return {
    initialize,
    isAuthenticated,
    handleRedirect,
    login,
    logout
  }
}
