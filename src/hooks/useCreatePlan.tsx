import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { PlanInfo } from 'state/store/PlanInfo'

const useCreatePlan = () => {
  const [province, setProvince] = useState<string>('시/도')
  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)
  const [openProvince, setOpenProvince] = useState<boolean>(false)

  const [planTitle, setPlanTitle] = useState<string>('')
  const [period, setPeriod] = useState<number>(1)

  const setPlanInfo = useSetRecoilState(PlanInfo)

  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'planTitle') {
      setPlanTitle(value)
    }

    if (name === 'date') {
      setPeriod(Number(value))
    }

    if (name === 'period') {
      setPeriod(Number(value))
    }
  }

  const createPlan = () => {
    if (period > 7) {
      alert('최대 7일까지만 가능합니다')
      return
    }

    if (!planTitle || !province || !period || !lat || !lng) {
      alert('모든 항목을 입력해주세요')
      return
    }

    setPlanInfo({
      title: planTitle,
      province,
      period,
      lat,
      lng,
    })

    navigate('/planner/create')
  }

  return {
    province,
    setProvince,
    openProvince,
    setOpenProvince,
    setPeriod,
    onChange,
    createPlan,
    setLat,
    setLng,
    period,
  }
}

export default useCreatePlan
