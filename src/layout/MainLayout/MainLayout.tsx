import { ReactElement, useState } from 'react';
import Header from '../Header';
import SideNav from '../SideNav';
import { useRoutes } from 'react-router-dom';
import createBreadcrumbs from 'components/Breadcrumb';

interface IProps {
  children: ReactElement;
}

const MainLayout = ({ children }: IProps) => {
  const [isSideNavOpen, setSideNavOpen] = useState(true);
  const breadcrumbs = useRoutes(createBreadcrumbs());
  return (
    <div className="flex w-full">
      <SideNav isSideNavOpen={isSideNavOpen} />
      <div className="w-full">
        <Header setSideNavOpen={setSideNavOpen} isSideNavOpen={isSideNavOpen} />
        <div className="flex justify-center">
          <div className="max-w-7xl w-full p-5 space-y-4 bg-white dark:bg-slate-950">
            {breadcrumbs}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
