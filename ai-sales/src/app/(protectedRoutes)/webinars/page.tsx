import React from 'react'
import { Tabs } from '@/components/ui/tabs'
import Home from '@/app/page'
import { HomeIcon, Webcam } from 'lucide-react'
import PageHeader from '@/components/ReusableComponents/LayoutComponents/PageHeader'
type Props = {}

const page = (props: Props) => {
    return (
        <Tabs
            defaultValue='all'
            className='w-full flex flex-col gap-8 '>
            <PageHeader
                leftIcon={<HomeIcon className='h-3 w-3'/>}
                mainIcon={<Webcam className='h-3 w-3' />}
                rightIcon={<Webcam className='h-3 w-3' />}
                heading = "The home to all your webinar "
                placeholder = "Search option"
            >
            </PageHeader>

        </Tabs>
    ) 
}

export default page