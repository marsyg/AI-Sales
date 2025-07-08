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

type Props = {};

function CreateWebinar({ }: Props) {
  const { isModalOpen, setModalOpen, isComplete, setComplete } = useWebinarStore();
  const steps = [
    {
      id: 'basicInfo',
      title: 'Basic Information',
      description: 'Please fill out the standard info needed for your webinar',
      component: BasicInfoStep
    }
  ]
  const handleComplete = (webinarId: string) => {
    setComplete(true)
    setWebinarLink(`${process.env.NEXT_PUBLIC_URL}/live-webinar/${webinarId}`)
  }
  const [webinarLink, setWebinarLink] = useState('')
  return (
    <Dialog
      open={isModalOpen} // Set to true to open the dialog by default
      onOpenChange={setModalOpen} // Function to control the open state
     
    >
      <DialogTrigger className='bg-primary text-primary-foreground hover:bg-primary/90' asChild>
        <Button className='rounded-2xl  flex gap-2 items-center hover' onClick={() => { setModalOpen(true) }}><Plus /> Create Webinar </Button>
      </DialogTrigger>
      <DialogContent>
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

