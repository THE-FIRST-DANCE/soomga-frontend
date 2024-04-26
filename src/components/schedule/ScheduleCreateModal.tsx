import Modal from 'components/shared/Modal'
import styled from 'styled-components'
import { memo } from 'react'

import 'react-datepicker/dist/react-datepicker.css'
import Check from 'components/icons/Check'
import Cancel from 'components/icons/Cancel'
import { useQueryClient } from '@tanstack/react-query'
import { EventData } from 'interfaces/event'
import DescriptionEditor from './DescriptionEditor'
import TimeSectionComponent from './TimeSection'
import { Plans } from 'interfaces/plan'
import { getPlanByUserId } from 'api/PlanAPI'
import Arrow from 'components/icons/Arrow'
import SchedulePlans from './SchedulePlans'
import { useEventModal } from 'hooks/event/useEventForm'

interface EventModalProps {
  isOpen: boolean
  onRequestClose: () => void
  editEvent?: EventData
  selectedDate: Date
}

const CreateEventModal = ({ isOpen, onRequestClose, editEvent, selectedDate }: EventModalProps) => {
  const {
    title,
    setTitle,
    allDay,
    setAllDay,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setDesc,
    description,
    setDescription,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    onEventAddHandler,
    plans,
    setPlans,
    openPlanList,
    setOpenPlanList,
    selectedPlan,
    setSelectedPlan,
    toggleSetDesc,
  } = useEventModal({ onRequestClose, editEvent, selectedDate })

  const queryClient = useQueryClient()

  const onPlanAddHandler = async (userId: number) => {
    await queryClient.prefetchQuery({
      queryKey: ['plans', userId],
      queryFn: () => getPlanByUserId(userId),
    })

    const plan = queryClient.getQueryData<Plans[]>(['plans', userId])

    if (plan) {
      setPlans(plan)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: 'fit-content',
        },
      }}
    >
      <EventModalContainer>
        {/* 헤더 */}
        <ModalHeader>
          <ModalClose onClick={onRequestClose}>
            <Cancel style={{ width: '1.5rem', height: '1.5rem' }} />
          </ModalClose>
        </ModalHeader>

        {/* 타이틀 입력 */}
        <EventModalTitle>
          <EventModalInput
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </EventModalTitle>

        {/* 바디 */}
        <EventModalBody>
          {/* 시간 설정 */}
          <TimeSection>
            {/* 시간, 날짜 설정 */}
            <TimeSectionComponent
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              allDay={allDay}
              setAllDay={setAllDay}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
          </TimeSection>

          {/* 설명 입력 */}
          <IconText>
            <EventIcon>
              <Check style={{ width: '1rem', height: '1rem' }} />
            </EventIcon>
            {setDesc ? (
              <DescriptionEditor value={description} onChange={setDescription} />
            ) : (
              <ClickItem onClick={toggleSetDesc}>Description</ClickItem>
            )}
          </IconText>

          {/* 플랜 등록 */}
          <IconText>
            <EventIcon>
              <Check style={{ width: '1rem', height: '1rem' }} />
            </EventIcon>
            {plans.length > 0 ? (
              <ClickItem
                onClick={() => {
                  setOpenPlanList((prev) => !prev)
                }}
              >
                {selectedPlan ? selectedPlan.title : '플랜 선택'}
                <div
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Arrow $width="1rem" $height="1rem" $angle="90deg" />
                </div>
                {openPlanList && (
                  <DropDown>
                    {plans.map((plan) => (
                      <SchedulePlans key={plan.id} plan={plan} setSelectedPlanId={setSelectedPlan} />
                    ))}
                  </DropDown>
                )}
              </ClickItem>
            ) : (
              <ClickItem
                onClick={() => {
                  onPlanAddHandler(2) // TODO: 로그인 정보로 대체
                }}
              >
                플랜
              </ClickItem>
            )}
          </IconText>
        </EventModalBody>

        {/* 저장 */}
        <Footer>
          <SaveButton onClick={onEventAddHandler}>Save</SaveButton>
        </Footer>
      </EventModalContainer>
    </Modal>
  )
}

export default memo(CreateEventModal)

const EventModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 2rem 3rem;
  border-radius: 10px;
`

const ModalHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  background-color: var(--bs-gray-200);
`

const ModalClose = styled.div`
  cursor: pointer;
`

const EventModalTitle = styled.div`
  display: flex;
  flex: 1 1 auto;
  margin: 0 16px;
  padding: 8px 0 0 52px;
  margin-top: 1rem;
`

const EventModalInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ced4da;
  font-size: 1.2em;
  transition: border-bottom 0.3s;

  &:focus {
    outline: none;
    border-bottom: 2px solid #007bff;
  }
`

const EventModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 2rem 0;
`

const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const IconText = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  margin: 0 10px;
  position: relative;
`

const EventIcon = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 6px;
`

const ClickItem = styled.div`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  margin: 0 10px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e9ecef;
  }
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
`

const SaveButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-primary);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--bs-gray-400);
  }
`

const DropDown = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #f8f9fa;
  padding: 10px;
  gap: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;

  ::-webkit-scrollbar {
    display: none;
  }
`
