import React, { useRef, useState } from 'react'
import { styled } from 'styled-components'
import seoul from 'assets/regions/seoul.jpeg'
import gyeonggi from 'assets/regions/gyeonggi.jpeg'
import jeonbuk from 'assets/regions/jeonbuk.jpeg'
import jeonnam from 'assets/regions/jeonnam.jpeg'
import chungbuk from 'assets/regions/chungbuk.jpeg'
import chungnam from 'assets/regions/chungnam.jpeg'
import gyeongbuk from 'assets/regions/gyeongbuk.jpeg'
import gyeongnam from 'assets/regions/gyeongnam.jpeg'
import jeju from 'assets/regions/jeju.jpeg'
import { useParams } from 'react-router-dom'
import guideImg from 'assets/guideImg.png'
import Star from 'components/icons/Star'
import Comunication from 'components/icons/Comunication'
import CircleCheck from 'components/icons/CircleCheck'
import Location from 'components/icons/Location'
import CommentIcon from 'components/icons/Comment'
import { toast } from 'react-toastify'

type RegionId = '서울' | '경기' | '전북' | '전남' | '충북' | '충남' | '경북' | '경남' | '제주'

export let postInfo = {
  id: 1,
  regionName: '경기',
  title: '송도 센트럴 파크',
  subtitle: '국제적인 도시의 모던한 풍경을 한층 빛나게 해주는 아름다운 공원',
  tag: ['꽃', '풍경', '김광규', '국제도시'],
  guideImg: guideImg,
  username: '사야카',
  date: '2013.03.16',
  img: [seoul],
  like: 2,
}

const comments = [
  {
    id: 1,
    user: 'Oba honoka',
    country: 'japan',
    star: 4,
    comment: '風に戸惑う弱気な僕は通りすがるあの日の幻影本当は見た目以上涙もろい過去がある',
  },
  {
    id: 2,
    user: 'Yamatsu asuka',
    country: 'japan',
    star: 2,
    comment: '止めど流る清か水よ消せど燃ゆる魔性の火よあんなに好きな女性に出逢う夏は二度とない',
  },
  {
    id: 3,
    user: 'Wada sayaka',
    country: 'japan',
    star: 5,
    comment: '人は誰も愛求めて 闇に彷徨う運命 そして風まかせ oh, my destiny 涙枯れるまで',
  },
  {
    id: 4,
    user: 'Tsuki saeko',
    country: 'japan',
    star: 1,
    comment:
      '見つめ合うと素直にお喋り出来ない 津波のような侘しさに I know... 怯えてる めぐり逢えた瞬間から 魔法が解けない 鏡のような夢の中で 思い出はいつの日も雨',
  },
  {
    id: 5,
    user: 'Hasegawa ryo',
    country: 'japan',
    star: 4,
    comment: '夢が終わり目覚める時深い闇に夜明けが来る本当は見た目以上打たれ強い僕がいる',
  },
  {
    id: 6,
    user: 'Simizu reina',
    country: 'japan',
    star: 5,
    comment: '泣き出しそうな空眺めて 波に漂うカモメ きっと世は情け oh, sweet memory 旅立ちを胸に',
  },
  {
    id: 7,
    user: 'Katou yuu',
    country: 'japan',
    star: 4,
    comment: '人は涙見せずに大人になれない ガラスのような恋だとは I know... 気付いてる',
  },
  {
    id: 8,
    user: 'Suzuki ichiro',
    country: 'japan',
    star: 4,
    comment: '身も心も愛しい女性しか見えない張り裂けそうな胸の奥で悲しみに耐えるのは何故',
  },
  {
    id: 9,
    user: 'Abe kazuki',
    country: 'japan',
    star: 3,
    comment: '見つめ合うと素直に お喋り出来ない 津波のような侘しさに I know... 怯えてる',
  },
  {
    id: 10,
    user: 'Akutagawa saburo',
    country: 'japan',
    star: 4,
    comment:
      'めぐり逢えた瞬間から死ぬまで好きと言って 鏡のような夢の中で 微笑をくれたのは誰 好きなのに泣いたのは何故 思い出はいつの日も... 雨',
  },
]

