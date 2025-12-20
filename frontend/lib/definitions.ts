import * as z from "zod";

export const SignupFormSchema = z.object({
  username: z.string().min(2, "Deve ter no mínimo 2 caracteres.").trim(),
  email: z.email("Insira um email válido.").trim(),
  password: z
    .string()
    .min(6, "Deve ter no mínimo 6 caracteres.")
    .regex(/[0-9]/, "Deve ter ao menos um número.")
    .trim(),
});

export const SigninFormSchema = SignupFormSchema.omit({
  username: true,
});

export const UserFormSchema = z.object({
  name: z.string().min(2, "Deve ter no mínimo 2 caracteres.").trim(),
  email: z.email("Insira um email válido.").trim(),
  password: z
    .string()
    .min(6, "Deve ter no mínimo 6 caracteres.")
    .regex(/[0-9]/, "Deve ter ao menos um número.")
    .trim(),
  new_password: z
    .string()
    .min(6, "Deve ter no mínimo 6 caracteres.")
    .regex(/[0-9]/, "Deve ter ao menos um número.")
    .trim(),
});

export type SignupFields = z.infer<typeof SignupFormSchema>;
export type SigninFields = z.infer<typeof SigninFormSchema>;
export type UserFormFields = z.infer<typeof UserFormSchema>;

export type FormState<T extends Record<string, unknown>> =
  | {
      errors?: Partial<Record<keyof T, string[]>>;
      message?: string;
    }
  | undefined;
