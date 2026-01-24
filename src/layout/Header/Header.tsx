import { PanelLeftClose, PanelRightClose } from 'lucide-react';

import { Button } from 'components/ui/button';
import ModeToggle from 'components/layout/ModeToggle';
import ProfileDropdown from 'components/layout/ProfileDropdown';
import { cn } from 'utils/styleUtils';

interface IProps {
  setSideNavOpen: (state: boolean) => void;
  isSideNavOpen: boolean;
}

const Header = ({ setSideNavOpen, isSideNavOpen }: IProps) => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 justify-self-end w-full">
      <div className="flex h-14 items-center justify-between px-2">
        <div>
          <Button
            variant="outline"
            className="px-2"
            onClick={() => setSideNavOpen(!isSideNavOpen)}
          >
            {isSideNavOpen ? (
              <PanelLeftClose className="dark:text-white size-5 stroke-1" />
            ) : (
              <PanelRightClose className="dark:text-white size-5 stroke-1" />
            )}
          </Button>
        </div>
        <div className="flex items-center gap-x-3">
          <ModeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
