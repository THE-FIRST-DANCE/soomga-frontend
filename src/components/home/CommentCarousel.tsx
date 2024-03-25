import styled from 'styled-components'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

const CommentCarousel = () => {
  /* 📝 임의 데이터 */
  let commentsArr = [
    {
      id: 1,
      user: 'Oba honoka',
      comment: '風に戸惑う弱気な僕は通りすがるあの日の幻影本当は見た目以上涙もろい過去がある',
    },
    {
      id: 2,
      user: 'Yamatsu asuka',
      comment: '止めど流る清か水よ消せど燃ゆる魔性の火よあんなに好きな女性に出逢う夏は二度とない',
    },
    {
      id: 3,
      user: 'Wada sayaka',
      comment: '人は誰も愛求めて 闇に彷徨う運命 そして風まかせ oh, my destiny 涙枯れるまで',
    },
    {
      id: 4,
      user: 'Tsuki saeko',
      comment:
        '見つめ合うと素直にお喋り出来ない 津波のような侘しさに I know... 怯えてる めぐり逢えた瞬間から 魔法が解けない 鏡のような夢の中で 思い出はいつの日も雨',
    },
    {
      id: 5,
      user: 'Hasegawa ryo',
      comment: '夢が終わり目覚める時深い闇に夜明けが来る本当は見た目以上打たれ強い僕がいる',
    },
    {
      id: 6,
      user: 'Simizu reina',
      comment: '泣き出しそうな空眺めて 波に漂うカモメ きっと世は情け oh, sweet memory 旅立ちを胸に',
    },
    {
      id: 7,
      user: 'Katou yuu',
      comment: '人は涙見せずに大人になれない ガラスのような恋だとは I know... 気付いてる',
    },
    {
      id: 8,
      user: 'Suzuki ichiro',
      comment: '身も心も愛しい女性しか見えない張り裂けそうな胸の奥で悲しみに耐えるのは何故',
    },
    {
      id: 9,
      user: 'Abe kazuki',
      comment: '見つめ合うと素直に お喋り出来ない 津波のような侘しさに I know... 怯えてる',
    },
    {
      id: 10,
      user: 'Akutagawa saburo',
      comment:
        'めぐり逢えた瞬間から死ぬまで好きと言って 鏡のような夢の中で 微笑をくれたのは誰 好きなのに泣いたのは何故 思い出はいつの日も... 雨',
    },
  ]

  return (
    <CarouselLayout>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        grabCursor={true}
        loop={true}
        speed={400}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {commentsArr.map((comment) => {
          return (
            <SwiperSlide>
              {/* 1. 코멘트 컨테이너 : 태그 + 코멘트 + 유저이름 */}
              <CommentContainer>
                {/* 1.1 태그 */}
                <Tag>❝</Tag>
                {/* 1.2 코멘트 */}
                <CommentContent>{comment.comment}</CommentContent>
                {/* 1.3 유저이름 */}
                <UserName>{comment.user}</UserName>
              </CommentContainer>
            </SwiperSlide>
          )
        })}
        {/* <Pagination clickable={true} className="custom-pagination" /> */}
      </Swiper>
    </CarouselLayout>
  )
}

export default CommentCarousel
/* ----------------------------- 💅 StyledComponent -----------------------------*/
const CarouselLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  // 네비게이션 색깔 커스터마이징
  .swiper-pagination-bullet {
    background-color: gray;
  }

  .swiper-pagination-bullet-active {
    background-color: #379c8a;
  }
`

// 1. 코멘트 컨테이너 : 태그 + 코멘트 + 유저이름
const CommentContainer = styled.div`
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 70px;
`

// 1.2 코멘트
const CommentContent = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

// 1.3 유저이름
const UserName = styled.div`
  /* font-weight: bold; */
  font-size: 20px;
  margin-top: 30px;
  text-align: center;
  color: #379c8a;
`

// 1.1 태그
const Tag = styled(UserName)`
  font-size: 40px;
  margin-top: 0px;
`
