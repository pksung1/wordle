import { keyframes, SerializedStyles } from '@emotion/react'

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

const shakeWord = keyframes`
  from, 20%, 40%, 60%, 80%, to {
    transform: translate3d(-0.1rem, 0, 0);
    
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(0.1rem, 0, 0);
    border-color: red;
  }
`

// 색상 변화를 위한 css prop을 받습니다.
const checkFrame = (css: SerializedStyles) => keyframes`
  from {
    transform: rotateY(0);
  }
  50% {
    background: initial;
    transform: rotateY(90deg);
  }
  to {
    ${css}
    transform: rotateY(0deg);
  }
`

export { insertWordKeyFrame, shakeWord, checkFrame }
