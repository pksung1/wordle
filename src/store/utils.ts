import { ValidType } from './atoms'

// NOT_YET 상태의 워드들을 만들기 위한 함수
function convertYetWordleState(wordle: string): ValidType {
  return wordle.split('').map((word) => ({ word, correct: 'NOT_YET' }))
}

// wordle 은 Array<ValidType> 으로 이루어져있어서 문자로 이루어진 배열을 반환합니다.
function convertWordleCharList(wordle: ValidType): string[] {
  return wordle?.map(({ word }) => word) ?? []
}

// wordle의 문자열을 반환합니다
function convertWordleText(wordle: ValidType): string {
  return convertWordleCharList(wordle).join('')
}

export { convertYetWordleState, convertWordleCharList, convertWordleText }
