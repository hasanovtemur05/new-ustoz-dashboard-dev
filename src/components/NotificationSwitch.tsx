import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface IProps {
  isNotified: boolean;
  setIsNotified: (state: boolean) => void;
}

export default function NotificationSwitch({
  isNotified,
  setIsNotified,
}: IProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="notification"
        checked={isNotified}
        onCheckedChange={setIsNotified}
      />
      <Label htmlFor="notification">Bildrishnoma yuborish</Label>
    </div>
  );
}
