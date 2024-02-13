import { useRecoilValue } from 'recoil'
import { PlanListConfirm } from 'recoil/atoms/PlanList'

const PlanConfirm = () => {
  const plan = useRecoilValue(PlanListConfirm)

  console.log(plan)

  return <div>PlanConfirm</div>
}

export default PlanConfirm
