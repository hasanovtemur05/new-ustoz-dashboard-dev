import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
}

export default function EventBlocker({ children, className }: IProps) {
  return (
    <div onClick={e => e.stopPropagation()} className={className}>
      {children}
    </div>
  );
}
