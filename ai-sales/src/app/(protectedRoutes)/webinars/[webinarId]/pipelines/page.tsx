import React from 'react'
import PageHeader from '@/components/ReusableComponents/LayoutComponents/PageHeader'
import { HomeIcon, Webcam } from 'lucide-react'
import { pipeline } from 'stream'
type Props = {
    params: Promise<{ webinarId: string }>
}

const page = async ({ params }: Props) => {
    const { webinarId } = await params
    return (
        <div className='w-full flex flex-col gap-8'>
            <PageHeader
                leftIcon={<HomeIcon className='h-4 w-4' />}
                mainIcon={<Webcam className='h-5 w-5' />}
                rightIcon={<Webcam className='h-4 w-4' />}
                heading="Keep Track  of all your customers  "

                placeholder="Search option"   >
                <div className='flex overflow-x-auto  pb-4  gap-4  md:gap-6 '>

                    {
                        Object.entries(pipelineData.data).map(([columnType, columnData]) => {
                            <PipelineLayout
                                key={columnType}
                                title={formdataCouloumnTitle(columnType as AttendenceTypeEnum)}
                                count={columnData.count}
                                users={columnData.users}
                                tags={columnData.webinarTags}
                            ></PipelineLayout>
                        })
                    }
                </div>
            </PageHeader>
        </div>
    )
}

export default page

