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

type Props = {};

function CreateWebinar({}: Props) {
    const {isModalOpen, setModalOpen} = useWebinarStore();
  return (
    <Dialog
    open = {isModalOpen} // Set to true to open the dialog by default
    onOpenChange={setModalOpen} // Function to control the open state
    >
      <DialogTrigger className='bg-primary text-primary-foreground hover:bg-primary/90'>
       <Button onClick={()=>{setModalOpen(true)}}> </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new webinar</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new webinar.
          </DialogDescription>
        </DialogHeader>
        {/* Add form fields here */}
        <DialogFooter>
          <DialogClose className='bg-secondary text-secondary-foreground hover:bg-secondary/90'>
            Cancel
          </DialogClose>
          <button className='bg-primary text-primary-foreground hover:bg-primary/90'>
            Create Webinar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWebinar;
