import { Center, Spinner } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import { ReactElement, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

type AuthProviderProps = {
  isAuthenticated: boolean
  isAuthenticating: boolean
  user: string | null
  login: () => void
  logout: () => void
  register: VoidFunction
  useAuth: () => Partial<AuthProviderProps>
  children: React.ReactNode
}

const AuthContext = createContext<Partial<AuthProviderProps>>({})

export const useAuth = () => useContext(AuthContext)

/**
 * This represents some generic auth provider API, like AWS Cognito.
 *
 * This is where you would put your login, logout, and register functions. It will also indicate
 * whether or not the user is authenticated, and if we are currently in the process of authenticating
 *
 * You might end up creating a new file for this, something like `authHelpers.ts` or `auth.ts`
 *
 * You might end up storing isAuthenticated and isAuthenticating in localStorage or sessionStorage
 */
export const fakeAuthProvider = {
  isAuthenticated: false,
  isAuthenticating: false,
  login(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true
    setTimeout(callback, 100) // fake async
  },
  logout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false
    setTimeout(callback, 100)
  }
}

/*
 * This component is what we'll use to kick out unauthenticated users.
 */
export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth()
  let location = useLocation()

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function AuthProvider({ children }: { children: ReactElement }): ReactElement {
  let navigate = useNavigate()

  let [isAuthenticating, setIsAuthenticating] = useState(false)
  let [isAuthenticated, setIsAuthenticated] = useState(false)
  let [user, setUser] = useState<string | null>(null)

  /*
   * code for pre-loading the user's information if we have their token in
   * localStorage goes here
   */
  useEffect(() => {
    if (fakeAuthProvider.isAuthenticated) {
      setIsAuthenticated(true)
    }
  }, [fakeAuthProvider])

  const values = { user, login, logout, register, useAuth, isAuthenticated }

  const memoizedValues = useMemo(() => values, [values])

  // 🚨 this is the important bit.
  // Normally your provider components render the context provider with a value.
  // But we post-pone rendering any of the children until after we've determined
  // whether or not we have a user token and if we do, then we render a spinner
  // while we go retrieve that user's information.
  if (isAuthenticating) {
    return (
      <Center width="100%" height="100vh">
        <Spinner />
      </Center>
    )
  }

  // Include your login functionality here instead of the fake login function
  function login() {
    setIsAuthenticating(true)
    return fakeAuthProvider.login(() => {
      setUser(faker.name.findName())
      setIsAuthenticating(false)
      // this is where any newly logged in user should be navigated to
      navigate('/auth/dashboard')
    })
  }

  // Include your logout functionality here instead of the fake logout function
  function logout() {
    return fakeAuthProvider.logout(() => {
      setUser(null)
    })
  }

  // Include your register functionality here instead of the fake register function
  function register() {
    return // register the user
  }

  return <AuthContext.Provider value={memoizedValues}>{children}</AuthContext.Provider>
}

export default AuthProvider
