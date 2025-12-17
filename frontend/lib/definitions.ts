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

export type FormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
