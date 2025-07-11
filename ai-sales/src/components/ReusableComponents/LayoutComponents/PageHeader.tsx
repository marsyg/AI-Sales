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

                <div className='relative  justify-center items-center  md:mr-28 '>
                    <div className='absolute left-2 top-2 -rotate-12 z-0  w-8 h-8 items-center justify-center flex bg-radial  from-red-600 from-40% to-red-400  rounded-xs '>
                        {leftIcon}

                    </div>
                    <div className='relative w-8 h-8 items-center justify-center flex bg-radial  from-red-600 from-40% to-red-400  rounded-xs z-10 mt-4    '>
                        {mainIcon}

                    </div>
                    <div className='absolute right-2 top-2 rotate-12 z-1  w-8 h-8 items-center justify-center flex bg-radial  from-red-600 from-40% to-red-400  rounded-xs  '>
                        {rightIcon}

                    </div>
                </div>
            </div>
            <div className='w-full flex flex-wrap gap-6   items-center'>
                <div className='relative  w-full flex-1  flex-row md:max-w-3/4'>
                    <Search className='absolute left-3  top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400'></Search>
                    <Input></Input>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default PageHeader