import React, { useMemo, useState, useRef, FunctionComponent } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface CustomQuillEditorProps {}

const QuillEditor: FunctionComponent<CustomQuillEditorProps> = () => {
  const [values, setValues] = useState<string>('')
  console.log('values: ', values)
  const quillRef = useRef<ReactQuill>(null) // Quill 인스턴스에 접근하기 위한 ref

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ]

  const modules = useMemo(
    () => ({
      toolbar: toolbarOptions,
    }),
    [],
  )

  return (
    <ReactQuill
      style={{ height: '93%', width: '100%', marginBottom: '5rem' }}
      placeholder="내용을 입력하세요."
      ref={quillRef}
      theme="snow"
      value={values}
      modules={modules}
      onChange={(content, delta, source, editor) => setValues(editor.getHTML())}
    />
  )
}

export default QuillEditor
