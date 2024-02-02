import { useRecoilState } from 'recoil'
import { planInfo } from 'recoil/atoms/PlanInfo'

const PlanCreatePage = () => {
  const PlanInfo = useRecoilState(planInfo)

  console.log('====================================')
  console.log('PlanInfo', PlanInfo)
  console.log('====================================')

  return <div>PlanCreatePage</div>
}

export default PlanCreatePage
