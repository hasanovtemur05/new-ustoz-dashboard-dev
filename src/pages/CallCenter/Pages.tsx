import { Button } from 'components/ui/button';
import { useGetFile } from 'modules/call-center/hooks/useGetFile';
import React from 'react';

const CallCenterPage = () => {
  const { data, refetch, isFetching } = useGetFile();
  console.log(data);
  

  const handleClick = async () => {
    try {
      const response = await refetch();
      
      // response.data - bu yerda blob bor
      if (response.data?.data) {
        const blob = response.data.data; // AxiosResponse ichidan data olamiz
        
        // Faylni yuklab olish
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'new_users_today.xlsx'); 
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        // Memory tozalash
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Xatolik yuz berdi:', err);
    }
  };

  return (
    <div>
      <Button variant="default" onClick={handleClick} disabled={isFetching}>
        {isFetching ? 'Yuklanmoqda...' : 'Faylni yuklash'}
      </Button>
    </div>
  );
};

export default CallCenterPage;