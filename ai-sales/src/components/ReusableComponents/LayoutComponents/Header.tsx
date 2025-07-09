'use client';
import React, { use } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CreateWebinar from '../CreateWebinar';

import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
type Props = {};

function Header() {
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
      <div>
        <Zap></Zap>
        <CreateWebinar></CreateWebinar>
      </div>
    </div>
  );
}

export default Header;
