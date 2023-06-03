import axios from 'axios'

const HOST_URL =
  import.meta.env.VITE_ENVIRONMENT === 'develop'
    ? import.meta.env.VITE_HOST_URL_TEST
    : import.meta.env.VITE_HOST_URL_LIVE

type Props = {
  topic: string
  question: string
  reply: string
}
export const getUserResponse = async (body: Props) => {
  const config = {
    method: 'post',
    url: `${HOST_URL}/api/user-response/`,
    data: body,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await axios(config)

  return res
}
