import ReactModal from 'react-modal'
import styled, { keyframes } from 'styled-components'

const Modal = ({ children, ...props }: ReactModal.Props) => {
  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      height: '100vh',
      zIndex: 10,
      position: 'fixed',
      top: 0,
      left: 0,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      border: 'none',
      ...props.style?.content,
    },
  }

  return (
    <ReactModal
      {...props}
      style={(props.style, customModalStyles)}
      contentElement={(props, children) => <ModalStyle {...props}>{children}</ModalStyle>}
      overlayElement={(props, contentElement) => <div {...props}>{contentElement}</div>}
    >
      {children}
    </ReactModal>
  )
}

export default Modal

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const ModalStyle = styled.div`
  animation: ${fadeIn} 0.3s ease-in-out;
`
