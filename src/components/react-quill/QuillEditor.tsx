import { imageUpload } from 'api/TouristAPI'
import React, { useMemo, useRef, FunctionComponent } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { ImageResize } from 'quill-image-resize-module-ts'
Quill.register('modules/ImageResize', ImageResize)

import QuillImageDropAndPaste, { ImageData } from 'quill-image-drop-and-paste'
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)

interface CustomQuillEditorProps {
  value: string
  onChange: (content: string) => void
  setImgLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const QuillEditor: FunctionComponent<CustomQuillEditorProps> = ({ value, onChange, setImgLoading }) => {
  const quillRef = useRef<ReactQuill>(null) // Quill 인스턴스에 접근하기 위한 ref

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['link', 'image'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ]

  const imageHandler = () => {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input')
    // 속성 써주기
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    // 2. input에 이미지를 넣으면 발생하는 이벤트를 감지한다.
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      try {
        setImgLoading(true)
        const url = await imageUpload(file)

        // 4. quill에 이미지를 삽입한다.
        const quill = quillRef.current
        const range = quill?.getEditor().getSelection()?.index
        if (range !== undefined && quill) {
          quill.getEditor().insertEmbed(range, 'image', url.url)
        }
      } catch {
        alert('이미지 업로드에 실패했습니다.')
      } finally {
        setImgLoading(false)
      }
    }
  }

  const imageDropHandler = async (_dataUrl: string | ArrayBuffer, _type: string, imageData: ImageData) => {
    const file = imageData.toFile()
    if (!file) return

    try {
      setImgLoading(true)
      const url = await imageUpload(file)

      const quill = quillRef.current
      const range = quill?.getEditor().getSelection()?.index
      if (range !== undefined && quill) {
        quill.getEditor().insertEmbed(range, 'image', url.url)
      }
    } catch {
      alert('이미지 업로드에 실패했습니다.')
    } finally {
      setImgLoading(false)
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
      imageDropAndPaste: {
        handler: imageDropHandler,
      },
    }),
    [],
  )

  return (
    <ReactQuill
      style={{ height: '93%', width: '100%', marginBottom: '5rem' }}
      placeholder="내용을 입력하세요."
      ref={quillRef}
      theme="snow"
      modules={modules}
      value={value}
      onChange={onChange}
    />
  )
}

export default QuillEditor
