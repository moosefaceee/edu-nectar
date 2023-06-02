import { Route, Routes } from 'react-router-dom'
import { GuestNavbar, Navbar } from '../components'
import {
  AboutScreen,
  DashboardScreen,
  HomeScreen,
  LoginScreen,
  NotFoundScreen,
  RegisterScreen
} from '../containers'
import { RequireAuth } from '../context/AuthProvider'
import { PageWrap } from '../layouts'

/**
 * Trying to keep navigation as simple as possible. Easier to comprehend as a new developer.
 * This will still be expanded on greatly. Perhaps lazy imports for Screens for performance 🚀
 * TODO: Dynamic titles
 */

function Navigation() {
  return (
    <Routes>
      {/*
       * Unauthenticated pages (Guest)
       */}
      <Route element={<GuestNavbar />}>
        <Route element={<PageWrap title="Core Suite" />}>
          <Route path="/" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="home" element={<HomeScreen />} />
          <Route path="about" element={<AboutScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Route>
      {/*
       * Authenticated pages
       *
       * All paths will be prepended with /auth and are protected by the AuthProvider
       * When a Guest tries to navigate to any of these, they will be taken to /
       */}
      <Route
        element={
          <RequireAuth>
            <Navbar />
          </RequireAuth>
        }
      >
        <Route path="/auth" element={<PageWrap title="Core Suite" />}>
          <Route path="dashboard" element={<DashboardScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Navigation
