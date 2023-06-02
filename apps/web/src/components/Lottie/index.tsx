import Lottie, { LottieComponentProps } from 'lottie-react'

type LottieAnimationProps = LottieComponentProps & {
  animationData: unknown
}

function LottieAnimation({ animationData, ...rest }: LottieAnimationProps) {
  return <Lottie {...rest} animationData={animationData} loop={true} />
}

export default LottieAnimation
