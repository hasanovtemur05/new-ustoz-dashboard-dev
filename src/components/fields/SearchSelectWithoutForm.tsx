import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from 'utils/styleUtils';

interface IProps {
  placeholder?: string;
  data: { name: string; id: string | number; disabled?: boolean }[];
  value?: string | number;
  onChange?: (value: string) => void;
  isTitleKey?: boolean;
  className?: string;
}

export default function SearchSelectWithoutForm({
  data,
  placeholder,
  value,
  onChange,
  isTitleKey,
  className,
}: IProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedItem = data.find((item) => 
    isTitleKey ? item.name === value : item.id?.toString() === value?.toString()
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between font-normal min-w-[200px]", className)}
        >
          <span className="truncate">
            {selectedItem ? selectedItem.name : placeholder || 'Tanlang...'}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 flex flex-col max-h-[300px] overflow-hidden" align="start">
        <div className="flex items-center border-b px-3 shrink-0">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Qidirish..."
            className="h-9 w-full border-0 bg-transparent py-3 text-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden p-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 pointer-events-auto overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
        >
          {filteredData.length === 0 ? (
            <div className="py-6 text-center text-sm text-slate-500">Ma'lumot topilmadi.</div>
          ) : (
            filteredData.map((item) => {
              const itemValue = isTitleKey ? item.name : item.id?.toString();
              const isSelected = isTitleKey ? item.name === value : item.id?.toString() === value?.toString();
              
              return (
                <div
                  key={item.id}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50",
                    isSelected && "bg-slate-100 dark:bg-slate-800"
                  )}
                  onClick={() => {
                    if (itemValue) onChange?.(itemValue);
                    setOpen(false);
                    setSearchTerm('');
                  }}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {isSelected && <Check className="h-4 w-4" />}
                  </span>
                  {item.name}
                </div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
