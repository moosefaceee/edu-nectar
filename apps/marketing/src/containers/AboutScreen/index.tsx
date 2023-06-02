import { Card, Image, Stack, Text } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { Carousel } from '../../components'
import { ABOUT_SLIDES } from '../../constants'

export type Slide = {
  image: string
  title: string
  subTitle: string
}

let isUnderConstruction = false

function SlideElement({ slide }: { slide: Slide }) {
  return (
    <Stack textAlign="center" spacing={4} marginBottom={6}>
      <Image src={slide.image} width="md" objectFit="cover" borderRadius={4} height={250} />
      <Text textStyle="h5">{slide.title}</Text>
      <Text textStyle="p">{slide.subTitle}</Text>
    </Stack>
  )
}

function renderSlides({ slides }: { slides: Slide[] }) {
  return slides.map((slide) => <SlideElement key={slide.title} slide={slide} />)
}

function AboutScreen(): ReactElement {
  return (
    <Stack align="center" justify="center" flexDirection="column" flex={1}>
      {isUnderConstruction ? (
        <Text textStyle="h5">This is a page about us, it's still under construction 🚧</Text>
      ) : (
        <Card padding={4} paddingBottom={8}>
          <Carousel
            renderControls={false}
            width="sm"
            renderSlides={() => renderSlides({ slides: ABOUT_SLIDES })}
          />
        </Card>
      )}
    </Stack>
  )
}

export default AboutScreen
