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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"

import { icons } from 'lucide-react';
type Props = {

}
function AppSidebar(props: Props) {
  const pathname = usePathname();

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarData.map((item) => (
                  <TooltipProvider key={item.id}>
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>

                        <a href={item.link}>
                          <Icon icon={item.icon}></Icon>
                          <span className='hidden text-2xl sm:inline'>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </TooltipProvider>

                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter><UserButton></UserButton></SidebarFooter>
      </Sidebar>
      
    </>
  );
}

export default AppSidebar;
