import { provinces } from 'data/region'
import useLanguage from 'hooks/useLanguage'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { PlanInfo } from 'state/store/PlanInfo'

const messages = {
  'ko-KR': {
    province: '시/도',
    alert: '모든 항목을 입력해주세요',
    maxDays: '최대 7일까지만 가능합니다',
  },
  'en-US': {
    province: 'province',
    alert: 'Please fill in all fields',
    maxDays: 'Maximum 7 days only',
  },
  'ja-JP': {
    province: '地域',
    alert: 'すべての項目を入力してください',
    maxDays: '最大7日間まで可能です',
  },
}

const useCreatePlan = () => {
  const [language] = useLanguage()
  const message = messages[language]

  const [province, setProvince] = useState<string>(message.province)
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
      alert(message.maxDays)
      return
    }

    if (!planTitle || !province || !period || !lat || !lng) {
      alert(message.alert)
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
