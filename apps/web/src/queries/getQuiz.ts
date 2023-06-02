import axios from 'axios'

const HOST_URL =
  import.meta.env.VITE_ENVIRONMENT === 'develop'
    ? import.meta.env.VITE_HOST_URL_TEST
    : import.meta.env.VITE_ENVIRONMENT

export const getQuiz = async () => {
  const res = await axios.get(`${HOST_URL}/test/api/quiz`)

  return res
}
