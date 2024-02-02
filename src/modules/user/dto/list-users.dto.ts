import { createZodDto } from 'nestjs-zod'
import { GetUsersRequestSchema } from 'englikh-contracts'

export class ListUsersDto extends createZodDto(GetUsersRequestSchema) {}
