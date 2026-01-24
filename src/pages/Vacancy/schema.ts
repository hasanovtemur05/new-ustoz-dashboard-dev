import { VacancyType } from "modules/vacancy/types";
import { z } from "zod";



const skillObjectSchema = z.object({
  id: z.string(),
  title: z.string(),
})

export const skillsSchema = z.union([
  z.array(skillObjectSchema),
  z.array(z.string())
]).refine(arr => arr.length >= 3, {
  message: "Kamida 3 ta kalit so'z kiriting"
})


export const vacancySchema = z.object({
  title: z.string().min(6, { message: "Title eng kamida 6 ta harfdan iborat bo'lsin" }),
  description: z.string().min(20, {
    message: 'description uchun kamida 20 ta harifdan iforat text kirgazing',
  }),
  company: z.string({ message: 'Companiya nomi kiritlishi shart' }),
  address: z.string({ message: 'Manzil kiritlishi shart' }),
  salary: z.union([z.number(), z.string()]),
  type: z.nativeEnum(VacancyType),
  fromExperience: z.union([z.number(), z.string()]),
  toExperience: z.union([z.number(), z.string()]),
  skills: skillsSchema,
});

export type vacancyFormSchema = z.infer<typeof vacancySchema>;