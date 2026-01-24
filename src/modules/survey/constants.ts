// Survey context enum
export enum SurveyContext {
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  COURSE = 'COURSE',
  PORTFOLIO = 'PORTFOLIO',
  RESUME = 'RESUME',
  GENERAL = 'GENERAL',
  MARKET = 'MARKET',
}

// Context options for select field
export const CONTEXT_OPTIONS = [
  { name: 'Akkauntni o\'chirish', type: SurveyContext.DELETE_ACCOUNT },
  { name: 'Kurs', type: SurveyContext.COURSE },
  { name: 'Portfolio', type: SurveyContext.PORTFOLIO },
  { name: 'Rezyume', type: SurveyContext.RESUME },
  { name: 'Umumiy', type: SurveyContext.GENERAL },
  { name: 'Market', type: SurveyContext.MARKET },
];
