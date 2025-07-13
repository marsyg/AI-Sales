import { Attendee } from '@prisma/client'
import { Badge } from 'lucide-react'
import React from 'react'
import UserInfoCard from './UserInfoCard'

type Props = {
    title: string
    users: Attendee[]
    tags: string[] // Change tags to string[]
    count: number
}

const PipelineLayout = ({ title, users, tags, count }: Props) => {
    return (
        <div className='flex-shrink-0  w-[350px] p-5 border  border-border  bg-background/10 rounded-xl backdrop-blur-2xl '>
            <div className='flex items-center  justify-between  mb-4 '>
                <h2 className='font-medium'>{title} </h2>
                <Badge  >{count}</Badge>
            </div>
            <div className='space-y-3  max-h-[70vh] overflow-y-auto pr-2 scrollbar-hidden'>{

                users.map((user, index) => (
                    <UserInfoCard
                        key={index}
                        customer={user}
                        tags={tags}
                    ></UserInfoCard>
                ))
            }</div>
        </div>
    )
}

export default PipelineLayout