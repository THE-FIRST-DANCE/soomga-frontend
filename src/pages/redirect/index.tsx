import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RedirectPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const redirectUrl = window.sessionStorage.getItem('redirect') || ''
    window.sessionStorage.removeItem('redirect')

    navigate(redirectUrl)
  }, [])

  return <></>
}

export default RedirectPage
