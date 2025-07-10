import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { ReactNode } from 'react'

type Props = {
    leftIcon: ReactNode
    mainIcon: ReactNode
    rightIcon: ReactNode
    children: ReactNode
    heading: string
    placeholder: string
}

const PageHeader = ({ heading, mainIcon, leftIcon, rightIcon, children, placeholder }: Props) => {
    return (
        <div className='w-full flex-col gap-8'>
            <div className='w-full flex justify-center sm:justify-between items-center gap-7 flex-wrap'>
                <p className='text-primary text-4xl font-semibold'>{heading}</p>

                <div className='relative md:mr-28 '>
                    <div className='absolute -left-4 top-3 -z-10 -rotate-45 py-3'>
                        {leftIcon}

                    </div>
                    <div className='absolute -left-4 top-3 -z-10 -rotate-45 py-3'>
                        {mainIcon}

                    </div>
                    <div className='absolute -right-4  top-3 -z-10 rotate-45 py-3'>
                        {rightIcon}

                    </div>
                </div>
            </div>
            <div className='w-full flex flex-wrap gap-6 items-center'>
                <div className='relative  w-full flex-1  md:max-w-3/4'>
                    <Search className='absolute left-3  top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400'></Search>
                    <Input></Input>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default PageHeader