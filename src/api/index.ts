/**
 * https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
 * fetch API 를 활용합니다.
 * 기본으로 제공하는 fetch에 익숙해지고 싶어 react-query나 axios대신 사용합니다.
 */

import { getResponse } from '@/mirageAPI'

/**
 * 워드가 맞는지 확인합니다.
 * @param word 검사할 word입니다.
 * @returns Promise<Response> 를 반환합니다.
 */
function getValidWordle(word: string) {
  // TODO: 실제 서버 연동시 삭제
  if (process.env.NODE_ENV === 'production') {
    const mockResponse: Pick<Response, 'json'> = {
      json: () => Promise.resolve(getResponse(word)),
    }
    return Promise.resolve(mockResponse)
  }
  return fetch(`/api/valid/${word}`, {
    method: 'GET',
    cache: 'no-cache',
  })
}

export { getValidWordle }
