import { z } from 'zod'

// 로그인 유효성 검사 스키마 : email + password
export const validationLoginSchema = z.object({
  email: z.string().nonempty('* Email은 필수입니다!').email('* 올바른 Email을 입력해 주세요!'),
  password: z.string().nonempty('* Password은 필수입니다!').min(3, '* 4자 이상 입력하세요!'),
})

// 회원 가입 유효성 검사 스키마 :
export const validationSignupSchema = z.object({
  email: z.string().nonempty('* Email은 필수입니다!').email('* 올바른 Email을 입력해 주세요!'),
  nickName: z.string().nonempty('* NickName은 필수입니다!').min(2, '* 2자 이상 입력하세요!'),
  password: z.string().nonempty('* Password은 필수입니다!').min(8, '* 8자 이상 입력하세요!'),
  // repassword: z.string().nonempty('* 재확인 Password은 필수입니다!').min(8, '* 8자 이상 입력하세요!'),
})
