export interface CertificateType {
  id: string;
  degree: string;
  photo: string;
  course: any | {
    id: string;
    name: string;
  };
  courseId: string;
  date: string;
}

export interface RecommendationType {
  id: string;
  photo: string;
  type: string;
  createdAt: string;
  course: {
    id:string;
    title: string;
  }
}

export enum RecEnum {
  AMATEUR = 'AMATEUR', 
  PROGRESSIVE = 'PROGRESSIVE', 
}

export interface CreateRecommendationCertificateType {
  photo: string;
  courseId: string;
  type: RecEnum
}



export interface CertificateInputType {
  dagree: string;
  photo: string;
  course: any;
}

export interface CertificateEditBodyType {
  id: string;
  values: CertificateInputType;
}

export interface RecomEditBodyType {
  id: string;
  values: CreateRecommendationCertificateType;
}

