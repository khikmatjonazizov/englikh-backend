import { z } from 'zod';

export const UserLoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UserLoginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string().nullable(),
  }),
});

export type UserLoginRequest = z.infer<typeof UserLoginRequestSchema>;

export type UserLoginResponse = z.infer<typeof UserLoginResponseSchema>;
