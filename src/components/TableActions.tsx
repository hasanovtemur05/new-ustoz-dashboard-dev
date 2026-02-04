import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus, Search } from 'lucide-react';
import { Sheet } from './Sheet';
import { useState } from 'react';

interface IProps {
  sheetTriggerTitle?: string;
  sheetTriggerTitle2?: string;
  sheetTitle?: string;
  sheetTitle2?: string;
  lastDataOrder?: number;
  TableForm?: any;
  TableForm2?: any;
  isAddButtonHidden?: boolean;
  showSecondButton?: boolean;
  children?: React.ReactNode;
  searchValue?: string;
  setSearchValue?: (value: string) => void;
}

export const TableActions = ({ 
  sheetTriggerTitle, 
  sheetTriggerTitle2, 
  sheetTitle2, 
  sheetTitle, 
  lastDataOrder, 
  TableForm, 
  TableForm2, 
  isAddButtonHidden, 
  showSecondButton,
  searchValue = '',
  setSearchValue
}: IProps) => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isSheetOpen2, setSheetOpen2] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchValue) {
      setSearchValue(e.target.value);
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input 
          type="text" 
          placeholder="Qidirish..." 
          value={searchValue}
          onChange={handleSearchChange}
        />
        <Button size="icon" type="button">
          <Search className="size-4" />
        </Button>
      </div>

      <div className='flex gap-5'>
        {showSecondButton && !isAddButtonHidden && (
          <div className="flex items-center gap-2">
            <Button onClick={() => setSheetOpen2(true)}>
              <Plus className="size-4 mr-2" />
              {sheetTriggerTitle2}
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {!isAddButtonHidden && (
            <Button onClick={() => setSheetOpen(true)}>
              <Plus className="size-4 mr-2" />
              {sheetTriggerTitle}
            </Button>
          )}
        </div>
      </div>

      <Sheet sheetTitle={sheetTitle2} isOpen={isSheetOpen2} setSheetOpen={setSheetOpen2}>
        <TableForm2 lastDataOrder={lastDataOrder} setSheetOpen={setSheetOpen2} />
      </Sheet>

      <Sheet sheetTitle={sheetTitle} isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <TableForm lastDataOrder={lastDataOrder} setSheetOpen={setSheetOpen} />
      </Sheet>
    </div>
  );
};