import { getValidWordle } from '@/api'
import { insertWordKeyFrame, shakeWord } from '@/components/keyframe'
import { GAME_OPTIONS } from '@/constant'
import { css, SerializedStyles, useTheme } from '@emotion/react'
import { useCallback, useRef } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  gameStatusState,
  rowIndexState,
  wordleState,
  getCurrentWordleText,
  ValidType,
} from './atoms'
import { convertYetWordleState } from './utils'

/**
 * Atoms를 쉽게 다룰수 있는 helper 함수들입니다.
 */
const useAtomHelper = () => {
  const [wordles, setWordles] = useRecoilState(wordleState)
  const rowIndex = useRecoilValue(rowIndexState)

  const resetWordle = useResetRecoilState(wordleState)
  const resetGameStatus = useResetRecoilState(gameStatusState)
  const resetRowIndex = useResetRecoilState(rowIndexState)

  /**
   * atom rowIndex에 값을 업데이트하는 함수입니다.
   * @param wordle ValidType 을 가진 워들을 받습니다.
   */
  const updateCurrentWordle = (wordle: ValidType) => {
    const nextWordles = [
      ...wordles.slice(0, rowIndex),
      wordle,
      ...wordles.slice(rowIndex + 1, wordles.length),
    ]

    setWordles(nextWordles)
  }

  const retryGame = () => {
    resetWordle()
    resetGameStatus()
    resetRowIndex()
  }

  return { updateCurrentWordle, retryGame }
}

/**
 * 키 입력 처리 Hooks
 * document의 keydown 이벤트, Keyboard에서 클릭했을때의 이벤트 처리를 합니다.
 */
const useKeyHandler = () => {
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState)
  const [rowIndex, setRowIndex] = useRecoilState(rowIndexState)
  const currentWordleText = useRecoilValue(getCurrentWordleText)
  const { updateCurrentWordle } = useAtomHelper()

  const handleKeyPress = (e: KeyboardEvent) => {
    // 준비상태가 아니라면 키입력 이벤트를 무시합니다.
    if (gameStatus !== 'READY') {
      return
    }
    const key = e.key.toUpperCase()
    let nextWordleText = currentWordleText

    // A - Z 키 입력시 해당 단어를 추가합니다.
    if (key.length === 1 && 'A' <= key && key <= 'Z') {
      nextWordleText = (currentWordleText + key).slice(0, 5)
      updateCurrentWordle(convertYetWordleState(nextWordleText))
    }
    // BACKSPACE 클릭시 단어를 하나 지웁니다.
    else if (key === 'BACKSPACE') {
      nextWordleText = currentWordleText.slice(0, currentWordleText.length - 1)
      updateCurrentWordle(convertYetWordleState(nextWordleText))
    }
    // 엔터를 클릭하면 단어검증 로직을 수행합니다.
    else if (key === 'ENTER' && rowIndex < GAME_OPTIONS.rowCount) {
      setGameStatus('CHECKING')
      getValidWordle(currentWordleText).then(async (response) => {
        const json = (await response.json()) as ValidType | false

        // 단어가 아닌경우 이벤트 처리
        if (json !== false) {
          setGameStatus('VALID_ANIMATION')
          updateCurrentWordle(json)
          setTimeout(() => {
            if (json?.every(({ correct }) => correct === 'CORRECT')) {
              setGameStatus('SUCCESS')
            } else if (rowIndex + 1 === GAME_OPTIONS.rowCount) {
              setGameStatus('FAIL')
            } else {
              setGameStatus('READY')
              setRowIndex(rowIndex + 1)
            }
          }, 500 * 5)
        } else {
          setGameStatus('NOT_WORDLE')
          setTimeout(() => {
            setGameStatus('READY')
          }, 300)
        }
      })
    }
  }

  return { handleKeyPress }
}

export { useKeyHandler, useAtomHelper }
