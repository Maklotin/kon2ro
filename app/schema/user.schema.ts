import { z } from 'zod';

export const UserSchema = z.object({
    email: z.string().email(),
    groups: z.array(z.string()).optional(),
    name: z.string().optional(),
    uid: z.string(),
});

export type User = z.infer<typeof UserSchema>;

