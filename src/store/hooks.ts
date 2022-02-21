import { useRecoilState, useRecoilValue } from 'recoil'
import { currentWordleIndexState, gameStatusState, wordleState } from './atoms'
import { getCurrentWordle } from './selector'

type WordleValidResult = Array<{ word: string; correct: boolean }> | false

/**
 * wordle이 맞는지 확인하는 함수입니다. Network 동작이 있을 예정입니다.
 * @param wordle 검사할 wordle 입니다.
 * @returns Promise<Object> valid 결과를 보여줍니다.
 * 단어가 아닐경우 false
 * 단어일경우 Array<{word: string, correct: boolean}> 를 리턴합니다.
 */
function validWordle(wordle: string): Promise<WordleValidResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(wordle)
      resolve(false)
    }, 3000)
  })
}

/**
 * 키 입력 처리 Hooks
 * document의 keydown 이벤트, Keyboard에서 클릭했을때의 이벤트 처리를 합니다.
 */
const useKeyHandler = () => {
  const [wordles, setWordles] = useRecoilState(wordleState)
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState)
  const [currentWordleIndex, setCurrentWordleIndex] = useRecoilState(
    currentWordleIndexState
  )
  const currentWordle = useRecoilValue(getCurrentWordle)
  const handleKeyPress = (e: KeyboardEvent) => {
    if (gameStatus.disabledKeyEvent) {
      return
    }
    const key = e.key.toUpperCase()
    let nextWordle = currentWordle

    // A - Z 키 입력시 해당 단어를 추가합니다.
    if (key.length === 1 && 'A' <= key && key <= 'Z') {
      nextWordle = (currentWordle + key).slice(0, 5)
    }
    // BACKSPACE 클릭시 단어를 하나 지웁니다.
    else if (key === 'BACKSPACE') {
      nextWordle = currentWordle.slice(0, currentWordle.length - 1)
    }
    // 엔터를 클릭하면 단어검증 로직을 수행합니다.
    else if (key === 'ENTER' && currentWordleIndex < 5) {
      // 키 이벤트를 중단합니다.
      setGameStatus({ ...gameStatus, disabledKeyEvent: true })

      validWordle(currentWordle).then((result) => {
        // 단어가 아닌경우 이벤트 처리
        if (result === false) {
          // 키 입력이 가능하게 상태를 바꿉니다.
          setGameStatus({ ...gameStatus, disabledKeyEvent: false })
          return
        }
        // 단어인경우 결과를 보여주는 동작 후, 다음칸에 입력하도록 합니다.
        setCurrentWordleIndex(currentWordleIndex + 1)
      })
    }

    const nextWordles = [...wordles]
    nextWordles[currentWordleIndex] = nextWordle
    setWordles(nextWordles)
  }

  return { handleKeyPress }
}

export { useKeyHandler }
