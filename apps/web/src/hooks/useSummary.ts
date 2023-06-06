import { useQuery } from 'react-query'
import { getSummary } from '../queries'
import { useMemo } from 'react'
import { Summary } from '../types'

export const useSummary = (topicId: string) => {
  const { data, isLoading } = useQuery(['summary', topicId], () => getSummary(topicId))

  const summary: Summary = useMemo(() => data?.data?.[0]?.summary, [data])

  return { summary, isLoading }
}
