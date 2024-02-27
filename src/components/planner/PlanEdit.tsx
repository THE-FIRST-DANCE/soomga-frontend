import PlanLeftTab from './PlanLeftTab'
import { CurrentPeriod, PlanInfo } from 'state/store/PlanInfo'
import styled from 'styled-components'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import PlanEditItem from './PlanEditItem'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { getPlaceRouteEdit } from 'api/PlanAPI'
import FullLoading from 'components/shared/FullLoading'
import { PeriodPlanRecoil, PlanConfirmList, PlanListRecoil, PlanPlaceBox } from 'state/store/PlanList'
import PlaceSelect from './place/PlaceSelect'
import PlaceEditAddItem from './place/PlaceEditAddItem'

interface PlanEditProps {
  data: PeriodPlanRecoil
  info: PlanInfo
  handleEdit: () => void
  transport: string
}

const PlanEdit = ({ data, info, handleEdit, transport }: PlanEditProps) => {
  const currentPeriod = useRecoilValue(CurrentPeriod)
  const setPlanConfirmList = useSetRecoilState(PlanConfirmList)
  const planPlaceBox = useRecoilValue(PlanPlaceBox)

  const [planList, setPlanList] = useState(data[currentPeriod] || [])
  const [allPeriodsData, setAllPeriodsData] = useState<PeriodPlanRecoil>(data)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [placeAddMode, setPlaceAddMode] = useState<boolean>(false)

  useEffect(() => {
    setPlanList(data[currentPeriod] || [])
  }, [data, currentPeriod])

  const updatePlanList = (updatedPlanList: PlanListRecoil[]) => {
    setPlanList(updatedPlanList)
    setAllPeriodsData({
      ...allPeriodsData,
      [currentPeriod]: updatedPlanList,
    })
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(planList)
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)

      updatePlanList(items)
    } else if (source.droppableId === 'placeAddSection' && destination.droppableId === 'planList') {
      const sourceItems = Array.from(planPlaceBox)
      const destItems = Array.from(planList)
      const [removedItem] = sourceItems.splice(source.index, 1)

      destItems.splice(destination.index, 0, {
        item: removedItem,
        nextLat: 0,
        nextLng: 0,
        nextPlaceId: 0,
        nextPlaceName: '',
        nextPlaceGoogleId: '',
        nextTime: '',
        stayTime: '1시간 0분',
      })

      updatePlanList(destItems)
    }
  }

  const itemRemove = (index: number) => {
    index = index - 1
    const items = Array.from(planList)
    items.splice(index, 1)

    updatePlanList(items)
  }

  const onNext = async () => {
    setIsLoading(true)

    let updatedData: { [key: string]: PlanListRecoil[] } = {}

    for (const period in allPeriodsData) {
      const periodData = allPeriodsData[period].map((item) => ({
        item: item.item,
        order: 0,
        stayTime: item.stayTime,
        checked: false,
      }))

      const response = await getPlaceRouteEdit({
        planList: { [period]: periodData },
        transport: transport,
      })

      updatedData[period] = response[period]
    }

    console.log(updatedData)

    setIsLoading(false)

    setPlanConfirmList({
      periodPlan: updatedData,
      transport: transport,
      info: info,
    })
    handleEdit()
  }

  const onPrev = () => {
    handleEdit()
  }

  return (
    <Container>
      <PlanLeftTab period={Object.keys(data).length} onNext={onNext} onPrev={onPrev} nextText="저장" prevText="취소" />
      <DragDropContext onDragEnd={onDragEnd}>
        <PlaceAddSection $editMode={placeAddMode}>
          <Title>여행지 박스</Title>
          <AddButton onClick={() => setPlaceAddMode(!placeAddMode)}>여행지 추가</AddButton>
          {placeAddMode ? (
            <PlaceSelect region={info.province} editMode />
          ) : (
            <Droppable droppableId="placeAddSection">
              {(provided) => (
                <div style={{ marginTop: '1rem' }} {...provided.droppableProps} ref={provided.innerRef}>
                  {planPlaceBox.map((item, index) => (
                    <Draggable key={`${item.id}-edit-${index}`} draggableId={`${item.id}-edit-${index}`} index={index}>
                      {(provided) => (
                        <PlaceBoxList
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <PlaceEditAddItem data={item} />
                        </PlaceBoxList>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </PlaceAddSection>

        <LeftSection>
          <Header>
            <Title>{info.title}</Title>
            <Region>{info.province}</Region>
          </Header>
          <Droppable droppableId="planList">
            {(provided, _) => (
              <PlanListDiv {...provided.droppableProps} ref={provided.innerRef}>
                {allPeriodsData[currentPeriod].map((item, index) => (
                  <Draggable key={`${item.item.id}-${index}`} draggableId={`${item.item.id}-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <>
                        <PlanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <PlanEditItem data={item} index={index + 1} onDelete={itemRemove} />
                        </PlanItem>
                        {!snapshot.isDragging && index !== allPeriodsData[currentPeriod].length - 1 && <Line />}
                      </>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </PlanListDiv>
            )}
          </Droppable>
        </LeftSection>
      </DragDropContext>
      {isLoading && <FullLoading isLoading={isLoading} />}
    </Container>
  )
}

export default PlanEdit

const Container = styled.div`
  display: flex;
  width: 100%;
`

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--bs-gray-100);
  padding: 1rem;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Region = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const PlanListDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
`

const PlanItem = styled.div`
  width: 80%;
`
const Line = styled.div`
  width: 1px;
  height: 1.5rem;
  background-color: var(--bs-gray-dark);
`

const PlaceAddSection = styled.div<{ $editMode: boolean }>`
  min-width: ${({ $editMode }) => ($editMode ? '50%' : '30%')};
  display: flex;
  padding: 2rem 1rem;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  background-color: var(--bs-gray-100);
  transition: 0.3s;
`

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 2rem;
  border: 1px solid var(--bs-black);
  box-shadow: var(--bs-box-shadow);
  border-radius: 0.5rem;
  cursor: pointer;
  color: var(--bs-black);
  transition: 0.3s;

  &:hover {
    background-color: var(--bs-gray);
  }
`

const PlaceBoxList = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  overflow-x: auto;
  align-items: center;
  justify-content: center;
`
