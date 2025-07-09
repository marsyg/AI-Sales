import useWebinarStore from '@/store/useWebinarStore';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, ChevronRight, ChevronRightIcon, Loader2 } from 'lucide-react';
import { Separator } from '@radix-ui/react-context-menu';
import { Button } from '@/components/ui/button';
import { createWebinar } from '@/actions/webinar';
import { toast } from 'sonner';
import { Chevron } from 'react-day-picker';
import { useEffect } from 'react';
import { FormStepId } from '@/lib/type';

interface Step {
  id: FormStepId;
  title: string;
  description: string;
  component: React.ComponentType;
}
type Props = {
  steps: Step[];
  onComplete: (id: FormStepId) => void;
};

export default function MultiFormStep({ steps, onComplete }: Props) {
  const { formData, validateStep, isSubmitting, setSubmitting, setModalOpen ,getStepValidationErrors } =
    useWebinarStore();


  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  useEffect(() => {
    console.log(currentStepIndex)
  }, [currentStepIndex])
  const handleBack = () => {
    if (isFirstStep) {
      setModalOpen(false);``
    } else {
      setCurrentStepIndex(currentStepIndex - 1)
      setValidationError(null)
    }
  }
  const handleNext = async () => {
    try {
      setValidationError(null);
      console.log('Current step:', currentStep.id);

      
      const isValid = validateStep(currentStep.id as keyof typeof formData);
      console.log('Validation result:', isValid);
      const errors = getStepValidationErrors(currentStep.id);
      console.log('Validation errors:', errors);
      if (!isValid) {
        console.log('Validation failed for step:', currentStep.id);
        const firstError = Object.values(errors || {})[0]?.[0];
        if (firstError) {
          setValidationError(firstError);
          toast.error(`Validation error: ${firstError}`);
        }
        return;
      }
      
      if (!completedSteps.includes(currentStep.id)) {
        setCompletedSteps([...completedSteps, currentStep.id]);
      }

      if (isLastStep) {
        try {
          setSubmitting(true);
          const result = await createWebinar(formData);
          if (result?.status === 200 && result.webinarId) {
            toast.success('Webinar created successfully');
            onComplete(result.webinarId);
          } else {
            const errorMessage = result?.message || 'There was an error creating your webinar';
            toast.error(errorMessage);
            setValidationError(errorMessage);
          }
        } catch (error) {
          console.error('Error creating webinar:', error);
          const errorMessage = error instanceof Error ? error.message : 'Failed to create webinar. Please try again';
          toast.error(errorMessage);
          setValidationError(errorMessage);
        } finally {
          setSubmitting(false);
        }
      } else {
        setCurrentStepIndex(currentStepIndex + 1);
      }
    } catch (error) {
      console.error('Validation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setValidationError(errorMessage);
      toast.error(errorMessage);
    }
  };
  
  return (
    <div className='flex flex-col h-full '>
      <div className='flex flex-col md:flex-row gap-6 h-full overflow-hidden'>
        <div className='w-full  md:w-1/3 p-4 border-r border-gray-200 overflow-y-auto'>
          <div className='flex flex-col space-y-6'>
            {
              steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                const isActive = currentStep.id === step.id;
                const isCurrent = currentStepIndex === index;
                const isPast = index < currentStepIndex;
                return (
                  <div key={step.id} className='relative'>
                    <div className='flex items-center space-x-3'>
                      <div className=''
                      >
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                          initial={false}

                          animate={

                            {
                              background: isCurrent || isCompleted ? 'rgb(147,51, 200)' : 'rgb(209,213,219)'
                              , scale: [isCurrent && !isCompleted ? 0.8 : 1, 1]
                            }}
                          transition={{ duration: 0.2, delay: index * 0.1 }}
                        >
                          <AnimatePresence mode='wait'>
                            {
                              isCompleted ?
                                (<motion.div key='check'
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.5 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Check className='w-5 h-5  text-white'></Check>
                                </motion.div>) : (
                                  <motion.div key='check'
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Check className='w-5 h-5  text-white/50'></Check>
                                  </motion.div>
                                )
                            }
                          </AnimatePresence>
                        </motion.div>
                        {
                          index < steps.length - 1 && (
                            <div className='absolute top-full left-4  -translate-x-1/2 w-0.5 h-12 bg-gray-400'>

                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: isPast || isCompleted ? '100%' : '0%' }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                className='w-full h-full'
                              />

                            </div>
                          )
                        }
                      </div>
                      <div className='flex  w-full flex-col'>
                        <motion.h3
                          animate={{
                            color: isCurrent || isCompleted ? 'rgb(0, 0, 0)' : 'rgb(107, 114, 128)'
                          }}
                          transition={{ duration: 0.3 }}>
                          {step.title}
                        </motion.h3>

                        <div className='text-xs text-gray-500'>
                          {step.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              )
            }
          </div>
        </div>
        <Separator className='data-[orientation-vertical]:h-1/2 ' />
        <div className="flex flex-col flex-1 min-h-0 px-4">
          <AnimatePresence>
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              key={currentStep.id}
              exit={{ x: -20, opacity: 0 }}
              initial={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='w-full'
            >
              <div className='w-full flex-grow flex flex-col min-w-[330px]'>
                <h1 className='text-xl w-full  font-semibold'>{currentStep.title}</h1>
                <div className='w-full m-2'>{currentStep.description}</div>
              </div>
              {
                <currentStep.component />
              }
              {
                validationError && (
                  <div>
                    <AlertCircle><p>{validationError}</p></AlertCircle>
                  </div>
                )
              }
            </motion.div >
          </AnimatePresence>
        </div>
      </div>
      <div className='flex flex-row p-2 w-full justify-between '>
        <Button
          onClick={handleBack}
          disabled={isSubmitting}
          className=''
        >{
            isFirstStep ? 'Cancel' : 'Back'
          }</Button>
        <Button
          disabled={isSubmitting}
          onClick={handleNext}
        >
          {
            isLastStep ? (isSubmitting ? (<><Loader2 />Creating..</>) : ('Complete')) : ('Next')
          }
          {!isLastStep && <ChevronRight className='ml-1 h-4 w-4'></ChevronRight>}
        </Button>
      </div>
    </div>
  );
}