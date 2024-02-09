const useTimeDifference = (startTime: string, endTime: string) => {
  const start = new Date(`2021-01-01T${startTime}`)
  const end = new Date(`2021-01-01T${endTime}`)
  const diff = end.getTime() - start.getTime()
  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(minutes / 60)
  const remainMinutes = minutes % 60

  return `${hours}시간 ${remainMinutes}분`
}

export default useTimeDifference
