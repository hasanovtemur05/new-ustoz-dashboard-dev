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
  ShieldQuestion,
  ChevronDown,
} from 'lucide-react';
import { Button } from 'components/ui/button';
import { cn } from 'utils/styleUtils';
import { useContext, useState } from 'react';
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
  '/market-promocode': [UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN],
  '/market-tasks': [UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN],
  '/orders': [UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN],
  '/vacancy': [UserRole.SUPER_ADMIN],
  '/meeting': [UserRole.SUPER_ADMIN],
  '/fortuna-product': [UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN],
  '/fortuna-promocode': [UserRole.SUPER_ADMIN],
  '/lesson-reward': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
  '/lesson-reward-promocode': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
  '/add-reward-to-lessons': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
  '/survey': [UserRole.SUPER_ADMIN, UserRole.COURSE_ADMIN],
};

const SideNav = ({ isSideNavOpen }: IProps) => {
  const { userData } = useContext(UserContext);
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const menuItems = [
    {
      title: 'Statistika',
      icon: BarChart,
      link: '/',
    },
    {
      groupId: 'courses',
      title: 'Kurslar',
      icon: BookAudio,
      items: [
        { title: 'Ustozlar', link: '/teachers' },
        { title: 'Kurslar', link: '/courses' },
        { title: 'Kurs Assistant', link: '/course-assistants' },
      ]
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
      groupId: 'certificates',
      title: 'Sertifikatlar',
      icon: ShieldCheck,
      items: [
        { title: 'Sertifikatlar', link: '/certificate' },
        { title: 'Talabalar Sertifikatlari', link: '/user-certificate' },
      ]
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
      groupId: 'shop',
      title: "Do'kon",
      icon: ShoppingBag,
      items: [
        { title: 'Kategoriyalar', link: '/category' },
        { title: 'Market Vazifalari', link: '/market-tasks' },
        { title: 'Market Promocode', link: '/market-promocode' },
        { title: 'Buyurtmalar', link: '/orders' },
      ]
    },
    {
      title: 'Donation',
      icon: HandCoins,
      link: '/donation',
    },
    {
      groupId: 'premium',
      title: 'Premium',
      icon: BadgeCheck,
      items: [
        { title: 'Premium Plan', link: '/premium-plan' },
        { title: 'Premium', link: '/premium' },
      ]
    },

    {
      groupId: 'promocodes',
      title: 'Promocodlar',
      icon: TicketPercent,
      items: [
        { title: 'Promocode', link: '/promocode' },
        { title: 'Market Promocode', link: '/market-promocode' },
        { title: 'Baraban promocode', link: '/fortuna-promocode' },
        { title: 'Darslar promocode', link: '/lesson-reward-promocode' },
      ]
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
      groupId: 'gifts',
      title: "Sovg'alar",
      icon: Gift,
      items: [
        { title: "Baraban sovg'alari", link: '/fortuna-product' },
        { title: "Darslar sovg'alari", link: '/lesson-reward' },
        { title: "Darslarga sovg'a qo'shish", link: '/add-reward-to-lessons' },
      ]
    },
      {
      title: "So'rovnomalar",
      icon: ShieldQuestion ,
      link: '/survey',
    },
  ];

  const hasPermission = (item: any): boolean => {
    if (!userData?.role) return false;
    if (userData.role === UserRole.SUPER_ADMIN) return true;
    
    if (item.link) {
      return routePermissions[item.link]?.includes(userData.role) || false;
    }
    
    if (item.items) {
      return item.items.some((subItem: any) => 
        routePermissions[subItem.link]?.includes(userData.role)
      );
    }
    
    return false;
  };

  const filteredMenuItems = menuItems.filter(hasPermission);

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
          <div key={index}>
            {item.items ? (
              <div>
                <Button
                  variant="ghost"
                  onClick={() => toggleGroup(item.groupId)}
                  className={`w-full ${isSideNavOpen ? 'justify-between' : 'justify-center'} dark:text-white rounded`}
                >
                  <div className="flex items-center">
                    <item.icon className="size-5 stroke-[1.3px]" />
                    {isSideNavOpen && <span className="ml-3">{item.title}</span>}
                  </div>
                  {isSideNavOpen && (
                    <ChevronDown
                      className={`size-4 transition-transform ${
                        expandedGroups[item.groupId] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Button>
                {expandedGroups[item.groupId] && isSideNavOpen && (
                  <div className="pl-4 flex flex-col gap-1">
                    {item.items.map((subItem: any, subIndex: number) => (
                      <NavLink
                        to={subItem.link}
                        key={subIndex}
                        className={({ isActive }) =>
                          cn(
                            { 'bg-secondary': isActive },
                            'dark:text-white rounded block text-sm'
                          )
                        }
                      >
                        <Button variant="ghost" className="w-full justify-start py-1 h-8">
                          <span>{subItem.title}</span>
                        </Button>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  cn({ 'bg-secondary': isActive }, 'dark:text-white rounded block')
                }
              >
                <Button
                  variant="ghost"
                  className={`w-full ${isSideNavOpen ? 'justify-start' : 'justify-center'}`}
                >
                  <item.icon className="size-5 stroke-[1.3px]" />
                  {isSideNavOpen && <span className="ml-3">{item.title}</span>}
                </Button>
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideNav;