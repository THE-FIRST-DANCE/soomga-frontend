import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTouristComment, editTouristComment } from 'api/TouristAPI'
import Delete from 'components/icons/Delete'
import Edit from 'components/icons/Edit'
import useFormatDate from 'hooks/useFormatDate'
import { CommentType } from 'interfaces/share'
import { useState } from 'react'
import styled from 'styled-components'

const TouristComment = ({ comment, postId }: { comment: CommentType; postId: string }) => {
  const [editComment, setEditComment] = useState<string>(comment.content)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const formatDate = useFormatDate({
    date: comment.createdAt,
    formatType: 'yyyy .MM .dd',
  })

  const { mutate: editCommentMutation } = useMutation({
    mutationFn: () => editTouristComment(comment.id, editComment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['touristDetail', postId],
      })
      setIsEdit(false)
    },
    onError: () => {
      alert('댓글 수정에 실패했습니다.')
    },
  })

  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: () => deleteTouristComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['touristDetail', postId],
      })
    },
    onError: () => {
      alert('댓글 삭제에 실패했습니다.')
    },
  })

  const deleteComment = () => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return

    deleteCommentMutation()
  }

  const handleEditComment = () => {
    if (!window.confirm('댓글을 수정하시겠습니까?')) return

    editCommentMutation()
  }

  return (
    <Container>
      <User>
        <Avatar src={comment.member.avatar} alt="user" />
        <Nickname>{comment.member.nickname}</Nickname>
      </User>

      <Tool>
        <div
          onClick={() => {
            setIsEdit(!isEdit)
          }}
        >
          <Edit
            style={{
              width: '1rem',
              height: '1rem',
              cursor: 'pointer',
            }}
          />
        </div>
        <div
          onClick={() => {
            deleteComment()
          }}
        >
          <Delete
            style={{
              width: '1rem',
              height: '1rem',
              cursor: 'pointer',
            }}
          />
        </div>
      </Tool>

      {
        // 댓글 내용
        !isEdit && <Content>{comment.content}</Content>
      }
      {
        // 댓글 수정
        isEdit && (
          <CommentInput>
            <CommentText
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
              placeholder="댓글을 입력해주세요"
            />
            <CommentButtonBox>
              <CommentButton
                onClick={() => {
                  handleEditComment()
                }}
              >
                등록
              </CommentButton>
            </CommentButtonBox>
          </CommentInput>
        )
      }
      <Time>{formatDate}</Time>
    </Container>
  )
}

export default TouristComment

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  position: relative;
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Avatar = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`

const Nickname = styled.div`
  font-size: 1rem;
  font-weight: 'bold';
`

const Content = styled.div`
  font-size: 1rem;
  margin-top: 0.6rem;
`

const Time = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--bs-gray-500);
`

const Tool = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  display: flex;
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
