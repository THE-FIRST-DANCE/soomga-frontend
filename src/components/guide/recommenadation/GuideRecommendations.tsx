import Modal from 'components/shared/Modal'
import useClickOutsideToggle from 'hooks/useClickOutsideToggle'

const GuideRecommendations = () => {
  const { isOpen, handleOnClick, refForToggle } = useClickOutsideToggle()
  return (
    <>
      <button onClick={handleOnClick}></button>
      <div>
        <Modal isOpen={isOpen} onRequestClose={() => {}}>
          <h1>Recommendations</h1>
        </Modal>
      </div>
    </>
  )
}

export default GuideRecommendations
