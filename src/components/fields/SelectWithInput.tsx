import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { Input } from 'components/ui/input';

interface IProps {
  name: string;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  data: { name: string; type: string; disabled?: boolean }[];
  label?: string;
  required?: boolean;
  isLoading?: boolean;
}

export default function SelectWithInpatch({
  data,
  placeholder,
  name,
  label,
  required,
  searchValue,
  setSearchValue,
  isLoading
}: IProps) {
  const { control } = useFormContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

 
console.log(isLoading,"isLoading");
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          {label && (
            <FormLabel>
              {`${label} `}
              {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div>
              <Input
                {...field}
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setShowDropdown(true);
                  field.onChange(e.target.value);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowDropdown(false);
                  }, 200);
                }}
              />
              {showDropdown && filteredData.length > 0 ? (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredData.map(item => (
                    <div
                      key={item.type}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        field.onChange(item.type);
                        setSearchValue(item.name);
                        setShowDropdown(false);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              ):(
                <div className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  {isLoading ? "Iltimos kuting, Yuklanmoqda..." : !filteredData?.length  ? "Ma'lumot topilmadi" : ""}
                </div> 
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
