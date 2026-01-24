import { CircleUser, LogOut, User } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { useSignOut } from "modules/auth/hooks/useSignOut";

const ProfileDropdown = () => {
  const { triggerSignOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="mr-3">
          <CircleUser className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link to="/profile">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profil
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onSelect={() => triggerSignOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Chiqish
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown;