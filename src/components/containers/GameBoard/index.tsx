import {
  checkFrame,
  insertWordKeyFrame,
  shakeWord,
} from '@/components/keyframe'
import { WordBox } from '@/components/styled'
import {
  currentWordleIndexState,
  gameStatusState,
  IDLE,
  validState,
  wordleState,
} from '@/store/atoms'
import {
  css,
  keyframes,
  Keyframes,
  SerializedStyles,
  useTheme,
} from '@emotion/react'
import {
  memo,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

type WordRowProps = {
  word: string
  rowIdx: number
}

const _Word = ({
  fixAnimation,
  animation,
  children,
}: {
  fixAnimation: boolean
  animation: SerializedStyles | null
  children: React.ReactChild
}) => {
  const [currentAnimation, setCurrentKeyframe] =
    useState<SerializedStyles | null>(animation)
  console.log(fixAnimation)

  const onAnimationEnd = () => {
    if (!fixAnimation) {
      setCurrentKeyframe(null)
    }
  }

  useEffect(() => {
    setCurrentKeyframe(animation)
  }, [animation])

  return (
    <WordBox animation={currentAnimation} onAnimationEnd={onAnimationEnd}>
      {children}
    </WordBox>
  )
}

const Word = memo(_Word, (prevProps, nextProps) => {
  return prevProps.animation?.name === nextProps.animation?.name
})

const WordRow = ({ word, rowIdx }: WordRowProps) => {
  const theme = useTheme()
  const wordArray = word.padEnd(5).split('')
  const wordInsertIndex = word.length - 1
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState)
  const currentRow = useRecoilValue(currentWordleIndexState)

  const valids = useRecoilValue(validState)
  const getAnimation = (wordIdx: number): SerializedStyles | null => {
    if (rowIdx === currentRow) {
      if (gameStatus === 'CHECKING') {
        // 네트워크 통신중
      } else if (gameStatus === 'NOT_WORDLE') {
        return css`
          animation: ${shakeWord} 0.3s ease;
        `
      } else if (gameStatus === 'READY' && wordArray[wordIdx] !== ' ') {
        return css`
          animation: ${insertWordKeyFrame} 0.3s ease;
        `
      } else if (gameStatus === 'CHECK_ANIMATION') {
        return css`
          animation: ${checkFrame(
              css`
                background: ${valids[wordIdx].correct
                  ? theme.color.correct
                  : theme.color.notCorrect};
              `
            )}
            1s ease ${wordIdx * 0.5}s;
        `
      }
    }

    return null
  }

  return (
    <>
      {wordArray.map((w, idx) => (
        <Word key={w + idx} animation={getAnimation(idx)} fixAnimation={true}>
          {w}
        </Word>
      ))}
    </>
  )
}

const GameBoard = () => {
  const wordles = useRecoilValue(wordleState)
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState)
  const [currentWordleIndex, setCurrentWordleIndex] = useRecoilState(
    currentWordleIndexState
  )
  useEffect(() => {
    if (gameStatus === 'NOT_WORDLE') {
      setTimeout(() => {
        setGameStatus('READY')
      }, 500)
    } else if (gameStatus === 'CHECK_ANIMATION') {
      // setTimeout(() => {
      //   setGameStatus('READY')
      //   setCurrentWordleIndex(currentWordleIndex + 1)
      // }, 0.5 * 5)
    }
  }, [gameStatus])
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
          <WordRow word={word} key={idx} rowIdx={idx} />
        ))}
      </div>
    </div>
  )
}

export default GameBoard
