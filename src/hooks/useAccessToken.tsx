import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { AccessTokenAtom } from 'state/store/AccessTokenAtom'
import { getCookie } from 'utils/cookie'

const useAccessToken = () => {
  // 토큰 관리
  const [hasAccessToken, setHasAccessToken] = useState(false)
  const [loginClick, setLoginClick] = useState(false)
  const [accessToken, setAccessToken] = useRecoilState(AccessTokenAtom)

  const handleLoginClick = () => {
    setLoginClick((prev) => !prev)
  }

  // 변경되는 토큰 상태 관리
  useEffect(() => {
    const checkAccessToken = async () => {
      const result = await getCookie('accessToken')
      setHasAccessToken(!!result)
      setAccessToken({ token: result })
      console.log('리코일에 저장한 토큰 상태', accessToken)
    }

    checkAccessToken()
  }, [loginClick])

  return { hasAccessToken, loginClick, handleLoginClick, accessToken }
}

export default useAccessToken
