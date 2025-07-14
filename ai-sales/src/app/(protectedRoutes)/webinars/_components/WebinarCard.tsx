import React from 'react'
import { Webinar } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Rows3 } from 'lucide-react'
type Props = {
    webinar: Webinar
}

function WebinarCard({ webinar }: Props) {
    return (
        <div className='flex rounded-2xl bg-gray-100 flex-col items-start w-full'>
            <Link
                className='w-full max-w-[400px]'
                href={
                    `/live-webinar/${webinar?.id}`

                }>
                <Image src={''} alt='webinar' width={400} height={100}
                    className='rounded-md w-[400px]'>
                </Image>
            </Link>
            <div className=' w-full flex justify-start p-2  bg-gray-200 items-center gap-3 '>
                <Link href={
                    `/live-webinar/${webinar?.id}`
                }
                    className='w-full max-w-[400px]'>
                    <div>
                        <p className="text-sm text-primary font-semibold">{webinar.title}</p>
                        <p className="text-sm text-muted-foreground">
                            {webinar.description}
                        </p>
                    </div>
                </Link>
                <Link href={`/webinars/${webinar?.id}/pipelines `}
                    className='flex items-center justify-center  w-6 h-6 p-1 border-border  rounded-md border-[0.5px]'
                >
                    <Rows3></Rows3>
                </Link>
            </div >
        </div >
    )
}

export default WebinarCard