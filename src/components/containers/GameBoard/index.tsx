import { insertWordKeyFrame } from '@/components/keyframe'
import { WordBox } from '@/components/styled'
import { wordleState } from '@/store/atoms'
import { useUpdateWordle } from '@/store/hooks'
import { css, useTheme } from '@emotion/react'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'

type WordRowProps = {
  word: string
}
const WordRow: React.FC<WordRowProps> = ({ word }) => {
  const wordArray = word.padEnd(5).split('')
  const wordInsertIndex = word.length - 1

  return (
    <>
      {wordArray.map((w, idx) => (
        <WordBox key={w + idx} inserted={idx <= wordInsertIndex}>
          {w}
        </WordBox>
      ))}
    </>
  )
}

const GameBoard = () => {
  useUpdateWordle()
  const wordles = useRecoilValue(wordleState)
  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        align-items: center;
        padding: 1rem;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(6, 1fr);
          grid-gap: 1rem;
        `}
      >
        {wordles.map((word, idx) => (
          <WordRow word={word} key={idx} />
        ))}
      </div>
    </div>
  )
}

export default GameBoard
