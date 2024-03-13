import QuillEditor from 'components/react-quill/QuillEditor'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled, { keyframes } from 'styled-components'

const PostEdit = () => {
  const [tags, setTags] = useState<string[]>([]) // 입력 받아 저장할 태그들
  const [hashTag, setHashTag] = useState<string>('') // 입력 받은 태그 임시 상태 저장

  /* 태그 삭제 */
  const removeTag = (tag: string) => {
    // 삭제 하려는 태그를 제외하고 나머지 태그들을 반환
    setTags(tags?.filter((val) => val !== tag))
  }

  /* 태그 추가 (공백 제거) */
  const onChangeHashTag = (e: any) => {
    setHashTag(e.target.value?.trim())
  }

  /* 스페이스 바를 눌러서 태그 입력 */
  const handleKeyUp = (e: any) => {
    // if : 스페이스 바를 누른다 && 공백이 없다면
    if (e.keyCode === 32 && e.target.value.trim() !== '') {
      // if : 같은 태그가 있다면 ?
      if (tags?.includes(e.target.value?.trim())) {
        // 동일한 태그가 있다고 에라
        toast.error('동일한 태그가 있어요...😭')
        // else : 같은 태그가 없으면 ?
      } else {
        if (tags.length < 5) {
          // if : 최대 태그 5개 입력 받기
          setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]))
          setHashTag('')
        } else {
          // else : 태그가 5개이 있어야 한다고 에라
          toast.error('태그는 5개까지 생성할 수 있어요 😉')
        }
      }
    }
  }

  return (
    <>
      <CreatePostLayout>
        <Container>
          <Title>포스트 수정하기</Title>
          <InputWrapper>
            <TitleInput name="title" placeholder="제목을 입력해 주세요" />
            <RegionInput name="region" placeholder="지역을 입력해 주세요" />
            <TageInput
              name="title"
              placeholder="태그를 최대 5개 까지 선택해 주세요 + 스페이스바를 입력"
              value={hashTag}
              onChange={onChangeHashTag}
              onKeyUp={handleKeyUp}
            />
            <InsertedHashtags>
              <SpanHashtagsTagOutput>
                {tags.map((tag, index) => (
                  <SpanHashtagsTag
                    className="post-form__hashtags-tag"
                    key={index}
                    onClick={() => {
                      removeTag(tag)
                    }}
                  >
                    #{tag}
                  </SpanHashtagsTag>
                ))}
              </SpanHashtagsTagOutput>
            </InsertedHashtags>
          </InputWrapper>

          {/* 🟡 Quill 🟡 */}
          <QillWrapper>
            <QuillEditor />
          </QillWrapper>
          <BtnWrapper>
            <Submit_Btn>수정</Submit_Btn>
          </BtnWrapper>
        </Container>
      </CreatePostLayout>
    </>
  )
}

export default PostEdit

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CreatePostLayout = styled(FlexCenter)`
  /* background-color: mediumaquamarine; */
  margin-top: 10rem;
  width: 100%;
  min-height: 76vh;
`

const Container = styled.div`
  /* background-color: #f7d943; */
  /* width: 70rem; */
  height: auto;
  width: 55%;
  /* margin: 0 auto; */
`
const Title = styled.div`
  /* background-color: #fff; */
  font-size: 2rem;
  border-bottom: 0.3rem solid var(--color-original);
  margin-bottom: 2rem;
`

const InputWrapper = styled.div`
  border: 1px solid #c4c4c5;
  /* width: 98%; */
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`

const InputTag = styled.input`
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  border: none;
  outline: none;
  padding: 0 1rem;
  box-sizing: border-box;
  border-radius: 0.3rem;
  background-color: #f5f6f8;
  margin-bottom: 1rem;
`
const TitleInput = styled(InputTag)``
const RegionInput = styled(InputTag)``
const TageInput = styled(InputTag)``

const InsertedHashtags = styled.div``

const SpanHashtagsTagOutput = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 1px;
`

const rotate = keyframes` 
0%{
  transform: rotate(0deg);
}
20%{ 
  transform: rotate(5deg);
}
50%{ 
  transform: rotate(0deg);
}
70%{ 
  transform: rotate(-5deg);
}
100%{
    transform: rotate(0deg);
}
`

const SpanHashtagsTag = styled.span`
  font-size: 14px;
  border: 1px solid black;
  color: $primaryColor;
  border-radius: 10px;
  padding: 2px 6px;
  margin-right: 8px;
  cursor: pointer;

  &:hover,
  &:focus {
    transition: all 0.1s;
    color: red;
    border: 1px solid red;
    animation: ${rotate} 0.3s linear infinite;
  }
`

const QillWrapper = styled.div`
  height: 23rem;
  margin-bottom: 1.5rem;
  /* background-color: mediumaquamarine; */
  /* padding: 1rem;
  box-sizing: border-box; */
`
const BtnWrapper = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
`

const Submit_Btn = styled.div`
  width: 2rem;
  height: 3rem;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover,
  &:focus {
    transition: all 0.1s;
    color: var(--color-original);
  }
`
