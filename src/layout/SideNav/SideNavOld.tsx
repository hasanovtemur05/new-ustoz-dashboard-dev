import { Link, NavLink } from 'react-router-dom';
import {
  BookAudio,
  Newspaper,
  Bell,
  BadgeInfo,
  ShieldCheck,
  BrainCircuit,
  CircleFadingPlus,
  NotebookPen,
  ShoppingBag,
  HandCoins,
  Plane,
  BadgeCheck,
  GraduationCap,
  Handshake,
  User,
  TicketPercent,
  MailQuestion,
  CalendarClock,
  BarChart,
  Bot,
  Gift,
  ListChecks,
} from 'lucide-react';
import { Button } from 'components/ui/button';
import { cn } from 'utils/styleUtils';
import { useContext } from 'react';
import { UserContext } from 'providers/UserProvider';
import { UserRole } from 'modules/auth/types';

interface IProps {
  isSideNavOpen: boolean;
}

const routePermissions: { [key: string]: UserRole[] } = {
  '/': [UserRole.SUPER_ADMIN, UserRole.STATISTICS_ADMIN],
  '/teachers': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
  '/courses': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
  '/course-assistants': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
  '/news': [UserRole.SUPER_ADMIN, UserRole.NOTIFICATION_ADMIN],
  '/puzzles': [UserRole.SUPER_ADMIN],
  '/notifications': [UserRole.SUPER_ADMIN, UserRole.NOTIFICATION_ADMIN],
  '/info': [UserRole.SUPER_ADMIN],
  '/certificate': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
  '/story': [UserRole.SUPER_ADMIN, UserRole.NOTIFICATION_ADMIN],
  '/banner': [UserRole.SUPER_ADMIN, UserRole.NOTIFICATION_ADMIN],
  '/category': [UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN],
  '/donation': [UserRole.SUPER_ADMIN],
  '/premium-plan': [UserRole.SUPER_ADMIN],
  '/premium': [UserRole.SUPER_ADMIN],
  '/user-certificate': [UserRole.SUPER_ADMIN],
  '/promocode': [UserRole.SUPER_ADMIN],
  '/market-promocode': [UserRole.SUPER_ADMIN],
  '/market-tasks': [UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN],
  '/orders': [UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN],
  '/vacancy': [UserRole.SUPER_ADMIN],
  '/meeting': [UserRole.SUPER_ADMIN],
  '/fortuna-product': [UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN],
  '/fortuna-promocode': [UserRole.SUPER_ADMIN],
  '/lesson-reward': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
  '/lesson-reward-promocode': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
  '/add-reward-to-lessons': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
};

const SideNav = ({ isSideNavOpen }: IProps) => {
  const { userData } = useContext(UserContext);

  const menuItems = [
    {
      title: 'Statistika',
      icon: BarChart,
      link: '/',
    },
    {
      title: 'Ustozlar',
      icon: User,
      link: '/teachers',
    },
    {
      title: 'Kurslar',
      icon: BookAudio,
      link: '/courses',
    },
    {
      title: 'Kurs Assistant',
      icon: Bot,
      link: '/course-assistants',
    },
    {
      title: 'Yangiliklar',
      icon: Newspaper,
      link: '/news',
    },
    {
      title: 'Bildirishnomalar',
      icon: Bell,
      link: '/notifications',
    },
    {
      title: 'Malumotlar',
      icon: BadgeInfo,
      link: '/info',
    },
    {
      title: 'Sertifikatlar',
      icon: ShieldCheck,
      link: '/certificate',
    },
    {
      title: 'Istoriyalar',
      icon: CircleFadingPlus,
      link: '/story',
    },
    {
      title: 'Bannerlar',
      icon: NotebookPen,
      link: '/banner',
    },
    {
      title: "Do'kon",
      icon: ShoppingBag,
      link: '/category',
    },
    {
      title: 'Donation',
      icon: HandCoins,
      link: '/donation',
    },
    {
      title: 'PremiumPlan',
      icon: Plane,
      link: '/premium-plan',
    },
    {
      title: 'Premium',
      icon: BadgeCheck,
      link: '/premium',
    },
    {
      title: 'Talabalar Sertifikatlari',
      icon: GraduationCap,
      link: '/user-certificate',
    },
    {
      title: 'Promocode',
      icon: TicketPercent,
      link: '/promocode',
    },
    {
      title: 'Market Promocode',
      icon: TicketPercent,
      link: '/market-promocode',
    },
    {
      title: 'Market Vazifalari',
      icon: ListChecks,
      link: '/market-tasks',
    },
    {
      title: 'Buyurtmalar',
      icon: MailQuestion,
      link: '/orders',
    },
    {
      title: 'Vakansiyalar',
      icon: Handshake,
      link: '/vacancy',
    },
    {
      title: 'Uchrashuvlar',
      icon: CalendarClock,
      link: '/meeting',
    },
    {
      title: "Baraban sovg'alar",
      icon: Gift,
      link: '/fortuna-product',
    },
    {
      title: 'Baraban promocode',
      icon: TicketPercent,
      link: '/fortuna-promocode',
    },
    {
      title: "Darslar sovg'alar",
      icon: Gift,
      link: '/lesson-reward',
    },
    {
      title: 'Darslar promocode',
      icon: TicketPercent,
      link: '/lesson-reward-promocode',
    },
    {
      title: "Darslarga sovg'a qo'shish",
      icon: TicketPercent,
      link: '/add-reward-to-lessons',
    },
  ];

  const filteredMenuItems = userData?.role
    ? menuItems.filter((item) => {
        if (userData.role === UserRole.SUPER_ADMIN) return true;
        return routePermissions[item.link]?.includes(userData.role);
      })
    : [];

  return (
    <aside className={cn({ 'w-full': isSideNavOpen }, 'sticky top-0 max-w-72 flex flex-col border-solid border-r-2 h-screen')}>
      <header className="z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2">
        <Link to="/" className={`flex h-10 items-center gap-2 px-4 dark:text-white ${isSideNavOpen ? 'justify-start' : 'justify-center'}`}>
          {isSideNavOpen && <h1 className="font-semibold">UstozAI </h1>}
          <BrainCircuit />
        </Link>
      </header>
      <div className="flex flex-col gap-1 p-2 overflow-y-auto">
        {filteredMenuItems.map((item, index) => (
          <NavLink to={item.link} key={index} className={({ isActive }) => cn({ 'bg-secondary': isActive }, 'dark:text-white rounded block')}>
            <Button variant="ghost" className={`w-full ${isSideNavOpen ? 'justify-start' : 'justify-center'}`}>
              <item.icon className="size-5 stroke-[1.3px]" />
              {isSideNavOpen && <span className="ml-3">{item.title}</span>}
            </Button>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default SideNav;
