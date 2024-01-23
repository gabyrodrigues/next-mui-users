import * as z from "zod";

export const formSchema = z.object({
  pessoa: z.number().min(1, { message: "Valor inválido" }),
  telefone: z.string().refine((value) => /^\d{2} \d{9}$/.test(value), {
    message: 'O telefone deve estar no formato "99 999999999"'
  }),
  email: z.string().email({
    message: "E-mail inválido"
  })
});
