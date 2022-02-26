import { atom, selector, selectorFamily } from 'recoil'
import { convertWordleCharList, convertWordleText } from './utils'

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

export const gameStatusState = atom<IDLE>({
  key: 'gameStatusState',
  default: 'READY',
})

// SELECTOR

export const getCurrentWordle = selector({
  key: 'currentWordle',
  get: ({ get }) => {
    const wordles = get(wordleState)
    const index = get(rowIndexState)

    return wordles[index]
  },
})

export const getCurrentWordleText = selector({
  key: 'currentWordleText',
  get: ({ get }) => {
    const wordles = get(wordleState)
    const index = get(rowIndexState)

    return wordles[index]?.map((wordle) => wordle.word).join('') ?? ''
  },
})

export const getWordRowText = selectorFamily({
  key: 'getWordRowText',
  get:
    (rowIndex: number) =>
    ({ get }) => {
      return convertWordleText(get(wordleState)[rowIndex])
    },
})

export const getWordRowValid = selectorFamily({
  key: 'getWordRowValid',
  get:
    (rowIndex: number) =>
    ({ get }) => {
      return get(wordleState)[rowIndex]
    },
})

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
