import { toast } from 'components/ui/use-toast';

export const showErrorToast = (error: any) => {
  const message = error?.response?.data?.message || error?.message || 'Aniqlanmagan xatolik yuz berdi';

  if (Array.isArray(message)) {
    toast({
      variant: 'destructive',
      title: 'Xatolik!',
      description: message.join('\n'),
    });
  } else {
    toast({
      variant: 'destructive',
      title: 'Xatolik!',
      description: message,
    });
  }
};
