import React from 'react'
import { Attendee } from '@prisma/client'
type Props = {
    customer: Attendee,
    tags: string[],
    className?: string
}

function UserInfoCard({ customer, tags, className }: Props) {
    return (
        <div className='flex flex-col w-fit  text-primary  p-3  pr-10  gap-3  rounded-xl border-border  border-[0.5px]  backdrop-blur-[20px]' >

            <h3 className='font-semibold text-xs'>{customer.name} </h3>
            <p className='text-sm '>{customer.email}</p>
            <div className='flex gap-2 flex-wrap '>{
                tags.map((tag, index) => (
                    <span key={index} className='text-foreground px-3 py-1 rounded-md   border-border'>{tag}</span>
                ))
            }</div>
        </div>
    )
}

export default UserInfoCard