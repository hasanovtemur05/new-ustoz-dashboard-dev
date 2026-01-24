import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';

import { CustomSelectType } from 'pages/UsersCertificates/Page';

interface IProps {
  placeholder?: string;
  data: CustomSelectType[];
  value?: string;
  onChange?: (value: string) => void;
  isTitleKey?: boolean;
}

export default function SelectWithoutForm({ data, placeholder, value, onChange, isTitleKey }: IProps) {
  return (
    <div>
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem value={isTitleKey ? item?.name : item?.id?.toString()} key={item?.id} disabled={item?.disabled}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
