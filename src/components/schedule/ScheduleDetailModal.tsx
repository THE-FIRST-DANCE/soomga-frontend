import styled from 'styled-components'
import Modal from 'components/shared/Modal'
import { EventData } from 'interfaces/event'
import Edit from 'components/icons/Edit'
import Delete from 'components/icons/Delete'
import Cancel from 'components/icons/Cancel'
import Time from 'components/icons/Time'
import { format } from 'date-fns'
import Description from 'components/icons/Description'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEvent } from 'api/EventAPI'
import DOMPurify from 'dompurify'
import PlanItem from 'components/planner/PlanItem'

interface ScheduleDetailModalProps {
  isOpen: boolean
  onRequestClose: () => void
  event: EventData | undefined
  editMode: (event: EventData) => void
}

const ScheduleDetailModal = ({ event, isOpen, onRequestClose, editMode }: ScheduleDetailModalProps) => {
  const startDate = format(new Date(event?.start || ''), 'yyyy-MM-dd')
  const endDate = format(new Date(event?.end || ''), 'yyyy-MM-dd')

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(event?.description || ''),
  })

  const queryClient = useQueryClient()

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      onRequestClose()
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const onDeleteHandler = () => {
    deleteMutate(event?.id as number)
  }

  const onEditHandler = () => {
    editMode(event as EventData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: '450px',
        },
      }}
    >
      <Container>
        <Header>
          <div onClick={onEditHandler}>
            <Edit style={{ cursor: 'pointer', width: '1rem', height: '1rem' }} />
          </div>
          <div onClick={onDeleteHandler}>
            <Delete style={{ cursor: 'pointer', width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
          </div>
          <Cancel style={{ cursor: 'pointer', width: '1rem', height: '1rem' }} onClick={onRequestClose} />
        </Header>

        <Body>
          <IconText>
            <Icon>
              <Time $width="1rem" $height="1rem" />
            </Icon>
            <div>
              <Title>{event?.title}</Title>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Text>{startDate}</Text>
                <Text>~</Text>
                <Text>{endDate}</Text>
              </div>
            </div>
          </IconText>
          {event?.description && (
            <IconText>
              <Icon>
                <Description style={{ width: '1rem', height: '1rem' }} />
              </Icon>
              <Text dangerouslySetInnerHTML={sanitizedData()} />
            </IconText>
          )}

          {event?.plan && (
            <IconText>
              <Icon>
                <Time $width="1rem" $height="1rem" />
              </Icon>
              <PlanItem data={event.plan} />
            </IconText>
          )}
        </Body>
      </Container>
    </Modal>
  )
}

export default ScheduleDetailModal

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 2rem;
`

const Header = styled.div`
  display: flex;
  position: absolute;
  top: 1rem;
  right: 1rem;
  gap: 0.5rem;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const IconText = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex: 1 1 auto;
  min-height: 2rem;
  box-sizing: border-box;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
`

const Text = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 20px;
`

const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`
