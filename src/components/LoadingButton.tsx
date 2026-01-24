import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from 'components/ui/button';

interface IProps {
  className?: string;
  children: ReactNode;
  isLoading: boolean;
}

export default function LoadingButton({
  className,
  children,
  isLoading,
}: IProps) {
  return (
    <Button type="submit" className={className} disabled={isLoading}>
      {isLoading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
