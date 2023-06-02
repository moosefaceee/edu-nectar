import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './context'
import Navigation from './navigation'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
