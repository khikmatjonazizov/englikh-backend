import { z } from 'zod';

export const UserSignupRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string().nullable(),
})

export const UserSignupResponseSchema = z.object({
    accessToken: z.string(),
    user: z.object({
        id: z.number(),
        email: z.string(),
        firstName: z.string(),
        lastName: z.string().nullable(),
    }),
});

export type UserSignupRequest = z.infer<typeof UserSignupRequestSchema>;
export type UserSignupResponse = z.infer<typeof UserSignupResponseSchema>;
