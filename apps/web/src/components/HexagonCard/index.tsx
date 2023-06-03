import { Box, Center, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { theme } from '../../theme'

type HexagonProps = {
  title?: { topic: string }
  onClick: () => void
}

type Props = {
  size: number
  margin: number
}
export const HexagonContainer = styled.div<Props>`
  display: flex;
  --s: ${(Props) => (Props ? Props.size : 7)}px; /* size  */
  --m: ${(Props) => (Props ? Props.margin : 1)}px; /* margin */
  --f: calc(var(--s) * 1.732 + 4 * var(--m) - 1px);

  .container {
    font-size: 0;
  }

  .container .container-div {
    width: var(--s);
    margin: var(--m);
    height: calc(var(--s) * 1.1547);
    display: inline-block;
    font-size: initial;
    clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
    margin-bottom: calc(var(--m) - var(--s) * 0.2885);

    background-color: ${theme.colors.brand[500]};
    border-color: ${theme.colors.brand[500]};
  }

  .container:before {
    content: '';
    width: calc(var(--s) / 2 + var(--m));
    float: left;
    height: 120%;
    shape-outside: repeating-linear-gradient(#0000 0 calc(var(--f) - 3px), #000 0 var(--f));
  }
`

function HexagonCard({ title, onClick }: HexagonProps) {
  return (
    <Box className="container-div" position="relative">
      <Center
        onClick={onClick}
        position="absolute"
        top={0}
        left={0}
        h="100%"
        w="100%"
        _hover={{
          backgroundColor: 'brand.200',
          cursor: 'pointer',
          p: {
            color: 'brand.500'
          }
        }}
      >
        <Text
          textStyle="h5"
          color="white"
          textAlign="center"
          overflowWrap="break-word"
          paddingX={2}
        >
          {title?.topic}
        </Text>
      </Center>
    </Box>
  )
}

export default HexagonCard
