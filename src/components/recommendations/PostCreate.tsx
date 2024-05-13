import { useMutation, useQuery } from '@tanstack/react-query'
import { createTripDto, editTourist, getTouristDetail, postTourist } from 'api/TouristAPI'
import QuillEditor from 'components/react-quill/QuillEditor'
import FullLoading from 'components/shared/FullLoading'
import { provinces } from 'data/region'
import { motion } from 'framer-motion'
import { Tourist } from 'interfaces/tourist'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled, { keyframes } from 'styled-components'

const PostCreate = () => {
  const { post_Id } = useParams<{ post_Id: string }>()

  const { data }: { data: Tourist } = useQuery({
    queryKey: ['touristEdit', post_Id],
    queryFn: () => getTouristDetail(Number(post_Id)),
    enabled: !!post_Id,
  })

  useEffect(() => {
    if (data) {
      setTags(data.tags.map((tag) => tag.tag.name))
      setTitle(data.title)
      setContent(data.content)
      setRegion(provinces.find((prov) => prov.id === data.areaId)?.name)
      setEditMode(true)
    }
  }, [data])

  const [editMode, setEditMode] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>([]) // 입력 받아 저장할 태그들
  const [hashTag, setHashTag] = useState<string>('') // 입력 받은 태그 임시 상태 저장
  const [openProvince, setOpenProvince] = useState<boolean>(false)
  const [region, setRegion] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [imageLoading, setImageLoading] = useState<boolean>(false)

  const navigate = useNavigate()

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

  const { mutate: createPost } = useMutation({
    mutationFn: postTourist,
    onSuccess: () => {
      toast.success('게시글이 작성되었습니다.')
      navigate(`/recommendations`)
    },
    onError: (error) => {
      toast.error('게시글 작성에 실패했습니다.')
      console.log(error)
    },
  })

  const { mutate: editPost } = useMutation({
    mutationFn: (data: {
      id: number
      title: string
      content: string
      tags: string[]
      areaId: number | undefined
      authorId: number
    }) => editTourist(data.id, data),
    onSuccess: () => {
      toast.success('게시글이 수정되었습니다.')
      navigate(`/recommendations/detail/${post_Id}`)
    },
    onError: (error) => {
      toast.error('게시글 수정에 실패했습니다.')
      console.log(error)
    },
  })

  const onSubmit = () => {
    if (editMode) {
      if (!window.confirm('게시글을 수정하시겠습니까?')) return
    } else {
      if (!window.confirm('게시글을 작성하시겠습니까?')) return
    }

    if (!region) {
      toast.error('지역을 선택해 주세요')
      return
    }

    const createTripDto = {
      title: title,
      content: content,
      tags: tags,
      areaId: provinces.find((prov) => prov.name === region)?.id,
      authorId: 2,
    }

    if (editMode) {
      editPost({ ...createTripDto, id: Number(post_Id) })
      return
    }

    createPost(createTripDto)
  }

  return (
    <>
      <CreatePostLayout>
        <Container>
          <Title>포스트 작성하기</Title>
          <InputWrapper>
            <TitleInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="제목을 입력해 주세요"
            />
            <RegionInput
              onClick={() => {
                setOpenProvince(!openProvince)
              }}
            >
              {openProvince && (
                <Dropdown
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul>
                    {provinces.map((prov) => (
                      <DropdownItem
                        key={prov.id}
                        onClick={() => {
                          setRegion(prov.name)
                          setOpenProvince(false)
                        }}
                      >
                        {prov.name}
                      </DropdownItem>
                    ))}
                  </ul>
                </Dropdown>
              )}
              {region ? region : '지역을 선택해 주세요'}
            </RegionInput>
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
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
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
            <QuillEditor setImgLoading={setImageLoading} value={content} onChange={setContent} />
          </QillWrapper>
          <BtnWrapper>
            <Submit_Btn
              onClick={() => {
                onSubmit()
              }}
            >
              작성
            </Submit_Btn>
          </BtnWrapper>
        </Container>
        {imageLoading && <FullLoading isLoading={imageLoading} />}
      </CreatePostLayout>
    </>
  )
}

export default PostCreate

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
  height: auto;
  width: 55%;
`
const Title = styled.div`
  font-size: 2rem;
  border-bottom: 0.3rem solid var(--color-original);
  margin-bottom: 2rem;
`

const InputWrapper = styled.div`
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`

const InputTag = styled.input`
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  border: none;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-original);
`
const TitleInput = styled(InputTag)``
const RegionInput = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-original);
  display: flex;
  align-items: center;
  cursor: pointer;
`
const TageInput = styled(InputTag)``

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid var(--bs-gray-dark);
  border-radius: 0.5rem;
  box-shadow: var(--bs-box-shadow);
  z-index: 10;
  padding: 0.5rem;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 200px;
  cursor: pointer;
`

const DropdownItem = styled.li`
  padding: 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--bs-gray-300);
  }
`

const InsertedHashtags = styled.div``

const SpanHashtagsTagOutput = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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

const SpanHashtagsTag = styled(motion.div)`
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  font-size: 1rem;
  border: 1px solid var(--bs-gray-500);
  color: var(--bs-info);
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
  position: relative;
  transform: translateX(-3px);
  position: relative;
`
const BtnWrapper = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 1rem;
`

const Submit_Btn = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px solid var(--color-original);
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
