import { CorrectType } from '@/store/atoms'
import {
  css,
  Keyframes,
  SerializedStyles,
  Theme,
  useTheme,
} from '@emotion/react'
import { memo, useEffect, useMemo, useRef } from 'react'
import { checkFrame, insertWordKeyFrame } from '../keyframe'
import { WordBox } from '../styled'

type WordProps = {
  word: string
  index: number
  correct: CorrectType | null
  parentCss?: SerializedStyles | null
}

const getFrame = (theme: Theme): { [key in CorrectType]: Keyframes } => ({
  CORRECT: checkFrame(
    css`
      background-color: ${theme.color.correct};
    `
  ),
  ONLY_WORD_CORRECT: checkFrame(
    css`
      background-color: ${theme.color.onlyPosCorrect};
    `
  ),
  NO: checkFrame(
    css`
      background-color: ${theme.color.notCorrect};
    `
  ),
  NOT_YET: insertWordKeyFrame,
})

const Word = ({ word, index, correct, parentCss }: WordProps) => {
  const theme = useTheme()
  const animation: SerializedStyles | null = useMemo(() => {
    if (correct === null) {
      return null
    }
    const frame = getFrame(theme)[correct]
    if (['CORRECT', 'ONLY_WORD_CORRECT', 'NO'].includes(correct)) {
      return css`
        animation: ${frame} 0.5s ease ${index * 0.5}s forwards;
      `
    }
    return css`
      animation: ${frame} 0.3s ease;
    `
  }, [correct])

  return (
    <WordBox
      css={css`
        ${animation} ${parentCss}
      `}
    >
      {word}
    </WordBox>
  )
}

export default memo(Word)
