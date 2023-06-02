import { createContext, ReactElement, ReactNode, useContext, useMemo, useState } from 'react'

type AppContextType = {
  drawerOpen: boolean
  toggleDrawer: VoidFunction
}

export const AppContext = createContext<AppContextType>({
  drawerOpen: false,
  toggleDrawer: () => null
})

export const useAppContext = (): AppContextType => useContext(AppContext)

function AppProvider({ children }: { children: ReactNode }): ReactElement {
  const [drawerOpen, setDrawerOpen] = useState(true)

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen)
  }

  const values = { drawerOpen, toggleDrawer }

  const memoizedValues = useMemo(() => values, [values])

  return <AppContext.Provider value={memoizedValues}>{children}</AppContext.Provider>
}

export default AppProvider
