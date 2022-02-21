import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { currentWordleIndexState, wordleState } from './atoms'
import { getCurrentWordle } from './select'

/**
 * Wordle 키입력 이벤트를 처리하는 부분
 */
const useUpdateWordle = () => {
  const [wordles, setWordles] = useRecoilState(wordleState)
  const [currentWordleIndex, setCurrentWordleIndex] = useRecoilState(
    currentWordleIndexState
  )
  const currentWordle = useRecoilValue(getCurrentWordle)

  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase()
    let nextWordle = currentWordle
    if (key.length === 1 && 'A' <= key && key <= 'Z') {
      nextWordle = (currentWordle + key).slice(0, 5)
    } else if (key === 'BACKSPACE') {
      nextWordle = currentWordle.slice(0, currentWordle.length - 1)
    } else if (key === 'ENTER' && currentWordleIndex < 5) {
      setCurrentWordleIndex(currentWordleIndex + 1)
    }

    const nextWordles = [...wordles]
    nextWordles[currentWordleIndex] = nextWordle
    setWordles(nextWordles)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentWordle, currentWordleIndex])

  return { handleKeyPress }
}

export { useUpdateWordle }