const RegionDetailPage = () => {
  const { region_Id } = useParams<{ region_Id: RegionId }>()
  console.log('region_Id: ', region_Id)

  // 댓글 더보기
  const [visibleComments, setvisibleComments] = useState(5)
  const ADDCOMMENT = 5 // 기본 갯수
  const showMoreComments = () => {
    setvisibleComments(visibleComments + ADDCOMMENT)
  }

  //  댓글 추가 하기
  const [comment, setComment] = useState('')
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const addComment = () => {
    if (comment === '') {
      return // 아무 글도 없으면 빠꾸
    }
    setComment('')
    commentRef?.current?.focus()
    toast.success('댓글등록 완료')
  }

  // 테스트 데이터
  const regionImages = {
    서울: seoul,
    경기: gyeonggi,
    전북: jeonbuk,
    전남: jeonnam,
    충북: chungbuk,
    충남: chungnam,
    경북: gyeongbuk,
    경남: gyeongnam,
    제주: jeju,
  }

  return (
    <>
      <RegionImg>
        <img src={regionImages[region_Id as RegionId]} alt="" />
        {/* <img src={regionImages[`${region_Id}`]} alt="" /> */}
      </RegionImg>
      <Container>
        <MainBoxContainer>
          {/* 제목 , 가이드 Info */}
          <MainTop>
            <MainTitle>{postInfo.title}</MainTitle>
            <MainSubTitle>{postInfo.subtitle}</MainSubTitle>
            <TagContainer>
              {postInfo.tag.map((tag) => (
                <Tag>{`#${tag}`}</Tag>
              ))}
            </TagContainer>
            <UserContainer>
              <UserImg>
                <img src={postInfo.guideImg} alt="" />
              </UserImg>
              <UserName>{postInfo.username}</UserName>
              <Date>{postInfo.date}</Date>
            </UserContainer>
            {/* 수정 취소 버튼 */}
            <BtnWrapper>
              <Button>수정</Button>
              <Button>삭제</Button>
            </BtnWrapper>
          </MainTop>
          {/* 본문 내용 */}
          <MainContentContainer>
            <MainContentTitle>
              Bueno Clinic - известный музыкальный проект, родом из Польши. Состав коллектива насчитывает всего двух
              молодых людей, но как же они классно зажигают на мировой сцене. Идея создания группы родилась в 2009 году.
              Именно этот период начался с записи такого хита, как "Fall In Love". Следующий сингл "Just a Deal" стал
              самым популярным в польских клубах. И наконец, третьем решающим треком в портфолио ребят стал "Keep Me
              Alive ". После этой сокрушительной атаки по радиоэфиру, Bueno Clinic начало сотрудничество с крупными
              лейблами. Так появилась сегодняшняя клубная новинка " Sex Appeal ". Информации о Bueno Clinic в интернете
              немного, известно, что парней зовут так: Bartłomiej Baka(BARTH BAZZ) и Konrad Jędrocha (CORAGGIO). Барт
              отвечает за стилистику группы, а Конрад является создателем музыки и воплощением медиа-образа коллектива.
              Несколько лет существования, для Bueno Clinic это уже отлично, но впереди у них еще много работы. Каждый
              из них мог стать лучшим в своей карьере, но они объединили усилия, чтобы выстрелить на мировой сцене. 2012
              год позволил ребятам прописаться в хит-параде DFM с треком " Sex Appeal ".
            </MainContentTitle>
          </MainContentContainer>
        </MainBoxContainer>
      </Container>

      {/* 평점 */}
      <RatingContainer>
        {/* 의사소통 , 정확도, 위치 */}
        <RatingBox>
          <RatingTitle>의사소통</RatingTitle>
          <Comunication $width=" 2rem" $height=" 2rem" />
          <RatingNum>4.3</RatingNum>
        </RatingBox>
        <RatingBox>
          <RatingTitle>의사소통</RatingTitle>
          <CircleCheck $width=" 2rem" $height=" 2rem" />
          <RatingNum>4.3</RatingNum>
        </RatingBox>
        <RatingBox>
          <RatingTitle>의사소통</RatingTitle>
          <Location $width=" 2rem" $height=" 2rem" />
          <RatingNum>4.3</RatingNum>
        </RatingBox>
      </RatingContainer>

      {/* 댓글 */}
      <InputContainer>
        <InputComment value={comment} onChange={(e) => setComment(e.target.value)} ref={commentRef} />
        <SubmitBtn onClick={() => addComment()}>
          <CommentIcon $width="2rem" $height="2rem" $hoverColor={`var(--color-original)`} />
        </SubmitBtn>
      </InputContainer>

      <CommentWrapper>
        {/* コメント */}
        {comments.slice(0, visibleComments).map((comment) => {
          return (
            <CommentLayout>
              {/* 이름 + 국정 + 별 + 일자 */}
              <CommentContainer>
                <CommentUserWrapper>
                  <CommentUserName>{comment.user}</CommentUserName>
                  <Country>{comment.country}</Country>
                </CommentUserWrapper>
                <CommentUserWrapper>
                  {/* <CommentUserName>
                    {Array.from({ length: comment.star }, (_, index) => (
                      <Star key={index} width="20px" height="20px" fill="var(--color-primary)" />
                    ))}
                  </CommentUserName> */}
                  {/* <Country>{new Date().toLocaleDateString()}</Country> */}
                </CommentUserWrapper>
              </CommentContainer>
              <Comment>{comment.comment}</Comment>
            </CommentLayout>
          )
        })}
      </CommentWrapper>
      <ButtonWrapper>
        {visibleComments !== comments.length && <ShowMoreButton onClick={showMoreComments}>more</ShowMoreButton>}
      </ButtonWrapper>
    </>
  )
}

