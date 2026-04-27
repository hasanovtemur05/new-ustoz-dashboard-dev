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
  address: z.string({ message: 'Manzil kiritlishi shart' }), // Kept as string for form input
  salaryFrom: z.union([z.number(), z.string()]),
  salaryTo: z.union([z.number(), z.string()]),
  type: z.string(), // Vacancy type (INTERN etc)
  workSchedule: z.string(), // FULL_TIME etc
  experience: z.string(), // NO_EXPERIENCE etc
  skills: skillsSchema,
  specialization: z.string().min(1, { message: "Mutaxassislik kiritilishi shart" }),
});

export type vacancyFormSchema = z.infer<typeof vacancySchema>;