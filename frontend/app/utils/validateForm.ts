import { z, ZodType } from "zod";

export function validateForm<T extends Record<string, unknown>>(
  schema: ZodType<T>,
  data: unknown
): { success: boolean; errors?: Partial<Record<keyof T, string[]>> } {
  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    return { success: false, errors };
  }

  return { success: true };
}
