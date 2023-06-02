import { Box, ColorMode } from '@chakra-ui/react'
import styled from '@emotion/styled'

type CarouselProps = {
  colorMode: ColorMode
}

export const CarouselWrap = styled(Box)<CarouselProps>`
  .slick-dots {
    align-items: center;
    display: flex;
    width: 100%;
  }
  .slick-dots li button {
    color: ${({ colorMode }) => (colorMode === 'dark' ? 'white' : 'black')};
  }
  .slick-dots li button:before {
    color: ${({ colorMode }) => (colorMode === 'dark' ? 'white' : 'black')};
  }
  .slick-dots li.slick-active button:before {
    color: ${({ colorMode }) => (colorMode === 'dark' ? 'white' : 'black')};
  }
`
