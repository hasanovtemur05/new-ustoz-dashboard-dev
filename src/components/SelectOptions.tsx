import { cn } from 'utils/styleUtils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { X as ClearIcon } from 'lucide-react';

interface IProps {
  value: string | undefined;
  setValue: (state: any) => void;
  data: { name: string; type: string; disabled?: boolean }[];
  placeholder?: string;
  className?: string;
}

export default function SelectOptions({
  value,
  setValue,
  data,
  placeholder,
  className,
}: IProps) {
  return (
    <div className={cn(className, 'w-52 relative')}>
      <Select onValueChange={setValue} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {data.map(item => (
            <SelectItem
              value={item.type}
              key={item.type}
              disabled={item.disabled}
              className="flex items-center justify-between"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <ClearIcon
          className="size-6 text-gray-500 absolute right-7 top-2 p-1 cursor-pointer"
          onClick={() => setValue('')}
        />
      )}
    </div>
  );
}
