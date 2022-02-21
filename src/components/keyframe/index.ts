import { keyframes } from '@emotion/react'

const insertWordKeyFrame = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -1rem, 0);
  }

  70% {
    transform: translate3d(0, -0.5rem, 0);
  }

  90% {
    transform: translate3d(0, -0.1rem, 0);
  }
`

export { insertWordKeyFrame }
