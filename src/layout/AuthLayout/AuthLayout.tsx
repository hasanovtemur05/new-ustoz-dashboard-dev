import { ReactElement } from "react";

interface IProps {
  children: ReactElement;
}
const AuthLayout = ({ children }: IProps) => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {children}
    </div>
  )
}

export default AuthLayout;