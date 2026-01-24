import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface IProps {
    state: boolean;
    setState?: (state: boolean) => void;
    labelText?: string
}

export default function CustomSwitch({
    state,
    setState,
    labelText
}: IProps) {
    return (
        <div className="flex items-center space-x-2 min-w-[140px]   ">
            <Switch
                name="is_draft"
                id="notification"
                checked={state}
                onCheckedChange={setState}
            />
            <Label htmlFor="notification"> {labelText}  </Label>
        </div>
    );
}
