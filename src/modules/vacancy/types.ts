export enum VacancyType {
  INTERN = 'INTERN',
  // Add other types if needed, but the user showed INTERN
}

export enum WorkSchedule {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  REMOTE = 'REMOTE',
}

export enum ExperienceLevel {
  NO_EXPERIENCE = 'NO_EXPERIENCE',
  BETWEEN_1_AND_3 = 'BETWEEN_1_AND_3',
  BETWEEN_3_AND_6 = 'BETWEEN_3_AND_6',
  MORE_THAN_6 = 'MORE_THAN_6',
}

export interface Vacancy {
  id: string;
  type: string;
  title: string;
  specialization: string;
  address: {
    id: string;
    region: string;
    district: string;
  };
  salaryFrom: number;
  salaryTo: number;
  workSchedule: string;
  experience: string;
  status: string;
  createdAt: string;
  company?: string; // Kept for backward compatibility if needed by frontend
  description?: string; // Kept
  skills?: string[]; // Kept
}

export interface VacancyInput {
  title: string;
  description: string;
  company: string;
  address: string;
  salaryFrom: number;
  salaryTo: number;
  type: string;
  workSchedule: string;
  experience: string;
  skills: string[] | { id: string; title: string }[];
  specialization: string;
}

export interface VacancyEditBody {
  id: string;
  values: VacancyInput;
}
