import { Button, Center, Divider, Flex, Stack, Text } from '@chakra-ui/react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Logo } from '..'
import styled from '@emotion/styled'
import { theme } from '../../theme'

type HexagonBoxProps = {
  onClick?: () => void
  children?: JSX.Element
}
const Hexagon = styled.span`
  .hex {
    margin-top: 60px;
    width: 208px;
    height: 120px;
    background-color: ${theme.colors.brand[500]};
    border-color: ${theme.colors.brand[500]};
    position: relative;
    display: inline-block;
  }

  .hex:before {
    content: ' ';
    width: 0;
    height: 0;
    border-bottom: 60px solid;
    border-color: inherit;
    border-left: 104px solid transparent;
    border-right: 104px solid transparent;
    position: absolute;
    top: -60px;
  }
  .hex:after {
    content: '';
    width: 0;
    position: absolute;
    bottom: -60px;
    border-top: 60px solid;
    border-color: inherit;
    border-left: 104px solid transparent;
    border-right: 104px solid transparent;
  }
  .hex:hover {
    background-color: ${theme.colors.brand[200]};
    border-color: ${theme.colors.brand[200]};
    cursor: pointer;
  }
`
function HexagonBox({ children, onClick }: HexagonBoxProps) {
  return (
    <Hexagon onClick={() => onClick?.()}>
      <Center className="hex">
        <Text textStyle="h5" color="white" textAlign="center">
        </Text>
        {children}
      </Center>
    </Hexagon>
  )
}

export default HexagonBox
