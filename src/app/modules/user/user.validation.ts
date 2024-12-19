import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  role: z.enum(['admin', 'user']).default('user'),
  isBlocked: z.boolean().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
