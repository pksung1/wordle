import { GameBoard, Header, Keyboard } from '@/components/containers'
import { ThemeProvider, css } from '@emotion/react'
import { useKeyHandler } from './store/hooks'
import { useEffect } from 'react'

const theme = {
  color: {
    bg: '#000000',
    text: '#FFFFFF',
  },
}

function App() {
  const { handleKeyPress } = useKeyHandler()

  useEffect(() => {
    document.body.setAttribute('style', `background-color: ${theme.color.bg}`)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
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
  )
}

export default App
