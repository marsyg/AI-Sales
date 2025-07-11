import React from 'react'
import { Webinar } from '@prisma/client'
import { Link } from 'lucide-react'
import Image from 'next/image'
type Props = {
    webinar: Webinar
}

function WebinarCard({ webinar }: Props) {
    return (
        <div className='flex flex-col items-start w-full'>
            <Link
                className='w-full max-w-[400px]'
                href={
                    `/live-webinar/${webinar?.id}`

                }>
                <Image src={''} alt='webinar' width={400} height={100}
                    className='rounded-md w-[400px]'>
                </Image>
            </Link>
            <div className=' w-full flex justify-center items-center gap-3 '>
                <Link href={
                    `/live-webinar/${webinar?.id}`

                }>
                    <div>
                        <p>{webinar.title}</p>
                        <p>

                            {webinar.title}
                        </p>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default WebinarCard