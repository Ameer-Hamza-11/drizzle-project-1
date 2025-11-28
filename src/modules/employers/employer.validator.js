import { z } from 'zod'


export const employerSchema = z.object({
    companyName: z
        .string()
        .trim()
        .min(3, 'company name must be min 3 characters')
        .max(255, 'company name must be min 255 characters'),
    companyBio: z
        .string()
        .trim()
        .min(10, 'company bio must be min 10 characters')
        .max(2000, 'company bio must be max 2000 characters'),
    companyWebsite: z
        .url('please enter a valid url (e.g. https://example.com)')
        .trim()
        .max(500, 'company website must be max 500 characters')
        .optional()
        .or(z.literal('')),
    location: z.
        string()
        .trim()
        .min(2, 'location must be min 2 characters')
        .max(255, 'location  must be max 255 characters').optional().or(z.literal(""))
        .optional()
        .or(z.literal("")),

})