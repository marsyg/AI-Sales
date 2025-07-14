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
    link: '/leads',
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
export const leadData = [
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '124-567-8900',
    tags: ['New Customer', 'Tag1', 'Tag2']
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    phone: '555-123-4567',
    tags: ['Returning', 'VIP', 'Newsletter']
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@samplemail.com',
    phone: '333-888-9999',
    tags: ['Lead', 'Tag3']
  },
  {
    name: 'Alice Brown',
    email: 'aliceb@example.com',
    phone: '111-222-3333',
    tags: ['Customer', 'Trial']
  },
  {
    name: 'David Wilson',
    email: 'david.wilson@mail.com',
    phone: '777-666-5555',
    tags: ['New Customer', 'Follow-up']
  }
];
