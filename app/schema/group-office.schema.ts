import { z } from 'zod';

export const GroupSchema = z.object({
    memberUids: z.array(z.string()),
    name: z.string(),
    offices: z.array(z.string()),
})

export type Group = z.infer<typeof GroupSchema>;

export const OfficeSchema = z.object({
    address: z.string().optional(),
    description: z.string().optional(),
    group: z.string(),
    name: z.string(),
    id: z.string(),
});

export type Office = z.infer<typeof OfficeSchema>;