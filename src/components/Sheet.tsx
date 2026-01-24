import { ReactNode } from 'react';
import {
  Sheet as SheetRoot,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';

interface IProps {
  sheetTitle?: string;
  sheetDescription?: string;
  children: ReactNode;
  isOpen: boolean;
  setSheetOpen: (state: boolean) => void;
}

export const Sheet = ({
  sheetTitle,
  sheetDescription,
  children,
  isOpen,
  setSheetOpen,
}: IProps) => {
  return (
    <SheetRoot open={isOpen} onOpenChange={() => setSheetOpen(false)}>
      <SheetContent className="overflow-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetDescription>{sheetDescription}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </SheetRoot>
  );
};
