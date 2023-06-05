import axios from 'axios'

const HOST_URL =
  import.meta.env.VITE_ENVIRONMENT === 'develop'
    ? import.meta.env.VITE_HOST_URL_TEST
    : import.meta.env.VITE_HOST_URL_LIVE

export const getSummary = async (topicId: string) => {
  const res = await axios.get(`${HOST_URL}/api/summary/${topicId}`)

  return res
}
