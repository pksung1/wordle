import { GameBoard, Header, Keyboard } from '@/components/containers'
import { ThemeProvider, css } from '@emotion/react'
import { RecoilRoot } from 'recoil'

import { useLayoutEffect } from 'react'

const theme = {
  color: {
    bg: '#000000',
    text: '#FFFFFF',
  },
}

function App() {
  useLayoutEffect(() => {
    document.body.setAttribute('style', `background-color: ${theme.color.bg}`)
  }, [])

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Header />
        <main
          css={css`
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            background: ${theme.color.bg};
            color: ${theme.color.text};
          `}
        >
          <section
            css={css`
              width: 100%;
              max-width: 30rem;
              display: flex;
              flex-direction: column;
              flex: 1;
              margin: 0 auto;
            `}
          >
            <GameBoard />
            <Keyboard />
          </section>
        </main>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
