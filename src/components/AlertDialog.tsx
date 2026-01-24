import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import {
  AlertDialog as AlertDialogRoot,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'components/ui/alert-dialog';

interface IProps extends AlertDialogProps {
  alertTitle: string;
  alertDescription?: string;
  alertCancel: string;
  alertCancelFucntion?: () => void;
  alertActionTitle: string;
  alertActionFunction: () => void;
  setIsOpen: (state: boolean) => void;
  isOpen: boolean;
}

export const AlertDialog = ({
  alertTitle,
  alertDescription,
  alertCancel,
  alertCancelFucntion,
  alertActionTitle,
  alertActionFunction,
  isOpen,
  setIsOpen,
}: IProps) => {
  return (
    <AlertDialogRoot open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-white">
            {alertTitle}
          </AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="dark:text-white"
            onClick={() => {
              setIsOpen(false);
              alertCancelFucntion && alertCancelFucntion();
            }}
          >
            {alertCancel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={alertActionFunction}>
            {alertActionTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
