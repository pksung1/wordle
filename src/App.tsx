import { GameBoard, Header, Keyboard } from '@/components/containers'
import { ThemeProvider, css } from '@emotion/react'


const theme = {
  color: {
    bg: '#000000',
    text: '#FFFFFF',
  },
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <main css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background: ${theme.color.bg};
        color: ${theme.color.text};
      `}>
        
        <Header />
        <section css={css`
          width: 100%;
          max-width: 30rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          margin: 0 auto;
        `}>
          <GameBoard />
          <Keyboard />
        </section>
      </main>
    </ThemeProvider>
  )
}

export default App
