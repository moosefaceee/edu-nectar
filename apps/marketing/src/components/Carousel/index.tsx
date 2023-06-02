import { Box, BoxProps, Button, Flex, Icon, useColorMode } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Slider from 'react-slick'
import { CarouselWrap } from './styles'

type CarouselProps = BoxProps & {
  renderSlides: () => ReactElement[]
  renderControls?: boolean
}

function appendDots(i: number, slider: Slider | null) {
  return (
    <Flex justifyContent="space-between" width="100%" alignItems="center">
      <Button
        width={100}
        aria-label="previous-arrow"
        variant="ghost"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        leftIcon={<Icon as={FiArrowLeft} />}
      >
        Back
      </Button>
      <Flex color="white">{i}</Flex>
      <Button
        width={100}
        aria-label="next-arrow"
        variant="ghost"
        zIndex={2}
        onClick={() => slider?.slickNext()}
        rightIcon={<Icon as={FiArrowRight} />}
      >
        Next
      </Button>
    </Flex>
  )
}

function Carousel({ renderSlides, renderControls, ...rest }: CarouselProps): ReactElement {
  const { colorMode } = useColorMode()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (i: number) => appendDots(i, slider)
  }
  /**
   * As we have used custom buttons, we need a reference variable to
   * change the state
   */
  const [slider, setSlider] = React.useState<Slider | null>(null)

  return (
    <Box {...rest}>
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <CarouselWrap colorMode={colorMode}>
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {renderSlides()}
        </Slider>
      </CarouselWrap>
    </Box>
  )
}

export default Carousel

Carousel.defaultProps = {
  renderControls: true
}
