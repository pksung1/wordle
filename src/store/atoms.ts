import { atom } from 'recoil'

export const wordleState = atom({
  key: 'wordleState',
  default: ['', '', '', '', '', ''],
})

export const currentWordleIndexState = atom({
  key: 'currentWordleIndexState',
  default: 0,
})
