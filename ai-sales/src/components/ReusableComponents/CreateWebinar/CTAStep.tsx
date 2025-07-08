import React, { ReactEventHandler } from 'react'
import useWebinarStore from '@/store/useWebinarStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CtaTypeEnum } from '@prisma/client'
type Props = {}

function CTAStep({ }: Props) {
    const [tagInput, setTagInput] = useState('')
    const { formData, updateCTAFields, getStepValidationErrors, addTag, removeTag } = useWebinarStore()

    const { ctaType, ctaLabel, tags, aiAgent, priceId, } = formData.cta
    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key == 'Enter' && tagInput.trim()) {
            e.preventDefault()
            addTag(tagInput.trim())
            setTagInput('')
        }
    }
    const errors = getStepValidationErrors('cta')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        updateCTAFields(name as keyof typeof formData.cta, value)
    }
    function handleSelectCTAType(value: string) {
        updateCTAFields('ctaType', value as CtaTypeEnum)
    }

    return (
        <div className="space-y-6">
            <div
                className='space-y-2'
            >
                <Label
                    htmlFor='ctaLabel'
                    className={errors.ctaLabel && 'text-red-400'}
                >
                    CTA LABEL  <span className={errors.ctaLabel && 'text-red-400'}>*</span>
                </Label>
                <Input
                    id='ctaLabel'
                    value={ctaLabel || ''}
                    name='ctaLabel'
                    onChange={handleChange}
                    placeholder='Lets get started '
                    className={` ${'text-gray-500 border border-input  pl-9'} ${errors.ctaLabel && 'border-red-400 focus-visible:ring-red-400'} `}
                />
                {errors.ctaLabel && <p className='text-sm text-red-400'>{errors.ctaLabel}</p>}
            </div>
            <div
                className='space-y-2'
            >
                <Label

                    htmlFor='ctaLabel'
                    className={errors.ctaLabel && 'text-red-400'}
                >
                    TAGS  <span className={errors.ctaLabel && 'text-red-400'}>*</span>
                </Label>
                <Input
                    onKeyDown={handleAddTag}
                    id='tags'
                    value={tagInput || ''}
                    name='ctaLabel'
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder='Lets get started '
                    className={` ${'text-gray-500 border border-input  pl-9'} ${errors.ctaLabel && 'border-red-400 focus-visible:ring-red-400'} `}
                />
                {(tags && tags.length > 0) && (
                    <div className='flex flex-wrap gap-2'>
                        {tags.map((tag: string, index: number) => (

                            <div
                                key={index}
                                className='flex items-center gap-1  px-3 py-1 '
                            >
                                {tag}
                                {/* ABHi YHA PE TAG KO REMOVE KARNE KA FUNCTION DALNA HAI  */}
                                <Button onClick={() => { removeTag(tag) }}> <X className='h-3 w-3'></X> </Button>
                            </div>

                        ))}
                    </div>
                )}
            </div>
            <div className='space-y-2'>
                <Label>CTA</Label>
                <Tabs
                    defaultValue={CtaTypeEnum.BOOK_A_CALL}
                    className='w-full'
                >

                    <TabsList className='w-full bg-transparent'>
                        <TabsTrigger
                            value={CtaTypeEnum.BOOK_A_CALL}
                            className='w-1/2 data-[state=active]: !bg-background/50'
                            onClick={() => { handleSelectCTAType(CtaTypeEnum.BOOK_A_CALL) }}
                        >
                            Book a call
                        </TabsTrigger>
                        <TabsTrigger
                            value={CtaTypeEnum.BUY_NOW}
                            className='w-1/2 data-[state=active]: !bg-background/50'
                            onClick={() => { handleSelectCTAType(CtaTypeEnum.BUY_NOW) }}
                        >Buy now</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    )
}

export default CTAStep

