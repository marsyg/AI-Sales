import React from 'react'
import PageHeader from '@/components/ReusableComponents/LayoutComponents/PageHeader'
import { HomeIcon, Webcam, User2, Badge } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { leadData } from '@/lib/data'

type Props = {}

function Page({ }: Props) {
    return (
        <div className='flex  w-full flex-col gap-8'>
            <PageHeader
                leftIcon={<Webcam className='w-4 h-4' />}
                mainIcon={<User2 className='w-12 h-12' />}
                rightIcon={<HomeIcon className='w-4 h-4' />}
                heading='All your leads at one place'
                placeholder=''
                children ={undefined}
            >
                
            </PageHeader>
            <Table className=''>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Tags</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {leadData?.map((lead, idx) => (
                        <TableRow key={idx} className='border-0'>
                            <TableCell>{lead?.name}</TableCell>
                            <TableCell>{lead?.email}</TableCell>
                            <TableCell>{lead?.phone}</TableCell>
                            <TableCell className='space-x-2'>
                                {lead?.tags?.map((tag, tagIdx) => (
                                    <Badge key={tagIdx}>{tag}</Badge>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Page
