import useCreateDescription from 'hooks/useCreateDescription'
import useFirstImage from 'hooks/useFirstImage'
import useFormatDate from 'hooks/useFormatDate'
import { Tourist } from 'interfaces/tourist'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const TouristCard = ({ data }: { data: Tourist }) => {
  const subString = useCreateDescription({ content: data.content })
  const date = useFormatDate({
    date: data.createdAt,
    formatType: 'yyyy .MM .dd',
  })
  const mainImage = useFirstImage(data?.content as string)

  const navigate = useNavigate()

  return (
    <Container
      onClick={() => {
        navigate(`/recommendations/detail/${data.id}`)
      }}
    >
      <CardImg>
        <img
          src={
            mainImage.length !== 0
              ? mainImage[0].url
              : 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png'
          }
          alt="card"
        />
      </CardImg>
      <Overlay />
      <Info>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Title>{data.title}</Title>
          <div>{subString}</div>
        </div>
        <User>
          <UserImg src={data.author.avatar} alt="user" />
          <div>{data.author.nickname}</div>
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--bs-gray-400)',
            }}
          >
            {date}
          </div>
        </User>
      </Info>
      <Tags>
        {data.tags.map((tag) => (
          <Tag key={tag.tag.id}>#{tag.tag.name}</Tag>
        ))}
      </Tags>
    </Container>
  )
}

export default TouristCard

const Container = styled.div`
  height: 20rem;
  position: relative;
  border-radius: 1rem;
  cursor: pointer;
`

const CardImg = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }
`

const Overlay = styled.div`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  width: 100%;
  height: 250px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 0 0 1rem 1rem;
  z-index: 1;
`

const Info = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: var(--bs-white);
`

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const UserImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`

const Tags = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 2;

  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Tag = styled.div`
  background: rgba(237, 237, 237, 0.4);
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  font-size: 1rem;
  color: var(--bs-white);
`