export default RegionDetailPage

const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const RegionImg = styled.div`
  margin: auto;
  width: 100%;
  height: 25rem;
  img {
    width: 100%;
    height: 100%;
  }
`

const Container = styled.div`
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* width: 55%; */
  width: 40rem;
  height: 45rem;
  margin: 0 auto;
  /* min-height: 40rem; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* margin-bottom: 1rem; */
`

const MainBoxContainer = styled.div`
  /* background-color: royalblue; */
  width: 100%; // Container의 80%  -> 70%의 80%
  min-height: 25rem;
  position: relative;
  top: -14rem; // MainTop의 height와 일치
`

// 게시글 제목 , 가이드 Info
const MainTop = styled.div`
  background-color: #ffffffc3;
  width: 100%;
  height: 14rem; // MainBoxContainer top 와 일치
  padding: 2rem;
  border-radius: 0.5rem 0.5rem 0 0;
  box-sizing: border-box;
`

const MainTitle = styled.div`
  /* background-color: yellow; */
  width: 100%;
  margin-bottom: 1rem;
  font-size: 2rem;
`
const MainSubTitle = styled.div`
  /* background-color: #6aaa59; */
  width: 100%;
  font-size: 1.2rem;
  color: #575757;
  margin-bottom: 0.5rem;
`
const TagContainer = styled(FlexCenterd)`
  /* background-color: mediumaquamarine; */
  justify-content: flex-start;
  margin: 0.8rem 0;
`

const Tag = styled(FlexCenterd)`
  font-size: 0.8rem;
  min-width: 3rem;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  border-radius: 3rem;
  background-color: #cfcfcf85;
  border: 0.15rem solid black;
  margin: 0.2rem 0.2rem;
`

const UserContainer = styled(FlexCenterd)`
  min-height: 1rem;
  justify-content: flex-start;
  /* background-color: royalblue; */
  margin-top: 0.8rem 0;
`

const UserImg = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 1rem;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 0.3rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  img {
    width: 100%;
    height: 100%;
  }
`
const UserName = styled(FlexCenterd)`
  font-size: 1.2rem;
  width: 3rem;
  margin-right: 1rem;
  position: relative;
  top: 2px;
`

const Date = styled(FlexCenterd)`
  font-size: 1.2rem;
`

const BtnWrapper = styled.div`
  /* background-color: mediumaquamarine; */
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.3rem;
  /* padding: 1rem; */
  /* margin-bottom: 2rem; */
  box-sizing: border-box;
`

const Button = styled(FlexCenterd)`
  cursor: pointer;
  border: none;
  /* background-color: var(--color-original); */
  font-size: 0.8rem;
  width: 2rem;
  height: 0.3rem;
  padding: 1rem 1rem;
  &:hover {
    color: var(--color-original);
  }
`

// 본문 내용
const MainContentContainer = styled.div`
  /* background-color: #f9e935; */
  width: 100%;
  padding: 1rem 2rem;
  line-height: 1.5rem;
  box-sizing: border-box;
  /* margin-bottom: 4rem; */
