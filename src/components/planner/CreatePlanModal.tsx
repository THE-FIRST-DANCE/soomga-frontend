import Modal from 'components/shared/Modal'
import Cancel from 'components/icons/Cancel'
import styled from 'styled-components'
import { TravelSvg } from './CreatePlan'
import Arrow from 'components/icons/Arrow'
import { provinces } from 'data/region'
import useCreatePlan from 'hooks/plan/useCreatePlan'
import useLanguage from 'hooks/useLanguage'

interface ICreatePlanModal {
  isOpen: boolean
  onRequestClose: () => void
}

const setDate = [
  {
    value: 1,
    label: {
      'ko-KR': '1일',
      'en-US': '1 day',
      'ja-JP': '1日',
    },
  },
  {
    value: 2,
    label: {
      'ko-KR': '2일',
      'en-US': '2 day',
      'ja-JP': '2日',
    },
  },
  {
    value: 3,
    label: {
      'ko-KR': '3일',
      'en-US': '3 day',
      'ja-JP': '3日',
    },
  },
  {
    value: '직접입력',
    label: {
      'ko-KR': '직접 입력',
      'en-US': 'enter',
      'ja-JP': '入力',
    },
  },
]

const messages = {
  'ko-KR': {
    title: '새로운 플래너',
    modalTitle: '플래너 만들기',
    planTitle: '플랜 이름',
    planTitlePlaceholder: '플랜 이름을 입력해주세요',
    provinceTitle: '지역',
    create: '만들기',
    directInput: '직접 입력',
  },
  'en-US': {
    title: 'New Planner',
    modalTitle: 'Create Planner',
    planTitle: 'Plan Name',
    planTitlePlaceholder: 'Please enter plan name',
    provinceTitle: 'Region',
    create: 'Create',
    directInput: 'Enter manually',
  },
  'ja-JP': {
    title: '新しいプラン',
    modalTitle: 'プランナー作成',
    planTitle: 'プラン名',
    planTitlePlaceholder: 'プラン名を入力してください',
    provinceTitle: '地域',
    create: '作成',
    directInput: '直接入力',
  },
}

const CreatePlanModal = ({ isOpen, onRequestClose }: ICreatePlanModal) => {
  const { province, setProvince, openProvince, setOpenProvince, onChange, createPlan, setLat, setLng } = useCreatePlan()
  const [language] = useLanguage()
  const message = messages[language]

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      ariaHideApp={false}
      style={{
        content: {
          maxWidth: '400px',
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
            <ModalTitle>{message.planTitle}</ModalTitle>
          </ModalHeader>

          {/* 플랜 이름 */}
          <ModalBox>
            <ModalInfo>{message.planTitle}</ModalInfo>
            <ModalInput
              name="planTitle"
              required
              type="text"
              placeholder={message.planTitlePlaceholder}
              onChange={onChange}
            />
          </ModalBox>

          {/* 지역 */}
          <ModalBox>
            <ModalInfo>{message.provinceTitle}</ModalInfo>

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
                          setProvince(prov.name[language])
                          setLat(prov.lat)
                          setLng(prov.lng)
                          setOpenProvince(false)
                        }}
                      >
                        {prov.name[language]}
                      </DropdownItem>
                    ))}
                  </ul>
                </Dropdown>
              )}
            </ModalSelect>
          </ModalBox>

          {/* 시간 설정 */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {setDate.map((date, index) => (
              <SetDate key={index}>
                <input type="radio" name="period" value={date.value} onChange={onChange} />
                {date.value === '직접입력' ? (
                  <input
                    style={{
                      width: '100px',
                      height: '40px',
                      padding: '0.5rem',
                      border: '1px solid var(--bs-gray-dark)',
                      borderRadius: '0.5rem',
                      boxSizing: 'border-box',
                    }}
                    type="number"
                    name="date"
                    placeholder={message.directInput}
                    onChange={onChange}
                  />
                ) : (
                  <label
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                    }}
                    htmlFor="date"
                  >
                    {date.label[language]}
                  </label>
                )}
              </SetDate>
            ))}
          </div>

          {/* 완료 버튼 */}
          <ModalButton
            type="button"
            onClick={() => {
              createPlan()
              onRequestClose()
            }}
          >
            {message.create}
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

const SetDate = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`
