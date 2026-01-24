import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { useToast } from "components/ui/use-toast"
import { AuthContext } from 'providers/auth';

export const useSignOut = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { toast } = useToast();

  const triggerSignOut = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    toast({
      variant: "success",
      title: "Muvaffaqiyat!",
      description: "Sessiya muvaffaqiyatli tugatildi!",
    });
    navigate('/');
  }

  return {
    triggerSignOut,
  };
};
