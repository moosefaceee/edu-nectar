import axios from 'axios'

const HOST_URL =
  import.meta.env.VITE_ENVIRONMENT === 'develop'
    ? import.meta.env.VITE_HOST_URL_TEST
    : import.meta.env.VITE_ENVIRONMENT

export const getLearningPaths = async () => {
  console.log('HOST_URL', HOST_URL)
  const res = await axios.get(`${HOST_URL}/test`)

  return res
}
