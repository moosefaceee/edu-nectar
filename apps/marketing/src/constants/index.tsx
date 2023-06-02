import { Slide } from '../containers/AboutScreen'
import images from '../theme/images'

export const KMZ_API = import.meta.env.VITE_KMZ_LINK

export const MAPS_API = import.meta.env.VITE_GOOGLEMAPSAPIKEY

export const MAP_CONFIG = {
  NORTH: 0,
  SOUTH: 180,
  WEST: -90,
  EAST: 90
}

export const OPEN_WIDTH = 60

export const CLOSED_WIDTH = 16

export const ABOUT_SLIDES: Slide[] = [
  {
    image: images.walkthroughOne,
    title: 'Easy project creation',
    subTitle:
      "Add a few simple details to begin your project creation, it's simple, effective and easily editable."
  },
  {
    image: images.walkthroughTwo,
    title: 'Easy engineering',
    subTitle:
      "We've taken the hassle out of the PV plant design process by reducing the amount of time needed to engineer a plant."
  },
  {
    image: images.walkthroughThree,
    title: 'Easy reporting',
    subTitle:
      "Reporting has never been simpler, you'll have all your necessary reports available on hand, per project."
  }
]
