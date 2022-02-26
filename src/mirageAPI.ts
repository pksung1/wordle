import { createServer } from 'miragejs'
import WORDLES from './assets/wordle.json'
import { ValidType } from './store/atoms'

const selectWord = WORDLES[Math.trunc(Math.random() * WORDLES.length)]
// TODO: 실제 프로덕션에서는 삭제할것
console.log(`정답: ${selectWord}`)
export const getResponse = (word: string): ValidType | false => {
  if (word === selectWord) {
    return word.split('').map((w) => ({ word: w, correct: 'CORRECT' }))
  }

  const compareSelectWords: string[] = selectWord.split('')

  // 문자가 존재하는지 확인
  if (WORDLES.includes(word)) {
    const response: ValidType = word.split('').map((w, idx) => {
      const findIndex = compareSelectWords.indexOf(w)
      if (idx === findIndex) {
        delete compareSelectWords[findIndex]
        return { word: w, correct: 'CORRECT' }
      } else if (findIndex >= 0) {
        delete compareSelectWords[findIndex]
        return { word: w, correct: 'ONLY_WORD_CORRECT' }
      }
      return { word: w, correct: 'NO' }
    })
    return response
  } else {
    return false
  }
}

createServer({
  routes() {
    this.get('/api/valid/:word', (schema, request) => {
      const word = request.params.word.toUpperCase()

      return getResponse(word)
    })
  },
})
