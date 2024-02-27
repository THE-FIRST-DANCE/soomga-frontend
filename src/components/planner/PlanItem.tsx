import Arrow from 'components/icons/Arrow'
import Time from 'components/icons/Time'
import { provinces } from 'data/region'
import { Plans } from 'interfaces/plan'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { PlanConfirmList, PlanListRecoil } from 'state/store/PlanList'
import styled from 'styled-components'

interface PlanListProp {
  data: Plans
}

const PlanItem = ({ data }: PlanListProp) => {
  const setPlanConfirmList = useSetRecoilState(PlanConfirmList)

  const lat = provinces.find((item) => item.name === data.region)?.lat
  const lng = provinces.find((item) => item.name === data.region)?.lng

  const navigate = useNavigate()

  const onClick = () => {
    const periodPlan: { [key: number]: PlanListRecoil[] } = {}

    data.daySchedules.forEach((item) => {
      periodPlan[item.day] = item.schedules
    })

    console.log(periodPlan)

    setPlanConfirmList({
      periodPlan,
      transport: data.transport,
      info: {
        title: data.title,
        province: data.region,
        lat: lat || 0,
        lng: lng || 0,
        period: data.period,
      },
    })

    navigate('/planner/confirm')
  }

  return (
    <Container>
      <PlanItems onClick={onClick} style={{ cursor: 'pointer' }}>
        <PlanInfo>
          <PlanTitle>{data.title}</PlanTitle>
          <PlanDesc>{data.region}</PlanDesc>
        </PlanInfo>
        <PlanDateBox>
          <Time $width="20px" $height="20px" $color="var(--color-primary)" />
          <PlanDate>{data.daySchedules.length}일</PlanDate>
        </PlanDateBox>
        <Arrow $width="24px" $height="24px" $color="var(--bs-gray-dark)" />
      </PlanItems>
    </Container>
  )
}

export default PlanItem

const Container = styled.div`
  width: 100%;
  height: 3rem;
  border: 1px solid var(--bs-black);
  box-shadow: var(--bs-box-shadow);
  border-radius: 0.5rem;
`

const PlanItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1rem;
`

const PlanTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 1rem;
`

const PlanDesc = styled.div`
  font-size: 14px;
  font-weight: 400;
  height: 100%;
  display: flex;
  align-items: center;
`

const PlanInfo = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`

const PlanDateBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const PlanDate = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--bs-gray);
  margin-left: 0.5rem;
  margin-top: 0.2rem;
`
