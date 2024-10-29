import { z } from 'zod'

// 로그인 유효성 검사 스키마 : email + password
export const validationLoginSchema = z.object({
  email: z.string().nonempty('* Email is required!').email('* Please enter a valid email!'),
  password: z.string().nonempty('* Password is required!').min(3, '* Please enter at least 4 characters!'),
})

// Signup validation schema
export const validationSignupSchema = z.object({
  email: z.string().nonempty('* Email is required!').email('* Please enter a valid email!'),
  nickName: z.string().nonempty('* Nickname is required!').min(2, '* Please enter at least 2 characters!'),
  password: z.string().nonempty('* Password is required!').min(8, '* Please enter at least 8 characters!'),
  // repassword: z.string().nonempty('* Re-enter password is required!').min(8, '* Please enter at least 8 characters!'),
})

export const validationUserInfoEditSchema = z.object({
  email: z.string().nonempty('* Email is required!').email('* Please enter a valid email!'),
  nickName: z.string().nonempty('* Nickname is required!').min(2, '* Please enter at least 2 characters!'),
  password: z.string().min(8, '* Please enter at least 8 characters!'),
  repassword: z.string().min(8, '* Please enter at least 8 characters!'),
})
