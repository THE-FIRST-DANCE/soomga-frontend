import { styled } from 'styled-components'

const PostCard = ({ ...props }) => {
  return (
    <>
      <Layout>
        <Image>
          <img src={props.postInfo.img} alt="" />
        </Image>
        <ContentWrapper>
          <PostTitle>{props.postInfo.regionName}</PostTitle>
          <PostSubTitle>{props.postInfo.subtitle}</PostSubTitle>
          <TagContainer>
            {props.postInfo.tag.map((tag: string) => (
              <Tag>{`#${tag}`}</Tag>
            ))}
          </TagContainer>
          <UserContainer>
            <UserImg>
              <img src={props.postInfo.guideImg} alt="" />
            </UserImg>
            <UserName>{props.postInfo.username}</UserName>
            <Date>{props.postInfo.date}</Date>
          </UserContainer>
        </ContentWrapper>
      </Layout>
    </>
  )
}

export default PostCard

const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

// const Layout = styled(FlexCenterd)`
const Layout = styled.div`
  /* background-color: mediumaquamarine; */
  width: 100%;
  height: 8.5rem;
  margin-bottom: 2rem;
  display: flex;
  border-radius: 0.3rem;
  box-shadow: 1px 1px 1px gray;
`

const Image = styled.div`
  width: 10rem;
  height: 8.5rem;
  border-radius: 3%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`

const ContentWrapper = styled.div`
  width: 20rem;
  background-color: #fff;
  /* margin-left: 1rem; */
  padding: 0.5rem 1rem;
  box-sizing: border-box;
`

const PostTitle = styled.div`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`
const PostSubTitle = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin-bottom: 0.5rem;
`
const TagContainer = styled(FlexCenterd)`
  /* background-color: mediumaquamarine; */
  justify-content: flex-start;
  /* margin: 0.8rem 0; */
`

const Tag = styled(FlexCenterd)`
  font-size: 0.5rem;
  min-width: 3rem;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  border-radius: 3rem;
  /* background-color: #cfcfcf85; */
  border: 0.1rem solid black;
  margin: 0.2rem 0.2rem;
`

const UserContainer = styled(FlexCenterd)`
  justify-content: flex-start;
  /* background-color: royalblue; */
  margin-top: 0.5rem;
`

const UserImg = styled.div`
  width: 1.5rem;
  height: 1.5rem;
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
  font-size: 1rem;
  width: 3rem;
  margin-right: 1rem;
  position: relative;
  top: 2px;
`

const Date = styled(FlexCenterd)`
  font-size: 1rem;
`
