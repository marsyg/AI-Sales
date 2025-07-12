'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { sidebarData } from '@/lib/data';
import Link from 'next/link';
import Icon from '../Icon';
import { UserButton } from '@clerk/nextjs';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { icons } from 'lucide-react';
type Props = {

}
function Sidebar(props: Props) {
  const pathname = usePathname();

  return (
    <>
      <div className=' flex relative max-w-2xs w-72 flex-col bg-slate-300'>
        {sidebarData.map((item) => (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.link}
                  className={`flex items-center gap-2 p-2 cursor-pointer text-slate-800 hover:bg-slate-200 transition-colors duration-200 rounded-md ${pathname.includes(item.link) ? 'bg-slate-200' : ''
                    }`}
                >
                  <Icon icon={item.icon}></Icon>
                  <span className='hidden text-2xl sm:inline'>
                    {item.title}
                  </span>
                </Link>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        ))}
        <div className=' absolute  flex bottom-0 items-center justify-center w-full p-2'>
          <UserButton></UserButton>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
