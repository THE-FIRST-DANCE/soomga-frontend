import PlanLeftTab from './PlanLeftTab'
import { CurrentPeriod, PlanInfo } from 'state/store/PlanInfo'
import styled from 'styled-components'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import PlanEditItem from './PlanEditItem'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { getPlaceRouteEdit } from 'api/PlanAPI'
import FullLoading from 'components/shared/FullLoading'
import { PlanConfirmList, PlanPlaceBox } from 'state/store/PlanList'
import PlaceSelect from './place/PlaceSelect'
import PlaceEditAddItem from './place/PlaceEditAddItem'
import { PlanConfirmListItem, PlanConfirmPeriodList } from 'interfaces/plan'

interface PlanEditProps {
  data: PlanConfirmPeriodList
  info: PlanInfo
  handleEdit: () => void
  transport: string
}

const PlanEdit = ({ data, info, handleEdit, transport }: PlanEditProps) => {
  const currentPeriod = useRecoilValue(CurrentPeriod) // 현재 일차
  const setPlanConfirmList = useSetRecoilState(PlanConfirmList) // 여행 컨펌 리코일 상태
  const planPlaceBox = useRecoilValue(PlanPlaceBox) // 여행장소 추가할 때 장소 저장 리스트

  const [planList, setPlanList] = useState(data[currentPeriod] || []) // 현재 일차의 여행 리스트
  const [allPeriodsData, setAllPeriodsData] = useState<PlanConfirmPeriodList>(data) // 모든 일차의 여행 리스트
  const [isLoading, setIsLoading] = useState<boolean>(false) // 로딩 상태
  const [placeAddMode, setPlaceAddMode] = useState<boolean>(false) // 여행지 추가 모드

  // 현재 일차의 여행 리스트 업데이트
  useEffect(() => {
    setPlanList(data[currentPeriod] || [])
  }, [data, currentPeriod])

  // 여행 리스트 업데이트
  const updatePlanList = (updatedPlanList: PlanConfirmListItem[]) => {
    setPlanList(updatedPlanList)
    setAllPeriodsData({
      ...allPeriodsData,
      [currentPeriod]: updatedPlanList,
    })
  }

  // 드래그 앤 드랍 이벤트
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

  // 여행 리스트에서 아이템 삭제
  const itemRemove = (index: number) => {
    index = index - 1
    const items = Array.from(planList)
    items.splice(index, 1)

    updatePlanList(items)
  }

  // 수정 완료
  const onNext = async () => {
    setIsLoading(true)

    let updatedData: { [key: string]: PlanConfirmListItem[] } = {}

    for (const period in allPeriodsData) {
      const periodData = allPeriodsData[period].map((item) => ({
        item: item.item,
        order: 0,
        stayTime: item.stayTime,
        checked: false,
      }))

      try {
        const response = await getPlaceRouteEdit({
          planList: { [period]: periodData },
          transport: transport,
        })

        updatedData[period] = response[period]
      } catch (error) {
        console.error(error)
      }
    }

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
      <PlanLeftTab period={Object.keys(data).length} onNext={onNext} onPrev={onPrev} nextText="수정" prevText="취소" />
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
  width: 8 0%;
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
