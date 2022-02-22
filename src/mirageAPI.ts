import { createServer } from 'miragejs'
import { ValidWordleResponse } from './api/types'
import WORDLES from './assets/wordle.json'

const selectWord = WORDLES[Math.trunc(Math.random() * WORDLES.length)]

createServer({
  routes() {
    this.get('/api/valid/:word', (schema, request) => {
      const word = request.params.word

      const response: ValidWordleResponse = []

      if (selectWord in WORDLES) {
        for (let idx = 0; idx < selectWord.length; idx++) {
          response.push({
            word: word[idx],
            correct: selectWord[idx] === word[idx],
          })
        }
        return response
      } else {
        return false
      }
    })
  },
})
