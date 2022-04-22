import { useAtomHelper } from '@/store/hooks'
import { css, useTheme } from '@emotion/react'
import { Modal } from '@/components'

const SuccessModal = () => {
  const theme = useTheme()
  const { retryGame } = useAtomHelper()

  return (
    <Modal>
      <div
        css={css`
          background: ${theme.color.modalBg};
          max-width: 30rem;
          padding: 1rem 2rem;
          border-radius: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <h3>CONGRATULATIONS</h3>
        <p>문제를 해결하셨습니다!</p>
        <button
          css={css`
            background-color: #fff;
            border: 1px solid #aaa;
          `}
          onClick={() => retryGame()}
        >
          다시하기
        </button>
      </div>
    </Modal>
  )
}

export default SuccessModal
