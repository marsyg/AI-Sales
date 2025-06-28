import { Webinar } from '@prisma/client';
type WebinarStore = {
 
  isModalOpen: boolean;
  isComplete: boolean;
  isSubmitting: boolean;
  setModalOpen : (isModalOpen: boolean) => void;
  setComplete: (isComplete: boolean) => void;
    setSubmitting: (isSubmitting: boolean) => void;
 
};
import { create } from 'zustand';
const useWebinarStore = create<WebinarStore>((set) => ({
   
    isModalOpen: false,
    isComplete: false,
    isSubmitting: false,
    isOpen: false,
    setModalOpen: (isModalOpen) => set({ isModalOpen }),
    setComplete: (isComplete) => set({ isComplete }),
    setSubmitting : (isSubmitting) => set({ isSubmitting})
}));
export  default useWebinarStore;