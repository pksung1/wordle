import { GameBoard, Header, Keyboard } from '@/containers'
import { ThemeProvider, css, Global } from '@emotion/react'
import { useKeyHandler } from './store/hooks'
import { useEffect } from 'react'
import { SuccessModal, FailModal } from './containers'
import { useRecoilValue } from 'recoil'
import { gameStatusState } from './store/atoms'

const theme = {
  color: {
    bg: '#000000',
    text: '#FFFFFF',
    correct: 'green',
    notCorrect: 'gray',
    onlyPosCorrect: 'yellow',
    modalBg: '#FFFFFF',
  },
}

function App() {
  const { handleKeyPress } = useKeyHandler()
  const gameStatus = useRecoilValue(gameStatusState)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          body {
            background-color: ${theme.color.bg};
          }
          #modal {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
          }
        `}
      />
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
        {gameStatus === 'SUCCESS' && <SuccessModal />}
        {gameStatus === 'FAIL' && <FailModal />}
      </main>
    </ThemeProvider>
  )
}

export default App
