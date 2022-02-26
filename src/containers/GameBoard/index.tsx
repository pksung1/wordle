import { Modal, Word } from '@/components'
import { shakeWord } from '@/components/keyframe'
import {
  getRowStatus,
  getWordRowText,
  getWordRowValid,
  rowIndexState,
} from '@/store/atoms'
import { css, SerializedStyles } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

type WordRowProps = {
  rowIdx: number
}
const WordRow = ({ rowIdx }: WordRowProps) => {
  const rowTextList = useRecoilValue(getWordRowText(rowIdx)).padEnd(5).split('')
  const valid = useRecoilValue(getWordRowValid(rowIdx))
  const rowIndex = useRecoilValue(rowIndexState)
  const rowStatus = useRecoilValue(getRowStatus(rowIdx))
  const [parentCss, setParentCss] = useState<SerializedStyles | null>(null)

  useEffect(() => {
    if (rowStatus === 'NOT_WORDLE') {
      setParentCss(
        css`
          animation: ${shakeWord} 0.3s ease;
        `
      )
    }
    return () => {
      setParentCss(null)
    }
  }, [rowStatus, rowIndex])

  return (
    <>
      {rowTextList.map((w, idx) => (
        <Word
          key={w + idx}
          word={w}
          index={idx}
          correct={valid && idx < valid.length ? valid[idx].correct : null}
          parentCss={parentCss}
        />
      ))}
    </>
  )
}

const GameBoard = () => {
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
        <WordRow rowIdx={0} />
        <WordRow rowIdx={1} />
        <WordRow rowIdx={2} />
        <WordRow rowIdx={3} />
        <WordRow rowIdx={4} />
        <WordRow rowIdx={5} />
      </div>
    </div>
  )
}

export default GameBoard
