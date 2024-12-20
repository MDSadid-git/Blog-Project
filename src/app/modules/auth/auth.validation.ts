import { z } from 'zod';

// Validation register
export const registerUserValidation = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Use valid email address'),
  password: z.string({
    required_error: 'Password is required',
  }),
});

// Validation login
export const loginUserValidation = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Use valid email address'),
  password: z.string({
    required_error: 'Password is required',
  }),
});

// use interface to define the types of the validation schemas:
export type RegisterUserValidationType = z.infer<typeof registerUserValidation>;
export type LoginUserValidationType = z.infer<typeof loginUserValidation>;
