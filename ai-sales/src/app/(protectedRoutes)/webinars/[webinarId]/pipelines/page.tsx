import React from 'react'
import PageHeader from '@/components/ReusableComponents/LayoutComponents/PageHeader'
import { HomeIcon, Webcam } from 'lucide-react'
import { formatColumnTitle } from './_components/utils'
import { getWebinarAttendance } from '@/actions/attendence'
import { Rows3 } from 'lucide-react'
import PipelineLayout from './_components/PipelineLayout'
import { AttendedTypeEnum } from '@prisma/client'
type Props = {
    params: Promise<{ webinarId: string }>
}

const page = async ({ params }: Props) => {
    const { webinarId } = await params
    const pipelineData = await getWebinarAttendance(webinarId)
    if (!pipelineData) {
        return <div>No Pipelines Found </div>
    }
    return (
        <div className='w-full flex flex-col gap-8'>
            <PageHeader
                leftIcon={<HomeIcon className='h-4 w-4' />}
                mainIcon={<Rows3 className='h-5 w-5' />}
                rightIcon={<Webcam className='h-4 w-4' />}
                heading="Keep Track  of all your customers  "

                placeholder="Search option"   >
                <div className='flex overflow-x-auto  flex-wrap pb-4  gap-4  md:gap-6 '>

                    {
                        Object.entries(pipelineData.data).map(([columnType, columnData]) => (
                            <PipelineLayout
                                key={columnType}
                                title={formatColumnTitle(columnType as AttendedTypeEnum)}
                                count={columnData.count}
                                users={columnData.users}
                                tags={pipelineData.webinarTag}
                            />
                        ))
                    }

                </div>
            </PageHeader>
        </div>
    )
}

export default page

