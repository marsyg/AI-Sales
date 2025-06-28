import { Home, Video, Users, Bot, Circle } from 'lucide-react';

export const sidebarData = [
  {
    id: 1,
    title: 'Home',
    icon: Home,
    link: '/home',
  },
  {
    id: 2,
    title: 'Webinars',
    icon: Video,
    link: '/webinars',
  },
  {
    id: 3,
    title: 'Leads',
    icon: Users,
    link: '/lead',
  },
  {
    id: 4,
    title: 'AI Agents',
    icon: Bot,
    link: '/ai-agents',
  },
];
export const OnBoardingSteps = [
  {
    id: 1,
    title: 'Create your webinar',
    icon: Circle,
    complete: false,
    link: '/webinars/create',
  },
  {
    id: 2,
    title: 'Get Leads',
    icon: Circle,
    complete: false,
    link: '/leads',
  },
  {
    id: 3,
    title: 'Conversion Status',
    icon: Circle,
    complete: false,
    link: '/conversion-status',
  },
];
