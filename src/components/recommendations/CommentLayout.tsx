import Star from 'components/icons/Star'
import React, { useState } from 'react'
import { styled } from 'styled-components'

interface Comment {
  user: string
  country: string
  star: number
  comment: string
}

// interface CommentFormProps {
//   comments: Comment
// }

// const CommentForm = ({ comment }: Comment) => {
//   // 댓글 더보기
//   const [visibleComments, setvisibleComments] = useState(5)
//   const ADDCOMMENT = 5
//   const showMoreComments = () => {
//     setvisibleComments(visibleComments + ADDCOMMENT)
//   }

//   return (
//     <CommentLayout>
//       {/* 이름 + 국정 + 별 + 일자 */}
//       <CommentContainer>
//         <CommentUserWrapper>
//           <CommentUserName>{comment.user}</CommentUserName>
//           <Country>{comment.country}</Country>
//         </CommentUserWrapper>
//         <CommentUserWrapper>
//           <CommentUserName>
//             {Array.from({ length: comment.star }, (_, index) => (
//               <Star key={index} width="20px" height="20px" fill="var(--color-primary)" />
//             ))}
//           </CommentUserName>
//           {/* <Country>{new Date().toLocaleDateString()}</Country> */}
//         </CommentUserWrapper>
//       </CommentContainer>
//       <Comment>{comment.comment}</Comment>
//     </CommentLayout>
//   )
// }

// export default CommentForm
/* 코멘트 */
const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
// const CommentPartition = styled(FlexCenterd)`
//   width: 100%;
//   height: 2px;
//   margin: 2rem 0;
// `
const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`
const CommentLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #b2b2b2;
`

const CommentLayout = styled.div`
  width: 100%;
  /* background-color: #f9fe5e; */
  padding: 1rem;
  box-sizing: border-box;
  /* gap: 1rem; */
  display: flex;
  flex-direction: column;
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
const CommentPartition = styled(FlexCenterd)`
  width: 100%;
  height: 2px;
  margin: 2rem 0;
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
const ShowMoreButton = styled.button`
  width: 4rem;
  height: 4rem;
  border: 0;
  border-radius: 50%;
  background-color: var(--color-original);
  color: white;
  font-size: 1rem;
  cursor: pointer;

  box-shadow: 3px 3px 3px 3px gray;
`
