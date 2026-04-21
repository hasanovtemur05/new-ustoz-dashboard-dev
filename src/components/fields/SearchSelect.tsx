import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from 'utils/styleUtils';

interface IProps {
  name: string;
  placeholder?: string;
  data: { name: string; type: string; disabled?: boolean }[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function SearchSelectField({
  data,
  placeholder,
  name,
  label,
  required,
  disabled,
}: IProps) {
  const { control, setValue, watch } = useFormContext();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedValue = watch(name);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel>
              {`${label} `}
              {required && (
                <span className="text-red-500 dark:text-red-900">*</span>
              )}
            </FormLabel>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={disabled}
                  aria-expanded={open}
                  className={cn(
                    'w-full justify-between font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <span className="truncate">
                    {field.value
                      ? data.find((item) => item.type === field.value)?.name
                      : placeholder || 'Tanlang...'}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Input
                  placeholder="Qidirish..."
                  className="h-9 w-full border-0 bg-transparent py-3 text-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="max-h-[300px] overflow-y-auto p-1">
                {filteredData.length === 0 ? (
                  <div className="py-6 text-center text-sm text-slate-500">Ma'lumot topilmadi.</div>
                ) : (
                  filteredData.map((item) => (
                    <div
                      key={item.type}
                      className={cn(
                        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50",
                        field.value === item.type && "bg-slate-100 dark:bg-slate-800"
                      )}
                      onClick={() => {
                        field.onChange(item.type);
                        setOpen(false);
                        setSearchTerm('');
                      }}
                    >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        {field.value === item.type && (
                          <Check className="h-4 w-4" />
                        )}
                      </span>
                      {item.name}
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
