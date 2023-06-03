import { Center, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { theme } from '../../theme'

type HexagonProps = {
  title?: { topic: string }
  onClick: () => void
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

function HexagonCard({ title, onClick }: HexagonProps) {
  return (
    <Hexagon onClick={onClick}>
      <Center className="hex" maxWidth="208px">
        <Text
          textStyle="h5"
          color="white"
          textAlign="center"
          overflowWrap="break-word"
          marginTop={8}
          paddingX={2}
        >
          {title?.topic}
        </Text>
      </Center>
    </Hexagon>
  )
}

export default HexagonCard
