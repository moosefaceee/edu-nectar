import { useQuery } from 'react-query'
import { getQuiz } from '../queries'
import { useMemo } from 'react'

export const useQuiz = (topicId: string) => {
  const { data, isLoading } = useQuery(['quiz', { id: topicId }], () => getQuiz(topicId))

  const questions = useMemo(() => data?.data?.[0]?.questions, [data])

  return { questions, isLoading }
}
