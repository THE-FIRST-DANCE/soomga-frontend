import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { Tourist } from 'interfaces/tourist'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteTouristApi, getTouristDetail, likeTourist, postTouristComment } from 'api/TouristAPI'
import useFormatDate from 'hooks/useFormatDate'
import useFirstImage from 'hooks/useFirstImage'
import HeartIcon from 'components/icons/Heart'
import Comment from 'components/icons/Comment'
import TouristComment from 'components/recommendations/Comment'

const RegionDetailPage = () => {
  const [comment, setComment] = useState<string>('')

  const { detail_Id } = useParams<{ detail_Id: string }>()
  const [postInfo, setPostInfo] = useState<Tourist>()
  const formatDate = useFormatDate({
    date: postInfo?.createdAt,
    formatType: 'yyyy .MM .dd',
  })
  const mainImage = useFirstImage(postInfo?.content as string)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['touristDetail', detail_Id],
    queryFn: () => getTouristDetail(Number(detail_Id)),
  })

  useEffect(() => {
    if (data) {
      setPostInfo(data)
    }
  }, [data])

  const { mutate: deleteTourist } = useMutation({
    mutationFn: () => deleteTouristApi(Number(detail_Id)),
    onSuccess: () => {
      navigate('/recommendations')
    },
    onError: () => {
      alert('삭제에 실패했습니다.')
    },
  })

  const { mutate: postComment } = useMutation({
    mutationFn: (commentDto: { content: string; memberId: number; boardId: number }) => {
      return postTouristComment(commentDto)
    },
    onSuccess: () => {
      setComment('')
      queryClient.invalidateQueries({
        queryKey: ['touristDetail', detail_Id],
      })
    },
    onError: () => {
      alert('댓글 등록에 실패했습니다.')
    },
  })

  const { mutate: likeArticle } = useMutation({
    mutationFn: () => likeTourist(Number(detail_Id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['touristDetail', detail_Id],
      })
    },
  })

  const onDelete = () => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return

    deleteTourist()
  }

  const onEdit = () => {
    navigate(`/post/create/${detail_Id}`)
  }

  const onPostComment = () => {
    if (comment.length === 0) {
      return
    }

    const commentDto = {
      content: comment,
      memberId: 2,
      boardId: Number(detail_Id),
    }

    postComment(commentDto)
  }

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
          <Tools>
            <Tool
              onClick={() => {
                onEdit()
              }}
            >
              수정
            </Tool>
            <Tool onClick={onDelete}>삭제</Tool>
          </Tools>
        </Info>
      </Header>
      <Container>
        <Content dangerouslySetInnerHTML={{ __html: postInfo?.content as string }} />
      </Container>
      <Footer>
        <Buttons>
          <Button
            onClick={() => {
              likeArticle()
            }}
          >
            <HeartIcon style={{ width: '1.2rem', height: '1.2rem' }} />
            <div>{postInfo?._count.likes}</div>
          </Button>
          <Button>
            <Comment $width="1.2rem" $height="1.2rem" />
            <div>{postInfo?._count.comments}</div>
          </Button>
        </Buttons>
        <Comments>
          <CommentHeader>
            <div>댓글</div>
            <div>{postInfo?._count.comments}</div>
          </CommentHeader>

          {postInfo?.comments.map((comment) => (
            <TouristComment key={comment.id} postId={detail_Id} comment={comment} />
          ))}

          <CommentInput>
            <CommentText
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력해주세요"
            />
            <CommentButtonBox onClick={onPostComment}>
              <CommentButton>등록</CommentButton>
            </CommentButtonBox>
          </CommentInput>
        </Comments>
      </Footer>
    </>
  )
}

export default RegionDetailPage

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  background-color: var(--bs-gray-100);
  padding: 2rem;
  box-sizing: border-box;
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

const Tools = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 2;
  display: flex;
  gap: 1rem;
`

const Tool = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: var(--bs-white);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

const Footer = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 1rem;
  padding: 2rem;
`

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--bs-gray-300);
`

const Button = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
`

const Comments = styled.div`
  margin-top: 2rem;
`

const CommentHeader = styled.div`
  display: flex;
  margin-bottom: 2rem;
  font-size: 1.3rem;
  font-weight: bold;
  align-items: center;
  gap: 0.5rem;
`

const CommentInput = styled.div`
  margin-top: 2rem;
`

const CommentText = styled.textarea`
  width: 100%;
  height: 5rem;
  border: 1px solid var(--bs-gray-300);
  border-radius: 0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  resize: none;
  box-sizing: border-box;
`

const CommentButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  cursor: pointer;
`

const CommentButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: 1px solid var(--bs-gray-300);
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2rem;

  &:hover {
    background-color: var(--bs-gray-300);
  }
`
