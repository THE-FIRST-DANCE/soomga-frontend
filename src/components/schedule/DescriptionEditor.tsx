import { memo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface DescriptionEditorProps {
  value: string
  onChange: (value: string) => void
}

const DescriptionEditor = memo(({ value, onChange }: DescriptionEditorProps) => {
  const modules = {
    toolbar: {
      container: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote']],
    },
  }
  return <ReactQuill theme="snow" modules={modules} value={value} onChange={onChange} />
})

export default DescriptionEditor
