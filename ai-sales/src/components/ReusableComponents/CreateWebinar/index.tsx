import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import useWebinarStore from '@/store/useWebinarStore';
import React from 'react';
import { Component, Plus } from 'lucide-react';
import { useState } from 'react';
import MultiFormStep from './_Components/MultiFormStep';
import BasicInfoStep from './_Components/BasicInfoStep';
import CTAStep from './_Components/CTAStep';
import AdditionalStep from './_Components/AdditionalStep';
import { FormStepId } from '@/lib/type';
import { createWebinar } from '@/actions/webinar';
type Props = {};

function CreateWebinar({ }: Props) {
  const { isModalOpen, setModalOpen, isComplete, setComplete } = useWebinarStore();
  const steps = [
    {
      id: 'basicInfo' as FormStepId,
      title: 'Basic Information',
      description: 'Please fill out the standard info needed for your webinar',
      component: BasicInfoStep
    },
    {
      id: 'cta' as FormStepId,
      title: 'CTA',
      description: 'Please provide the endpoint for your customer through  your webinar',
      component: CTAStep
    },
    {
      id: 'additionalInfo' as FormStepId,
      title: 'Additional Information',
      description: 'Please provide additional  information (if necessary) for your  webinar',
      component: AdditionalStep
    }
  ]
  const handleComplete = (webinarId: string) => {
    setComplete(true)
    setWebinarLink(`${process.env.NEXT_PUBLIC_URL}/live-webinar/${webinarId}`)
  }
  const [webinarLink, setWebinarLink] = useState('')
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setModalOpen}

    >
      <DialogTrigger className='bg-primary text-primary-foreground hover:bg-primary/90' asChild>
        <Button className='rounded-2xl m-2 flex gap-2 items-center hover' onClick={() => { setModalOpen(true) }}><Plus /> Create Webinar </Button>
      </DialogTrigger>
      <DialogContent className=' sm:max-w-[800px] w-[95vw] max-h-[90vh] mx-auto p-2'>
        {
          isComplete ? (<div className='bg-muted text primary rounded-lg overflow-hidden'>
            <DialogTitle>Webinar Created </DialogTitle>
          </div>) : (
            <>
              <DialogTitle>Create Webinar</DialogTitle>
              <MultiFormStep
                steps={steps}
                onComplete={handleComplete}

              ></MultiFormStep>
            </>
          )
        }
      </DialogContent>
    </Dialog>
  );
}

export default CreateWebinar;

