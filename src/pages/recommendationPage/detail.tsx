import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useParams } from 'react-router-dom'
import { Tourist } from 'interfaces/tourist'
import { useQuery } from '@tanstack/react-query'
import { getTouristDetail } from 'api/TouristAPI'
import useFormatDate from 'hooks/useFormatDate'
import useFirstImage from 'hooks/useFirstImage'

const RegionDetailPage = () => {
  const { detail_Id } = useParams<{ detail_Id: string }>()
  const [postInfo, setPostInfo] = useState<Tourist>()
  const formatDate = useFormatDate({
    date: postInfo?.createdAt,
    formatType: 'yyyy .MM .dd',
  })
  const mainImage = useFirstImage(postInfo?.content as string)

  const { data } = useQuery({
    queryKey: ['touristDetail', detail_Id],
    queryFn: () => getTouristDetail(Number(detail_Id)),
  })

  useEffect(() => {
    if (data) {
      setPostInfo(data)
    }
  }, [data])

  return (
    <>
      <Header>
        {mainImage.length !== 0 ? (
          <img src={mainImage[0].url} alt="main" />
        ) : (
          <img
            src="https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"
            alt="main"
          />
        )}
        <Info>
          <Title>{postInfo?.title}</Title>
          <Tags>{postInfo?.tags.map((tag) => <Tag key={tag.tag.id}>#{tag.tag.name}</Tag>)}</Tags>
          <User>
            <UserImg>
              <img src={postInfo?.author.avatar} alt="user" />
            </UserImg>
            <div>{postInfo?.author.nickname}</div>
            <Time>{formatDate}</Time>
          </User>
        </Info>
      </Header>
      <Container>
        <Content dangerouslySetInnerHTML={{ __html: postInfo?.content as string }} />
      </Container>
    </>
  )
}

export default RegionDetailPage

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  background-color: var(--bs-gray-100);
  padding: 2rem;
`

const Header = styled.div`
  width: 100%;
  height: 25rem;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 2rem;
  width: 768px;
  height: 8rem;
  border-radius: 1rem 1rem 0 0;
  z-index: 2;
  background-color: var(--bs-white);

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
`

const Tag = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--bs-gray-300);
`

const User = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const UserImg = styled.div`
  width: 2rem;
  height: 2rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`

const Time = styled.div`
  font-size: 0.8rem;
  color: var(--bs-gray-500);
`

const Content = styled.div`
  margin-top: 2rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  .ql-align-center {
    text-align: center;
  }
`
