import { CorrectType } from '@/store/atoms'
import {
  css,
  Keyframes,
  SerializedStyles,
  Theme,
  useTheme,
} from '@emotion/react'
import { memo, useMemo } from 'react'
import { checkFrame, insertWordKeyFrame } from '../keyframe'
import { WordBox } from '../styled'

type WordProps = {
  word: string
  index: number
  correct: CorrectType | null
  parentCss?: SerializedStyles | null
}

/**
 * keyframe Animation을 가져옵니다.
 * @param theme ThemeProvider의 theme 값입니다.
 * @returns CorrectType에 해당하는 keyframe을 반환합니다
 */
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

/**
 * 한 단어 컴포넌트입니다.
 * 애니메이션을 관리합니다.
 * @param word 한 단어입니다.
 * @param index 단어 위치입니다
 * @param correct 정답여부입니다 CORRECT | ONLY_WORD_CORRECT | NO | NOT_YET
 * @param parentCss 부모의 css입니다. WordBox 에서 컴포지션합니다.
 */
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
