import { Icon, IconButton, useColorMode } from '@chakra-ui/react'
import { FiMoon, FiSun } from 'react-icons/fi'

function ModeToggle() {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <IconButton
      icon={colorMode === 'dark' ? <Icon as={FiMoon} /> : <Icon as={FiSun} />}
      onClick={toggleColorMode}
      aria-label="dark/light mode toggle"
    />
  )
}

export default ModeToggle
