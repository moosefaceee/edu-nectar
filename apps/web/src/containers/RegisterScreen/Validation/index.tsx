import { z } from 'zod'

export const registerDefaultValues = {
  email: '',
  password: ''
}

export type RegisterFormValues = typeof registerDefaultValues

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  termsAndConditions: z.literal(true) // enforce true
})
