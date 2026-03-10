import { Outlet, useLocation, useResolvedPath, Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from 'providers/UserProvider';
import { UserRole } from 'modules/auth/types';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

export default function createBreadcrumbs() {
  return [
    {
      path: '/',
      element: <Breadcrumbs text="Bosh sahifa" />,
      children: [
        {
          path: 'courses',
          element: <Breadcrumbs text="Kurslar" />,
          children: [
            {
              path: ':courseId',
              element: <Breadcrumbs text="Bo'limlar" />,
              children: [
                {
                  path: ':moduleId',
                  element: <Breadcrumbs text="Darslar" />,
                  children: [
                    {
                      path: ':lessonId',
                      element: <Breadcrumbs text="Quizlar" />,
                    },
                  ],
                },
              ],
            },
            {
              path: ':courseId/comments',
              element: <Breadcrumbs text="Izohlar" />,
            },
             {
              path: ':courseId/influencer',
              element: <Breadcrumbs text="Influencer" />,
            },
          ],
        },
        {
          path: 'grandmasters',
          element: <Breadcrumbs text="Grandmasterlar" />,
        },
        {
          path: 'news',
          element: <Breadcrumbs text="Yangiliklar" />,
        },
        {
          path: 'books',
          element: <Breadcrumbs text="Kitoblar" />,
        },
        {
          path: 'afisha',
          element: <Breadcrumbs text="Afisha" />,
        },
        {
          path: 'review-games',
          element: <Breadcrumbs text="Tahlillar" />,
        },
        {
          path: 'live-streams',
          element: <Breadcrumbs text="Jonli efir" />,
        },
        {
          path: 'puzzles',
          element: <Breadcrumbs text="Boshqotirmalar" />,
        },
        {
          path: 'notifications',
          element: <Breadcrumbs text="Bildirishnomalar" />,
        },
        {
          path: 'call-center',
          element: <Breadcrumbs text="Call Center" />,
        }
      ],
    },
  ];
}

function Breadcrumbs({ text }: { text: string }) {
  const location = useLocation();
  const resolvedLocation = useResolvedPath('');
  const isActive = location.pathname === resolvedLocation.pathname;
  const { userData } = useContext(UserContext);
  
  // ✅ CALL_CENTER uchun bosh sahifani yashirish
  const isCallCenter = userData?.role === UserRole.CALL_CENTER;
  const isHomePage = resolvedLocation.pathname === '/';
  
  if (isCallCenter && isHomePage) {
    return <Outlet />;
  }

  return (
    <div className="flex gap-1">
      <Breadcrumb>
        <BreadcrumbList>
          {isActive ? (
            <BreadcrumbItem>
              <BreadcrumbPage>{text}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={resolvedLocation.pathname}>{text}</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <Outlet />
    </div>
  );
}