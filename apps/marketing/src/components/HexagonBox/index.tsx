import { Button, Center, Divider, Flex, Stack, Text, theme } from '@chakra-ui/react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Logo } from '..'
import styled from '@emotion/styled'

type HexagonBoxProps = {
  title: string
  children?: JSX.Element
}
const Hexagon = styled.span`
  .hex {
    margin-top: 60px;
    width: 208px;
    height: 120px;
    background-color: yellow;
    border-color: black;
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
    background-color: lightyellow;
    border-color: darkyellow;
    cursor: pointer;
  }
`
function HexagonBox({ title, children }: HexagonBoxProps) {
  return (
    <Hexagon>
      <Center className="hex">
        <Text textStyle="h5" color="white" textAlign="center">
          {title}
        </Text>
        {children}
      </Center>
    </Hexagon>
  )
}

export default HexagonBox
