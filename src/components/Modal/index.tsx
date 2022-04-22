import { PropsWithChildren, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const modalRoot = document.getElementById('modal')

const Modal = ({ children }: PropsWithChildren<any>) => {
  const modalEl = useRef(document.createElement('div'))

  useEffect(() => {
    modalRoot?.appendChild(modalEl.current)
    return () => {
      modalRoot?.removeChild(modalEl.current)
    }
  }, [])

  return createPortal(children, modalEl.current)
}

const DefaultModal = ({ children }: PropsWithChildren<any>) => {
  return <Modal>{children}</Modal>
}

export default DefaultModal
