import { Route, Routes } from 'react-router-dom'
import { GuestNavbar } from '../components'
import { AboutScreen, FAQScreen, HomeScreen, NotFoundScreen, PricingScreen } from '../containers'
import { PageWrap } from '../layouts'

function Navigation() {
  return (
    <Routes>
      <Route element={<GuestNavbar />}>
        <Route element={<PageWrap title="EduNectar" />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="about" element={<AboutScreen />} />
          <Route path="pricing" element={<PricingScreen />} />
          <Route path="faq" element={<FAQScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Navigation
