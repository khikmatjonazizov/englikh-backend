import { createZodDto } from 'nestjs-zod';
import { UserSignupRequestSchema } from 'englikh-contracts'

export class SignupDto extends createZodDto(UserSignupRequestSchema) {}
