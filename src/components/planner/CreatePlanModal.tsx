import Modal from 'components/shared/Modal'
import Cancel from 'components/icon/Cancel'
import styled from 'styled-components'
import { TravelSvg } from './CreatePlan'
import Arrow from 'components/icon/Arrow'
import { provinces } from 'data/region'
import useCreatePlan from 'hooks/useCreatePlan'

interface ICreatePlanModal {
  isOpen: boolean
  onRequestClose: () => void
}

const CreatePlanModal = ({ isOpen, onRequestClose }: ICreatePlanModal) => {
  const { province, setProvince, openProvince, setOpenProvince, onChange, createPlan } = useCreatePlan()

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      ariaHideApp={false}
      style={{
        content: {
          maxWidth: '400px',
          height: '60vh',
        },
      }}
    >
      <CreateModal>
        {/* Cancel 아이콘 */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
          }}
        >
          <Cancel $width="24px" $height="24px" onClick={() => onRequestClose()} />
        </div>

        <form>
          {/* 모달 헤더 */}
          <ModalHeader>
            <TravelSvg width="32px" height="32px" />
            <ModalTitle>새로운 플래너</ModalTitle>
          </ModalHeader>

          {/* 플랜 이름 */}
          <ModalBox>
            <ModalInfo>플랜 이름</ModalInfo>
            <ModalInput
              name="planTitle"
              required
              type="text"
              placeholder="플랜 이름을 정해주세요"
              onChange={onChange}
            />
          </ModalBox>

          {/* 지역 */}
          <ModalBox>
            <ModalInfo>지역</ModalInfo>

            <ModalSelect
              onClick={() => {
                setOpenProvince(!openProvince)
              }}
            >
              <p>{province}</p>
              <Arrow $width="24px" $height="24px" $color="var(--bs-gray-dark)" $angle="90deg" />

              {/* 시/도 선택 */}
              {openProvince && (
                <Dropdown>
                  <ul>
                    {provinces.map((prov) => (
                      <DropdownItem
                        key={prov.id}
                        onClick={() => {
                          setProvince(prov.name)
                          setOpenProvince(false)
                        }}
                      >
                        {prov.name}
                      </DropdownItem>
                    ))}
                  </ul>
                </Dropdown>
              )}
            </ModalSelect>
          </ModalBox>

          {/* 시간 설정 */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <ModalBox>
              <ModalInfo>시작 시간</ModalInfo>
              <ModalInput name="startTime" required type="time" onChange={onChange} />
            </ModalBox>
            <ModalBox>
              <ModalInfo>종료 시간</ModalInfo>
              <ModalInput name="endTime" required type="time" onChange={onChange} />
            </ModalBox>
          </div>

          {/* 완료 버튼 */}
          <ModalButton
            type="button"
            onClick={() => {
              createPlan()
              onRequestClose()
            }}
          >
            만들기
          </ModalButton>
        </form>
      </CreateModal>
    </Modal>
  )
}

export default CreatePlanModal

const CreateModal = styled.div`
  padding: 1rem;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 2rem;
`

const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`

const ModalBox = styled.div`
  width: 100%;
  margin: 1.5rem 0;
`

const ModalInfo = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const ModalInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0.5rem;
  border: 1px solid var(--bs-gray-dark);
  border-radius: 0.5rem;
  box-sizing: border-box;
`

const ModalSelect = styled.div`
  width: 100%;
  height: 40px;
  padding: 0.5rem;
  border: 1px solid var(--bs-gray-dark);
  border-radius: 0.5rem;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 14px;
    color: var(--bs-gray);
  }
`

const ModalButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: var(--color-primary);
  color: #000;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid var(--bs-gray);
  border-radius: 1rem;
  box-sizing: border-box;
  box-shadow: var(--bs-box-shadow);
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ffce00;
  }
`

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid var(--bs-gray-dark);
  border-radius: 0.5rem;
  box-shadow: var(--bs-box-shadow);
  z-index: 10;
  padding: 0.5rem;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 200px;
  cursor: pointer;
`

const DropdownItem = styled.li`
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--bs-gray-light);
  }
`
