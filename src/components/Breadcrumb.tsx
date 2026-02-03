import { Outlet, useLocation, useResolvedPath, Link } from 'react-router-dom';
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
          ],
        },
        {
          path: 'grandmasters',
          element: <Breadcrumbs text="Grandmasterlar" />,
        },
        {
          path: '/news',
          element: <Breadcrumbs text="Yangiliklar" />,
        },
        {
          path: '/books',
          element: <Breadcrumbs text="Kitoblar" />,
        },
        {
          path: '/afisha',
          element: <Breadcrumbs text="Afisha" />,
        },
        {
          path: '/review-games',
          element: <Breadcrumbs text="Tahlillar" />,
        },
        {
          path: '/live-streams',
          element: <Breadcrumbs text="Jonli efir" />,
        },
        {
          path: '/puzzles',
          element: <Breadcrumbs text="Boshqotirmalar" />,
        },
        {
          path: '/notifications',
          element: <Breadcrumbs text="Bildirishnomalar" />,
        },
      ],
    },
  ];
}

function Breadcrumbs({ text }: { text: string }) {
  const location = useLocation();
  const resolvedLocation = useResolvedPath('');
  const isActive = location.pathname === resolvedLocation.pathname;

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

// function DynamicBreadcrumbs() {
//   const params = useParams();
//   const { organizationId } = params;
//   // fetch your data any way you want
//   // here I'm using react-query
//   const { data } = useQuery([{ id: organizationId }], api.fetchOrganization);
//   const organization = data || { name: '' };
//   const text = organization.name || '-';
//   return <Breadcrumbs text={text} />;
// }
