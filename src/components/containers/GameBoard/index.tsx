import { wordleState } from '@/store/atoms'
import { useUpdateWordle } from '@/store/hooks'
import { css, useTheme } from '@emotion/react'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'

type WordRowProps = {
  word: string
}
const _WordRow: React.FC<WordRowProps> = ({ word }) => {
  const theme = useTheme()
  const wordArray = word.padEnd(5).split('')

  return (
    <>
      {wordArray.map((w, idx) => (
        <div
          key={w + idx}
          css={css`
            aspect-ratio: 1;
            box-sizing: border-box;
            border: 0.1rem solid ${theme.color.text};
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
          `}
        >
          {w}
        </div>
      ))}
    </>
  )
}

// 메모라이징으로 불필요한 렌더링을 줄임
const WordRow = memo(_WordRow, (prevProp, nextProp) => {
  return nextProp.word === prevProp.word
})

const GameBoard = () => {
  const theme = useTheme()
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
          <WordRow word={word} key={word + idx} />
        ))}
      </div>
    </div>
  )
}

export default GameBoard
