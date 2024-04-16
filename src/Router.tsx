import GuidePage from 'pages/guide'

import PlanConfirm from 'pages/PlanConfirm'

import PlanCreatePage from 'pages/PlanCreatePage'
import PlanPage from 'pages/PlanPage'
import GuideDetailPage from 'pages/guide/detail'
import MainPage from 'pages/home'
import LoginSignupPage from 'pages/login'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { AccessTokenAtom } from 'state/store/AccessTokenAtom'
import RedirectPage from 'pages/redirect'
import ItineraryPage from 'pages/itinerary'
import RecommendatedPostPage from 'pages/recommendationPage'
import RegionsList from 'pages/recommendationPage/regionslist'
import RegionDetailPage from 'pages/recommendationPage/detail'
import SchedulePage from 'pages/schedulePage'
import PostCreate from 'components/recommendations/PostCreate'
import PostEdit from 'components/recommendations/PostEdit'
import MyPage from 'components/myPageCommon'
import RequestGuide from 'components/myPageCommon/RequestGuide'
import { useEffect, useState } from 'react'
import { getCookie } from 'utils/cookie'
import Layout from 'components/Layout'

function LayoutWithRouter() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const Router = () => {
  // 토큰 관리
  // const [recoilToken, setRecoilToken] = useRecoilState(AccessTokenAtom)
  const [recoilToken, setRecoilToken] = useRecoilState(AccessTokenAtom)
  const [isAccessToken, setIsAccessToken] = useState<boolean>()

  const [first, setfirst] = useState()
  console.log('first: ', first)

  /* 🟡🟡🟡 기본적으로 토큰이 들어있는지 토큰 상태를 브라우저에서 가져와서 확인 🟡🟡🟡 */
  useEffect(() => {
    const accessToken = getCookie('accessToken') //! 쿠키에서 엑세스 토근 가져오기
    setIsAccessToken(!!accessToken) //! 토큰 상태를 저장
    // console.log('🌙🌙🌙🌙accessToken: ', accessToken)
    setRecoilToken({ ...recoilToken, token: !!accessToken }) //! 엑세스 토큰 여부에 따라서 리코일에 토큰값 저장
    setfirst(JSON.parse(localStorage.getItem('userInfo') ?? ''))
  }, [recoilToken.token])

  return (
    <>
      <Routes>
        <Route element={<LayoutWithRouter />}>
          {/* 1. 메인  */}
          <Route path="/" element={<MainPage />} />

          {/* 2. 로그인 && 회원가입  */}
          <Route path="/user/:id" element={<LoginSignupPage />} />

          {/* 3. 가이드 */}
          <Route path="/guides" element={<GuidePage />} />
          <Route path="/guides/detail/:id" element={<GuideDetailPage />} />

          {/* {recoilToken.token && ( */}
          {isAccessToken && (
            <>
              {/* 4. 여행일정 */}
              <Route path="/itinerary" element={<ItineraryPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
            </>
          )}
        </Route>

        {/* 5. 여행장소 추천 */}
        <Route path="/recommendations" element={<RecommendatedPostPage />} />
        <Route path="/recommendations/:region_Id" element={<RegionsList />} />
        <Route path="/recommendations/:region_Id/:detail_Id" element={<RegionDetailPage />} />
        {/* FIXME: 라우팅만 처리 */}
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post/edit/:post_Id" element={<PostEdit />} />

        {/* 6. 여행 플래너 생성 */}
        <Route path="/planner" element={<PlanPage />} />
        <Route path="/planner/create" element={<PlanCreatePage />} />
        <Route path="/planner/confirm" element={<PlanConfirm />} />
        <Route path="/planner/confirm/:planId" element={<PlanConfirm />} />

        {recoilToken.token && (
          <>
            {/* 7. 채팅 페이지 */}
            <Route path="/chatting" element={<h1> 채팅 페이지 </h1>} />

            {/* 8. my 페이지  FIXME: 유저 + 가이드 ?  나눠서?? */}
            <Route path="/mypage/info" element={<MyPage />} />
            {/* <Route path="/mypage/review" element={<h1> 리뷰 </h1>} />
            <Route path="/mypage/follwing" element={<h1> 팔로잉 </h1>} />
            <Route path="/mypage/destination" element={<h1> 여행지 </h1>} /> */}

            {/* 9. 가이드 신청 페이지 */}
            <Route path="/mypage/RequestGuide" element={<RequestGuide />} />
          </>
        )}
        <Route path="redirect" element={<RedirectPage />} />
        {/* 예외 발생 시 -> 로그인 시 OR 비로그인시 */}
        {/* {recoilToken ? ( */}
        {isAccessToken ? (
          <Route path="*" element={<Navigate replace to="/" />} />
        ) : (
          <Route path="*" element={<Navigate replace to="/user/login" />} />
        )}
      </Routes>
    </>
  )
}

export default Router
