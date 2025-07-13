import { LucideProps } from 'lucide-react'
import React, { ReactNode } from 'react'

type Props = { icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> }

function Icon({ icon }: Props) {
    return (
        <div className=' w-8 h-8 items-center rounded-xs justify-center flex bg-radial  from-purple-600 from-40% to-purple-400'>{React.createElement(icon)}</div>
    )
}

export default Icon
