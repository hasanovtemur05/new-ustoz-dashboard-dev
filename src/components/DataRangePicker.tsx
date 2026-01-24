import { HTMLAttributes } from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from 'utils/styleUtils';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: (state: DateRange | undefined) => void;
  className?: string;
}

export function DateRangePicker({ className, date, setDate }: IProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                `${format(date.from, 'LLL dd, y')} -
                ${format(date.to, 'LLL dd, y')}`
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Vaqt oralig'ini tanglang</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            disabled={date => date > new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
