import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPlanComment, deletePlanComment } from 'api/PlanAPI'
import Arrow from 'components/icons/Arrow'
import PlanDetailItem from 'components/planner/PlanDetailItem'
import { AnimatePresence, motion } from 'framer-motion'
import { PlanComment, dayPlan } from 'interfaces/plan'
import { useRef, useState } from 'react'
import styled from 'styled-components'

export const PlanDetailPlanTab = ({ item }: { item: dayPlan[] }) => {
  const [collapsed, setCollapsed] = useState<{ [key: number]: boolean }>({})

  const toggleDay = (id: number) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Container>
      {item.map((day) => (
        <Schedule key={day.id}>
          <Header onClick={() => toggleDay(day.id)}>
            {day.day}일차
            <Arrow $width="2rem" $height="2rem" $angle={collapsed[day.id] ? '90deg' : '270deg'} />
          </Header>
          <AnimatePresence>
            {!collapsed[day.id] && (
              <motion.div
                initial={{ maxHeight: 0, overflow: 'hidden' }}
                animate={{ maxHeight: 2000 }}
                exit={{ maxHeight: 0 }}
                transition={{ duration: 1 }}
              >
                {day.schedules.map((schedule, index) => (
                  <PlanDetailItem key={index} item={schedule} isLast={index === day.schedules.length - 1} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Schedule>
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
  width: 100%;
`

const Schedule = styled(motion.div)`
  border: 1px solid var(--bs-gray-200);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const Header = styled.div`
  padding: 1rem 1.5rem;
  background-color: var(--color-primary);
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export const PlanDetailCommentsTab = ({
  comments,
  planId,
}: {
  comments: PlanComment[] | undefined
  planId: number | undefined
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [text, setText] = useState<string>('')
  const queryClient = useQueryClient()

  const { mutate: addComment } = useMutation({
    mutationFn: addPlanComment,
    onSettled: () => {
      setText('')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['planDetail', String(planId)],
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const { mutate: deleteComment } = useMutation({
    mutationFn: deletePlanComment,
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries({
        queryKey: ['planDetail', String(planId)],
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const onAddComment = () => {
    const planCommentDto = {
      planId: planId as number,
      content: text,
      memberId: 1,
    }

    addComment(planCommentDto)
  }

  const onDeleteComment = (commentId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?') === false) return

    deleteComment(commentId)
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value)
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }

  return (
    <CommentsContainer>
      <CommentInput>
        <CommentInputUser src="https://picsum.photos/200" />
        <CommentInputText ref={textareaRef} onChange={onChange} value={text} placeholder="댓글을 입력해주세요" />
        <CommentButton
          onClick={() => {
            onAddComment()
          }}
        >
          <Arrow $width="1.5rem" $height="1.5rem" $angle="270deg" />
        </CommentButton>
      </CommentInput>
      <CommentHeader>Comments</CommentHeader>

      <CommentList>
        {comments?.map((comment) => (
          <Comment key={comment?.id}>
            <CommentUser>
              <CommentInputUser src="https://picsum.photos/200" />
              <UserName>{comment?.member.nickname}</UserName>
            </CommentUser>
            <CommentText>{comment?.content}</CommentText>
            <Delete
              onClick={() => {
                onDeleteComment(comment.id)
              }}
            >
              삭제
            </Delete>
          </Comment>
        ))}
      </CommentList>
    </CommentsContainer>
  )
}

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--bs-gray-200);
`

const CommentInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--bs-gray-200);
  border-radius: 1rem;
`

const CommentInputUser = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`

const CommentInputText = styled.textarea`
  flex: 1;
  margin: 0 1rem;
  padding: 0.5rem;
  border: none;
  background-color: transparent;
  background-color: var(--bs-gray-100);
  border-radius: 0.5rem;
  box-sizing: border-box;
  line-height: 1.7em;
  height: 3rem;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  overflow: hidden;
  resize: none;

  &:focus {
    outline: none;
  }
`

const CommentButton = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  cursor: pointer;
`

const Comment = styled.div`
  position: relative;
  padding: 1rem;
`

const CommentHeader = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`

const CommentUser = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CommentText = styled.div`
  margin-left: 2rem;
  margin-top: 0.5rem;
  white-space: pre-wrap;
`

const UserName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`

const Delete = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  color: var(--bs-gray-400);
  cursor: pointer;
`

export const PlanDetailReviewTab = () => {
  return <div>PlanDetailReviewTab</div>
}
