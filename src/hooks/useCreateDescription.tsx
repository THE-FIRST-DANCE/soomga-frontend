import { useMemo } from 'react'

const useCreateDescription = ({ content }: { content: string }) => {
  return useMemo(() => {
    let cleanContent = content.replace(/<img[^>]*>/g, '') // 이미지 태그 제거
    let textContent = ''
    let match

    while (!textContent && cleanContent.length > 0) {
      match = cleanContent.match(/>([^<]+)</)
      if (match && match[1].trim()) {
        textContent = match[1].trim()
        if (textContent.length > 30) {
          textContent = `${textContent.substring(0, 30)}...`
          break
        }
      }
      cleanContent = cleanContent.replace(/>([^<]+)</, '><')
    }

    return textContent
  }, [content])
}

export default useCreateDescription
