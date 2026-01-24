import http from 'services/api';
import { CertificateInputType, CertificateEditBodyType, CreateRecommendationCertificateType, RecomEditBodyType } from './types';



// *******************************************  GET CERTIFICATE ****************************************************
export const GetDatasList = async (currentPage:number) => {
  return await http.get(`/certificate?pageSize=10`, {params:{pageNumber:currentPage}});
};

// *******************************************  GET  RECOMMENDATION CERTIFICATE ****************************************************
export const GetRecomList = async (currentPage:number) => {
  return await http.get(`/recommendation-certificate?pageSize=10`, {params: {pageNumber:currentPage}});
}

// *******************************************  CREATE CERTIFICATE ****************************************************
export const CreateData = async (values: CertificateInputType) => {
  return await http.post(`/certificate`, values);
};



// *******************************************  CREATE  RECOMMENDATION CERTIFICATE ****************************************************
export const CreateRecommendationData = async (values:CreateRecommendationCertificateType ) => {
  return await http.post(`/recommendation-certificate`, values)
}


// *******************************************  EDIT CERTIFICATE ****************************************************
export const EditData = async ({
  values,
  id,
}: CertificateEditBodyType) => {
  return await http.patch(`/certificate/${id}`, values);
};


// *****************************************************   DELETE  CERTIFICATE  **********************************************

// api.ts
export const DeleteData = async (id: string, type?: 'certificate' | 'recommendation') => {
  if (type === 'certificate') {
    return await http.delete(`/certificate/${id}`);
  } else {
    return await http.delete(`/recommendation-certificate/${id}`);
  }
};



// *****************************************************   DELETE  CERTIFICATE  **********************************************



// *******************************************  EDIT  RECOMMENDATION CERTIFICATE ****************************************************
export const RecomEditData = async ({
  values,
  id,
}: RecomEditBodyType) => {
  return await http.patch(`/recommendation-certificate/${id}`, values);
};

export const RecomDeleteData = async (id: string) => {
  return await http.delete(`/recommendation-certificate/${id}`);
};