`

const MainContentTitle = styled(FlexCenterd)`
  /* background-color: red; */
  font-size: 1rem;
  justify-content: flex-start;
  /* margin-bottom: 0.5rem; */
`

/* 평점 */
const RatingContainer = styled(FlexCenterd)`
  /* background-color: #f5892b; */
  /* width: 45rem; */
  height: 18rem;
  min-height: 3rem;
  margin: 0 auto;
  gap: 2.8rem;
`

const RatingBox = styled(FlexCenterd)`
  /* background-color: #f9fe5e; */
  min-height: 3rem;
  border-radius: 0.5rem;
  width: 11rem;
  height: 11rem;
  position: relative;
  flex-direction: column;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.213);
  /* align-items: flex-start; */
`

const RatingTitle = styled(FlexCenterd)`
  position: absolute;
  top: -1.4rem;
  background-color: #fff;
  width: 7rem;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  /* border: 0.2rem solid #c7c6c6; */
`
const RatingNum = styled(FlexCenterd)`
  margin-top: 1rem;
  /* margin-top: 3rem; */
  font-size: 4rem;
  font-weight: bold;
`

const InputContainer = styled(FlexCenterd)`
  /* background-color: #972bf5; */
  width: 40rem;
  height: 3rem;
  min-height: 3rem;
  margin: 0 auto;
  gap: 0.5rem;
  border: 0.1rem solid black;
  border-radius: 0.2rem;
  box-shadow: 3px 3px gray;
  border: 1px solid #ddd;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.355);
`
const InputComment = styled.textarea`
  width: 35.5rem;
  /* height: 2rem; */
  height: 2rem;
  line-height: 1.5;
  border: none;
  /* background-color: red; */
  display: flex; // Flexbox를 사용하여
  align-items: center; // 아이템들을 중앙 정렬
  justify-content: center;
  resize: none;
  padding: 0 0.5rem;
  /* padding: 0.8rem; */
  box-sizing: border-box;
  font-size: 1.3rem;
  max-width: 100%;
  overflow: auto;
  overflow-y: hidden;
  /* border: 1px solid black; */

  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`
const SubmitBtn = styled(FlexCenterd)`
  width: 3.5rem;
  height: 3.5rem;
  border: 0;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
  border-radius: 0.3rem;
  /* border: 0.15rem solid black; */
  /* box-shadow: 2px 2px gray; */
`

/* 코멘트 */
// const CommentWrapper = styled(FlexCenterd)`
const CommentWrapper = styled.div`
  /* background-color: mediumaquamarine; */
  width: 45rem;
  /* width: 100%; */
  /* align-items: start; */
  /* flex-wrap: wrap; */
  margin: auto;

  margin: 3rem auto 0rem;
`
// const MiddleLine = styled.div`
//   position: relative;
//   /* left: 50%; */
//   transform: translateX(10%);
//   /* margin: 0 auto; */
//   display: flex;
//   /* justify-content: flex-start; */
//   /* background-color: #f9fe5e; */
// `

const CommentLayout = styled.div`
  /* width: 30rem; */
  width: 100%;
  height: 7rem;
  /* background-color: #f9fe5e;
  padding: 1.5rem; */
  box-sizing: border-box;
  /* gap: 1rem; */
  /* margin: 0 auto; */
  /* display: flex; */
  /* flex-direction: column; */
`
const CommentContainer = styled.div`
  width: 100%;
  /* background-color: #5efeab; */
  padding: 1rem;
  box-sizing: border-box;
  /* gap: 1rem; */
  display: flex;
  flex-direction: column;
`

const CommentUserWrapper = styled(FlexCenterd)`
  font-size: 1rem;
  justify-content: flex-start;
`
const CommentUserName = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
`
const Country = styled.div`
  font-size: 0.7rem;
`
const Comment = styled.div`
  margin-top: -30px;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 1.5rem;
`
const ButtonWrapper = styled(FlexCenterd)``
const ShowMoreButton = styled(FlexCenterd)`
  width: 5rem;
  height: 2rem;
  margin-bottom: 2rem;
  border: 0;
  color: var(--color-original);
  font-size: 1.5rem;
  cursor: pointer;
`
