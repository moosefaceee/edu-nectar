import axios from 'axios'

const HOST_URL =
  import.meta.env.VITE_ENVIRONMENT === 'develop'
    ? import.meta.env.VITE_HOST_URL_TEST
    : import.meta.env.VITE_HOST_URL_LIVE

export const getQuiz = async (id: string) => {
  const res = await axios.get(`${HOST_URL}/api/quiz/${id}`)

  return res
}
