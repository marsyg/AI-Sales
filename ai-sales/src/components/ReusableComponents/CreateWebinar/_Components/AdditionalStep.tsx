'use client'
import React from 'react'
import useWebinarStore from '@/store/useWebinarStore'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Info } from 'lucide-react'
type Props = {}

function AdditionalStep({ }: Props) {
    const { formData, updateAdditionalInfo, getStepValidationErrors } = useWebinarStore()
    const { lookChat, couponCode, couponEnabled } = formData.additionalInfo ?? {}
    function handleToggleLockChat(checked: boolean): void {
        updateAdditionalInfo('lookChat', checked)
    }

    function handleToggleCoupon(checked: boolean): void {
        updateAdditionalInfo('couponEnabled', checked)
    }

    function handleCouponCodeChange(event: React.ChangeEvent<HTMLInputElement>): void {
        updateAdditionalInfo('couponCode', event.target.value)
    }
    const errors = getStepValidationErrors('additionalInfo')
    return (
        <div className='space-y-8'>
            <div className='flex items-center justify-between'>
                <div className='' >
                    <Label className='text-base font-medium'>Lock Chat </Label>
                    <p className='text-sm text-gray-400'> Turn it on to make the chat visible to your users </p>
                </div>
                <Switch
                    id='lock-chat '
                    onCheckedChange={handleToggleLockChat}
                    checked={lookChat || false}
                ></Switch>
            </div>
            <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                    <div className='' >
                        <Label htmlFor='coupon-enabled' className='text-base font-medium'> Coupon Code</Label>
                        <p className='text-sm text-gray-400'> Turn it on to give discount to your viewers </p>
                    </div>
                    <Switch
                        id='=coupon-enabled'
                        onCheckedChange={handleToggleCoupon}
                        checked={couponEnabled || false}
                    ></Switch>
                </div>
                {
                    couponEnabled
                    && (
                        <div className='space-y-2'>
                            <Input
                                id='coupon-code'
                                value={couponCode || ''}
                                onChange={handleCouponCodeChange}
                                placeholder='Paste the code here'
                                className={` ${'text-gray-500 border border-input  pl-9'} ${errors.couponCode && 'border-red-400 focus-visible:ring-red-400'} `}
                            ></Input>
                            {
                                errors.couponCode && (<p className='text-sm text-red-400'>{errors.couponCode}</p>)
                            }
                            <div>
                                <Info className='h-4 w-4 mt-0.5'></Info>
                                <p>This coupon code is used to promote sale</p>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default AdditionalStep