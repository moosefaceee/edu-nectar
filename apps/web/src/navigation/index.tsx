import { Route, Routes } from 'react-router-dom'
import { GuestNavbar, Navbar } from '../components'
import {
  HomeScreen,
  LearningPathsScreen,
  LessonScreen,
  LoginScreen,
  NotFoundScreen,
  TopicsScreen
} from '../containers'
import { RequireAuth } from '../context/AuthProvider'
import { FullBleedWrap, PageWrap } from '../layouts'

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
        <Route element={<PageWrap title="Edu Nectar" />}>
          <Route path="/" element={<LoginScreen />} />
          <Route path="home" element={<HomeScreen />} />
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
        <Route element={<FullBleedWrap />}>
          <Route path="/auth" element={<PageWrap title="Core Suite" />}>
            <Route path="dashboard" element={<TopicsScreen />} />
            <Route path="learning-path/:id" element={<LearningPathsScreen />} />
            <Route path="lesson/:id" element={<LessonScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default Navigation
