import { atom, selector, selectorFamily } from 'recoil'
import { convertWordleCharList, convertWordleText } from './utils'

/**
 * 현재의 wordle의 rowIndex입니다.
 */
export const rowIndexState = atom({
  key: 'rowIndexState',
  default: 0,
})

/**
 * CORRECT : 위치, 문자 정답
 * ONLY_WORD_CORRECT : 문자만 정답
 * NO : 위치, 문자 틀림
 * NOT_YET : 아직 검사안함
 */
export type CorrectType = 'CORRECT' | 'ONLY_WORD_CORRECT' | 'NO' | 'NOT_YET'

export type ValidType = Array<{
  word: string
  correct: CorrectType
}> | null

/**
 * 각 row의 상태를 가지고 있습니다.
 */
export const wordleState = atom<Array<ValidType>>({
  key: 'wordleState',
  default: [null, null, null, null, null, null],
})

/**
 * READY : 입력 가능한 상태
 * CHECKING : 체크중
 * VALID_ANIMATION : validation 애니메이션 처리
 * FAIL : 모든 기회를 날려버리고.. 실패!
 * SUCCESS : 성공
 */
export type IDLE =
  | 'READY'
  | 'CHECKING'
  | 'NOT_WORDLE'
  | 'VALID_ANIMATION'
  | 'FAIL'
  | 'SUCCESS'

/**
 * 게임의 상태를 가지고 있습니다.
 */
export const gameStatusState = atom<IDLE>({
  key: 'gameStatusState',
  default: 'READY',
})

// SELECTOR

/**
 * 현재 row의 wordle의 Array<validType> 가져올수 있습니다.
 */
export const getCurrentWordle = selector({
  key: 'currentWordle',
  get: ({ get }) => {
    const wordles = get(wordleState)
    const index = get(rowIndexState)

    return wordles[index]
  },
})

/**
 * 현재 row의 wordle을 문자열을 가져올수 있습니다.
 */
export const getCurrentWordleText = selector({
  key: 'currentWordleText',
  get: ({ get }) => {
    const wordles = get(wordleState)
    const index = get(rowIndexState)

    return wordles[index]?.map((wordle) => wordle.word).join('') ?? ''
  },
})

/**
 * rowIndex를 받아 해당 rowIndex의 텍스트를 가져올수 있습니다.
 */
export const getWordRowText = selectorFamily({
  key: 'getWordRowText',
  get:
    (rowIndex: number) =>
    ({ get }) => {
      return convertWordleText(get(wordleState)[rowIndex])
    },
})

/**
 * rowIndex를 받아 해당 rowIndex의 Array<validType> 을 가져올수 있습니다.
 */
export const getWordRowValid = selectorFamily({
  key: 'getWordRowValid',
  get:
    (rowIndex: number) =>
    ({ get }) => {
      return get(wordleState)[rowIndex]
    },
})

/**
 * gameStatus에 따른 row의 상태를 가져올수있습니다.
 * 다른 row의 애니메이션을 막기 위해 추가했습니다.
 */
export const getRowStatus = selectorFamily({
  key: 'getRowStatus',
  get:
    (rowIndex: number) =>
    ({ get }) => {
      const currentRowIndex = get(rowIndexState)
      if (rowIndex === currentRowIndex) {
        return get(gameStatusState)
      }
      return 'READY'
    },
})
