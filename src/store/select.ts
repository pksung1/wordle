import { selector } from 'recoil'
import { currentWordleIndexState, wordleState } from './atoms'

export const getCurrentWordle = selector({
  key: 'currentWordle',
  get: ({ get }) => {
    const wordles = get(wordleState)
    const index = get(currentWordleIndexState)

    return wordles[index]
  },
})
