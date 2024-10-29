import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { AccessTokenAtom } from 'state/store/AccessTokenAtom'
import { useEffect, useState, lazy, Suspense } from 'react'
import { getCookie } from 'utils/cookie'
import { GLOBAL_CONFIG } from 'global.config'
import useMetadata from 'hooks/useMetadata'
import Layout from 'components/Layout'
import { getUserInfo } from 'api/LoginSignUp'
import Spinner from 'components/shared/Spinner'

// Lazy loaded components
const MainPage = lazy(() => import('pages/home'))
const LoginSignupPage = lazy(() => import('pages/login'))
const GuidePage = lazy(() => import('pages/guide'))
const GuideDetailPage = lazy(() => import('pages/guide/detail'))
const ItineraryPage = lazy(() => import('pages/itinerary'))
const SchedulePage = lazy(() => import('pages/schedulePage'))
const RecommendatedPostPage = lazy(() => import('pages/recommendationPage'))
const RegionsList = lazy(() => import('pages/recommendationPage/regionslist'))
const RegionDetailPage = lazy(() => import('pages/recommendationPage/detail'))
const PostCreate = lazy(() => import('components/recommendations/PostCreate'))
const PostEdit = lazy(() => import('components/recommendations/PostCreate'))
const PlanPage = lazy(() => import('pages/PlanPage'))
const PlanCreatePage = lazy(() => import('pages/PlanCreatePage'))
const PlanConfirm = lazy(() => import('pages/PlanConfirm'))
const PlanDetailPage = lazy(() => import('pages/PlanDetailPage'))
const MyPage = lazy(() => import('components/myPageCommon'))
const RequestGuide = lazy(() => import('components/myPageCommon/RequestGuide'))
const NotSupport = lazy(() => import('pages/NotSupport/ui/NotSupport'))
const RedirectPage = lazy(() => import('pages/redirect'))

function LayoutWithRouter() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const Router = () => {
  const [recoilToken, setRecoilToken] = useRecoilState(AccessTokenAtom)
  const [isAccessToken, setIsAccessToken] = useState<boolean>()
  const [userInfo, setuserInfo] = useState()

  useMetadata()

  useEffect(() => {
    if (!userInfo) {
      localStorage.setItem('userInfo', JSON.stringify({}))
    }
  }, [userInfo])

  useEffect(() => {
    const accessToken = getCookie('accessToken')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (!userInfo.id && accessToken) {
      const fetchGetUserInfo = async () => {
        const result = await getUserInfo()
        localStorage.setItem('userInfo', JSON.stringify(result))
      }
      fetchGetUserInfo()
      setRecoilToken({ ...recoilToken, token: !!accessToken, name: accessToken })
    }
  }, [])

  useEffect(() => {
    const accessToken = getCookie('accessToken')
    setIsAccessToken(!!accessToken)
    setRecoilToken({ ...recoilToken, token: !!accessToken, name: accessToken })
    setuserInfo(JSON.parse(localStorage.getItem('userInfo') ?? '{}'))
  }, [recoilToken.token])

  const renderRoute = (Component: React.LazyExoticComponent<any>) => (
    <Suspense fallback={<Spinner loading />}>
      <Component />
    </Suspense>
  )

  return (
    <Routes>
      <Route element={<LayoutWithRouter />}>
        <Route path="/" element={renderRoute(MainPage)} />
        <Route path="/user/:id" element={renderRoute(LoginSignupPage)} />

        {GLOBAL_CONFIG.VITE_APP_SERVE_MODE === 'exhibition' ? (
          <Route path="/guides" element={renderRoute(NotSupport)} />
        ) : (
          <>
            <Route path="/guides" element={renderRoute(GuidePage)} />
            <Route path="/guides/detail/:id" element={renderRoute(GuideDetailPage)} />
          </>
        )}

        {isAccessToken && <Route path="/itinerary" element={renderRoute(ItineraryPage)} />}

        <Route path="/schedule" element={renderRoute(SchedulePage)} />
        <Route path="/recommendations" element={renderRoute(RecommendatedPostPage)} />
        <Route path="/recommendations/:region_Id" element={renderRoute(RegionsList)} />
        <Route path="/recommendations/detail/:detail_Id" element={renderRoute(RegionDetailPage)} />
        <Route path="/post/create" element={renderRoute(PostCreate)} />
        <Route path="/post/edit/:post_Id" element={renderRoute(PostEdit)} />
        <Route path="/planner/detail/:planId" element={renderRoute(PlanDetailPage)} />
      </Route>

      <Route path="/planner" element={renderRoute(PlanPage)} />
      <Route path="/planner/create" element={renderRoute(PlanCreatePage)} />
      <Route path="/planner/confirm" element={renderRoute(PlanConfirm)} />
      <Route path="/planner/confirm/:planId" element={renderRoute(PlanConfirm)} />

      {GLOBAL_CONFIG.VITE_APP_SERVE_MODE === 'exhibition' ? (
        <>
          <Route path="/chatting" element={renderRoute(NotSupport)} />
          <Route path="/mypage/info" element={renderRoute(NotSupport)} />
          <Route path="/mypage/RequestGuide" element={renderRoute(NotSupport)} />
        </>
      ) : (
        recoilToken.token && (
          <>
            <Route path="/chatting" element={<h1>채팅 페이지</h1>} />
            <Route path="/mypage/info" element={renderRoute(MyPage)} />
            <Route path="/mypage/RequestGuide" element={renderRoute(RequestGuide)} />
          </>
        )
      )}

      <Route path="redirect" element={renderRoute(RedirectPage)} />
      <Route path="*" element={<Navigate replace to={isAccessToken ? '/' : '/user/login'} />} />
    </Routes>
  )
}

export default Router
