import { createZodDto } from 'nestjs-zod';
import { UserLoginRequestSchema } from 'englikh-contracts'

export class LoginDto extends createZodDto(UserLoginRequestSchema) {}
