import { useTheme } from '@emotion/react';
import { css, jsx } from '@emotion/react'



const Header = () => {
  const theme = useTheme();
  return (
    <header css={css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      box-sizing: border-box;
    `}>
      <nav css={css`
        width: 5rem;
        color: ${theme.color.text}
      `}>Menu</nav>
      <div css={css`
        color: ${theme.color.text}
      `}>Wordle</div>
      <div css={css`
        width: 5rem;
        color: ${theme.color.text}
      `}>Setting</div>
    </header>
  )
}
export default Header;