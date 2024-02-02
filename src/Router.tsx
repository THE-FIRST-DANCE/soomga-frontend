import PlanCreatePage from 'pages/PlanCreatePage'
import PlanPage from 'pages/PlanPage'
import { Routes, Route, Navigate } from 'react-router-dom'
const Router = () => {
  return (
    <>
      <Routes>
        {/* 1. 메인  */}
        <Route path="/main" element={<h1>메인</h1>} />

        {/* 2. 로그인 && 회원가입  */}
        <Route path="/login" element={<h1>로그인</h1>} />
        <Route path="/signup" element={<h1>회원 가입 </h1>} />

        {/* 3. 가이드 */}
        <Route path="/guides" element={<h1>가이드 리스트 </h1>} />
        <Route path="/guides/detail/:id" element={<h1>가이드 리스트 </h1>} />

        {/* 4. 여행일정 */}
        <Route path="/itinerary" element={<h1>여행 일정 </h1>} />

        {/* 5. 여행장소 추천 */}
        <Route path="/recommendations" element={<h1> 여행장소 추천 </h1>} />
        <Route path="/recommendations/region/:region_Id" element={<h1> 지역 여행장소 추천 </h1>} />
        <Route path="/recommendations/region/:region_Id/:detail_Id" element={<h1> 여행 장소 상세 </h1>} />

        {/* 6. 여행 플래너 생성 */}
        <Route path="/planner" element={<PlanPage />} />
        <Route path="/planner/create" element={<PlanCreatePage />} />

        {/* 7. 여행 플래너 생성 */}
        <Route path="/chatting" element={<h1> 채팅 페이지 </h1>} />

        {/* 8. SOS 페이지 */}
        <Route path="/sos" element={<h1> SOS 페이지 </h1>} />
        <Route path="/sos/:id" element={<h1> SOS detail 페이지 </h1>} />
        <Route path="/sos/edit" element={<h1> SOS edit 페이지 </h1>} />

        {/* 9. my 페이지  FIXME: 유저 + 가이드 ?  나눠서?? */}
        <Route path="/mypage/info" element={<h1> 기본 정보 </h1>} />
        <Route path="/mypage/review" element={<h1> 리뷰 </h1>} />
        <Route path="/mypage/follwing" element={<h1> 팔로잉 </h1>} />
        <Route path="/mypage/destination" element={<h1> 여행지 </h1>} />

        {/* 예외 발생 시 -> 메인 */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  )
}

export default Router
