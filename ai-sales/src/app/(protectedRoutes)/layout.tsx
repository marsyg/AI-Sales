import { onAuthenticateUser } from '@/actions/auth';
import { useUser } from '@clerk/nextjs';
import { on } from 'events';
import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from '@/components/ReusableComponents/LayoutComponents/Sidebar';
import React from 'react';
import Header from '@/components/ReusableComponents/LayoutComponents/Header';
type Props = {
  children?: React.ReactNode;
};
export const dynamic = 'force-dynamic';
const Layout = async ({ children }: Props) => {
  const userExist = await onAuthenticateUser();
  if (!userExist.user) {
    redirect('/sign-in');
  }

  return (
    <>
      <SidebarProvider>
        <div className='flex flex-row h-screen  '>
          {/* {SIDEBAR} */}
         <AppSidebar></AppSidebar>
          <div className='w-full h-screen'>
            {/* {HEADER} */}
            <Header user={userExist.user} />
            {/* {CHILDREN} */}
            <div className='flex flex-col w-full  overflow-y-auto'>
              <SidebarTrigger />
              <div className='p-4'>{children}</div>
            </div>
          </div>
        </div>
      </SidebarProvider>

    </>
  );
};
export default Layout;
