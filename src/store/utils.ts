import { IDLE, ValidType } from './atoms'

function convertYetWordleState(wordle: string): ValidType {
  return wordle.split('').map((word) => ({ word, correct: 'NOT_YET' }))
}

function convertWordleCharList(wordle: ValidType): string[] {
  return wordle?.map(({ word }) => word) ?? []
}

function convertWordleText(wordle: ValidType): string {
  return convertWordleCharList(wordle).join('')
}

export { convertYetWordleState, convertWordleCharList, convertWordleText }
