
export interface PremiumPlan {
  id: string;
  title: string,
  price: number,
  durationInDays: number,
  isVisible: boolean
  properties: string[],
  date: string;
}



export interface PremiumPlanInputType {
  title: string,
  properties: string[],
  price: number,
  isVisible: boolean,
  durationInDays: number,
}


export interface PremiumPlanEditBodyType {
  id: string;
  values: PremiumPlanInputType;
}

