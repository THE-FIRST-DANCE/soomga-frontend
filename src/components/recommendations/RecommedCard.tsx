import { styled } from 'styled-components'

const RecommedCard = ({
  regionInfo,
  navigate,
  guideImg,
  regionImg,
}: {
  regionInfo: any
  navigate: any
  guideImg: string
  regionImg: string
}) => {
  return (
    <PostContainer>
      {/* 1 */}
      <Post
        regionImg={regionImg}
        onClick={() => navigate(`/recommendations/${regionInfo.regionName}/${regionInfo.id}`)}
      >
        <PostLeft>
          <PostLetterContainer>
            <PostTitle>울산 반구대 암각화</PostTitle>
            <PostSubTitle>처용문화제 부터 각양각색, 살아있네 살아있어 </PostSubTitle>
          </PostLetterContainer>
          <UserContainer>
            <UserImg>
              <img src={guideImg} alt="" />
            </UserImg>
            <UserName>사야카</UserName>
            <Date>2024.03.02</Date>
          </UserContainer>
        </PostLeft>
        <PostRight>
          <TagContainer>
            <Tag>{`#${'한강'}`}</Tag>
            <Tag>{`#${'한강'}`}</Tag>
            <Tag>{`#${'한강'}`}</Tag>
            <Tag>{`#${'한강'}`}</Tag>
            <Tag>{`#${'한강'}`}</Tag>
          </TagContainer>
        </PostRight>
      </Post>
    </PostContainer>
  )
}

export default RecommedCard

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PostContainer = styled(FlexCenter)`
  /* background-color: coral; */
  /* width: 100%; */
  width: auto;
  min-height: 10rem;
`

const Post = styled(FlexCenter)<{ regionImg: string }>`
  /* background-color: royalblue; */
  border-radius: 15px;
  /* width: 100%; */
  width: 20rem;
  min-height: 12rem;
  /* max-width: 100%; */
  align-items: flex-end;
  padding: 0.5rem 0 0.5rem 0.5rem;
  box-sizing: border-box;
  background-image: url(${({ regionImg }) => regionImg});
  background-size: cover;
  background-position: center;
  color: #fbfbfbe1;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  &:hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${({ regionImg }) => regionImg});
  }
`

const PostLeft = styled.div`
  /* background-color: #e1be41; */
  flex: 1.5;
`

const PostLetterContainer = styled.div`
  /* background-color: #41e191; */
  /* margin-left: 1rem; */
`
const Title = styled.div`
  /* background-color: #e1ac41; */
  font-size: 1rem;
  /* margin-bottom: 2rem; */
  /* margin-left: 13rem; */
`

const PostTitle = styled(Title)`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  /* margin-left: 0rem; */
`
const PostSubTitle = styled(Title)`
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
  /* margin-left: 0rem; */
`
const UserContainer = styled(FlexCenter)`
  /* background-color: #41e1e1; */
  min-height: 1rem;
  /* padding-left: 1rem; */
  box-sizing: border-box;
  justify-content: flex-start;
`

const UserImg = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  /* margin-right: 1rem; */
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  img {
    width: 100%;
    height: 100%;
  }
`
const UserName = styled(FlexCenter)`
  font-size: 0.7rem;
  width: 3rem;
  /* margin-right: 1rem; */
  position: relative;
  top: 2px;
`

const Date = styled(FlexCenter)`
  font-size: 1rem;
  font-size: 0.7rem;
`
const PostRight = styled(FlexCenter)`
  /* background-color: #41b4e1; */
  /* min-height: 9rem; */
  flex: 1;
`

const TagContainer = styled(FlexCenter)`
  /* padding: 0 1rem; */
  /* box-sizing: border-box; */
  flex-wrap: wrap;
`

const Tag = styled(FlexCenter)`
  min-width: 2rem;
  padding: 0.2rem 0.1rem;
  box-sizing: border-box;
  font-size: 0.7rem;
  border-radius: 3rem;
  background-color: #cfcfcf85;
  margin: 0.2rem 0.2rem;
`
