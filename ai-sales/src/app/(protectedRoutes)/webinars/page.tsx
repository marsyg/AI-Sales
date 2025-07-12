import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Home from '@/app/page'
import { Divide, HomeIcon, Webcam } from 'lucide-react'
import PageHeader from '@/components/ReusableComponents/LayoutComponents/PageHeader'
import { onAuthenticateUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { getWebinarBypresnterId } from '@/actions/webinar'
import WebinarCard from './_components/WebinarCard'
import { Webinar } from '@prisma/client'
type Props = {}

const page = async (props: Props) => {
    const userExist = await onAuthenticateUser();
    if (!userExist.user) {
        redirect('/sign-in');
    }

    const webinars = getWebinarBypresnterId(userExist?.user?.id);
    return (
        <Tabs
            defaultValue='all'
            className='w-full flex flex-col gap-8 '>
            <PageHeader
                leftIcon={<HomeIcon className='h-4 w-4' />}
                mainIcon={<Webcam className='h-5 w-5' />}
                rightIcon={<Webcam className='h-4 w-4' />}
                heading="The home to all your webinar "

                placeholder="Search option"   >
                <TabsList className='bg-transparent  space-x-3'>
                    <TabsTrigger value='all' className='bg-secondary opacity-50 data-[state-active]:opacity-100 px-8 py-4 '>All</TabsTrigger>
                    <TabsTrigger value='upcoming' className='bg-secondary  px-8 py-4 '>Upcoming</TabsTrigger>
                    <TabsTrigger value='ended' className='bg-secondary  px-8 py-4 '>Ended</TabsTrigger>
                </TabsList>

            </PageHeader>
            <TabsContent value='all' className='w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 place-items-center place-content-start  gap-x-6 gap-y-10'>
                {(await webinars)?.length > 0 ? ((await webinars).map((webinar: Webinar, index: number) => (<WebinarCard key={index} webinar={webinar}></WebinarCard>))) : (
                    <div className='w-full h-[200] flex justify-center items-center text-primary font-semibold  text-2xl'>No content found </div>
                )}
            </TabsContent>

        </Tabs >
    )
}

export default page