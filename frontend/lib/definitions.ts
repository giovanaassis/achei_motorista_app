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

const availabilityEnum = [
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
  "domingo",
] as const;
export const DriverFormSchema = z.object({
  gender: z.enum(["homem", "mulher", "outro"], "Campo obrigatório."),
  state: z.string("Campo obrigatório.").min(3).trim(),
  city: z.string("Campo obrigatório.").min(3).trim(),
  phone_number: z
    .string("Campo obrigatório.")
    .min(10, "Número inválido.")
    .max(12, "Número inválido.")
    .trim(),
  instagram: z
    .string()
    .regex(
      /^(?!\.)(?!.*\.\.)([a-zA-Z0-9._]+)(?<!\.)$/,
      "Usuário do Instagram inválido."
    )
    .trim()
    .optional(),
  facebook: z
    .string()
    .refine(
      (value) => /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/i.test(value),
      "Link do Facebook inválido."
    )
    .trim()
    .optional(),
  site: z
    .url({ protocol: /^https$/, error: "Link do site inválido." })
    .trim()
    .optional(),
  vehicle_type: z.enum(["carro", "moto"], "Campo obrigatório."),
  vehicle_seats: z.coerce
    .number()
    .min(2, "Mínimo 2 assentos.")
    .max(9, "Máximo 9 assentos.")
    .optional(),
  driver_availability: z.enum(availabilityEnum, "Campo obrigatório."),
});

export type SignupFields = z.infer<typeof SignupFormSchema>;
export type SigninFields = z.infer<typeof SigninFormSchema>;
export type UserFormFields = z.infer<typeof UserFormSchema>;
export type DriverFormFields = z.infer<typeof DriverFormSchema>;

export type FormState<T extends Record<string, unknown>> =
  | {
      errors?: Partial<Record<keyof T, string[]>>;
      message?: string;
    }
  | undefined;
