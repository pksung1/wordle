import { atom } from 'recoil'

export const wordleState = atom({
  key: 'wordleState',
  default: ['', '', '', '', '', ''],
})

export const currentWordleIndexState = atom({
  key: 'currentWordleIndexState',
  default: 0,
})

export const validState = atom<Array<{
  word: string
  correct: boolean
}> | null>({
  key: 'validState',
  default: null,
})

export type IDLE =
  | 'READY'
  | 'CHECKING'
  | 'NOT_WORDLE'
  | 'CHECK_ANIMATION'
  | 'SUCCESS'
  | 'FAIL'

export const gameStatusState = atom<IDLE>({
  key: 'gameStatusState',
  default: 'READY',
})
