import { z } from 'zod'

export const loginDefaultValues = {
  email: '',
  password: ''
}

export type LoginFormValues = typeof loginDefaultValues

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})
