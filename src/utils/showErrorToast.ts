import { toast } from 'components/ui/use-toast';

export const showErrorToast = (error: any) => {
  if (Array.isArray(error.response.data.message)) {
    toast({
      variant: 'destructive',
      title: 'Xatolik!',
      description: error.response.data.message.join('\n'),
    });
  } else {
    toast({
      variant: 'destructive',
      title: 'Xatolik!',
      description: error.response.data.message,
    });
  }
};
