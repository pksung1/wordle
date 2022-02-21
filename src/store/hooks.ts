import { useRecoilState, useRecoilValue } from 'recoil'
import { currentWordleIndexState, wordleState } from './atoms'
import { getCurrentWordle } from './select'

/**
 * 키 입력 처리 Hooks
 * document의 keydown 이벤트, Keyboard에서 클릭했을때의 이벤트 처리를 합니다.
 */
const useKeyHandler = () => {
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

  return { handleKeyPress }
}

export { useKeyHandler }
