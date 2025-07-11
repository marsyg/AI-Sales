'use client';
import React, { use } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CreateWebinar from '../CreateWebinar';
import { User } from '@/lib/type'
import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
type Props = { user: User };



interface HeaderProps {
  user: User;
}
function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className='w-full px-4 pt-10 top-0 z-10 flex justify-between items-center shadow-md bg-background'>
      {pathname.includes('/pipeline') ? (
        <Button
          onClick={() => {
            router.push('/webinar');
          }}
        >
          <ArrowLeft />
        </Button>
      ) : (
        <Button>{pathname.split('/')[1]}</Button>
      )}
      <div className='flex flex-row  space-x-2'>
        <div className='flex items-center justify-center '>
          <Zap ></Zap>
        </div>
        <CreateWebinar ></CreateWebinar>
      </div>
    </div>
  );
}

export default Header;
