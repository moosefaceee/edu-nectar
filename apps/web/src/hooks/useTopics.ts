import { useQuery } from 'react-query'
import { getTopics } from '../queries'
import { useMemo } from 'react'
import { Topics } from '../types'

export const useTopics = () => {
  const { data, isLoading } = useQuery('topics', getTopics)

  const topics: Topics = useMemo(() => data?.data?.[0]?.topics, [data])

  return { topics, isLoading }
}
