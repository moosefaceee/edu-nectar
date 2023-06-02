import { AuthProvider } from './context'
import Navigation from './navigation'

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
}

export default App
