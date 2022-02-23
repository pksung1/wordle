/**
 * 간단한 styled 컴포넌트를 작성합니다.
 */

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { insertWordKeyFrame } from '../keyframe'

const WordBox = styled.div<{ inserted: boolean }>`
  aspect-ratio: 1;
  box-sizing: border-box;
  border: 0.1rem solid ${({ theme }) => theme.color.text};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  ${({ inserted }) =>
    inserted &&
    css`
      animation: ${insertWordKeyFrame} 0.5s ease;
    `}
`

export { WordBox }
