import { ValidationErrors } from '@/lib/type';
import { CtaTypeEnum, Webinar } from '@prisma/client';
import { validateBasicInfo, validateCTAFields} from '@/lib/type'
import { create } from 'zustand';

type WebinarStore = {
  isModalOpen: boolean;
  isComplete: boolean;
  isSubmitting: boolean;
  formData: WebinarFormState;   
  validation: ValidationState;
  setModalOpen: (isModalOpen: boolean) => void;
  setComplete: (isComplete: boolean) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  updateBasicInfo: <K extends keyof WebinarFormState['basicInfo']>(     
              
    key: K,
    value: WebinarFormState['basicInfo'][K]
  ) => void;
  updateCTAFields: <K extends keyof WebinarFormState['cta']>(
    key: K,
    value: WebinarFormState['cta'][K]
  ) => void;
  updateAdditionalInfo: <K extends keyof WebinarFormState['additionalInfo']>(
    key: K,
    value: WebinarFormState['additionalInfo'][K]
  ) => void;
  validateStep: (step: keyof WebinarFormState) => boolean;
  getStepValidationErrors: (step: keyof ValidationState) => ValidationErrors;
};

type ValidationState = {
  basicInfo: {
    valid: boolean;
    errors: ValidationErrors;
  };
  cta: {
    valid: boolean;
    errors: ValidationErrors;
  };
  additionalInfo: {
    valid: boolean;
    errors: ValidationErrors;
  };
};

export type WebinarFormState = {
  basicInfo: {
    webinarName?: string;
    description?: string;
    date?: Date;
    time?: string;
    timeFormat?: 'AM' | 'PM';
  };
  cta: {
    ctaLabel?: string;
    ctaType: CtaTypeEnum;
    tags?: string[];
    aiAgent?: string;
    priceId?: string;
  };
  additionalInfo?: {
    lookChat?: boolean;
    couponCode?: string;
    couponEnabled?: boolean;
  };
  updateBasicInfo: <K extends keyof WebinarFormState['basicInfo']>(
    key: K,
    value: WebinarFormState['basicInfo'][K]
  ) => void;
  updateCTAFields: <K extends keyof WebinarFormState['cta']>(
    key: K,
    value: WebinarFormState['cta'][K]
  ) => void;
  updateAdditionalInfo: <K extends keyof WebinarFormState['additionalInfo']>(
    key: K,
    value: WebinarFormState['additionalInfo'][K]
  ) => void;
  validateStep: (step: keyof WebinarFormState) => boolean;
  getStepValidationErrors: (step: keyof ValidationState) => ValidationErrors;
};

const initialValidationState: ValidationState = {
  basicInfo: { valid: false, errors: {} },
  cta: { valid: false, errors: {} },
  additionalInfo: { valid: false, errors: {} },
};

const initialState: WebinarFormState = {
  basicInfo: {
    webinarName: '',
    description: '',
    date: undefined,
    time: '',
    timeFormat: 'AM',
  },
  cta: {
    ctaLabel: '',
    ctaType: 'BOOK_A_CALL' as CtaTypeEnum,
    tags: [],
    aiAgent: '',
    priceId: '',
  },
  additionalInfo: {
    lookChat: false,
    couponCode: '',
    couponEnabled: false,
  },
  updateBasicInfo: function <K extends keyof WebinarFormState['basicInfo']>(
    key: K,
    value: WebinarFormState['basicInfo'][K]
  ): void {
    throw new Error('Function not implemented.');
  },
  updateCTAFields: function <K extends keyof WebinarFormState['cta']>(
    key: K,
    value: WebinarFormState['cta'][K]
  ): void {
    throw new Error('Function not implemented.');
  },
  updateAdditionalInfo: function <
    K extends keyof WebinarFormState['additionalInfo']
  >(key: K, value: WebinarFormState['additionalInfo'][K]): void {
    throw new Error('Function not implemented.');
  },
  validateStep: function (step: keyof WebinarFormState): boolean {
    throw new Error('Function not implemented.');
  },
  getStepValidationErrors: function (
    step: keyof ValidationState
  ): ValidationErrors {
    throw new Error('Function not implemented.');
  },
};

const useWebinarStore = create<WebinarStore>((set, get) => ({
  isModalOpen: false,
  isComplete: false,
  isSubmitting: false,
  formData: initialState,
  validation: initialValidationState,
  setModalOpen: (isModalOpen) => set({ isModalOpen }),
  setComplete: (isComplete) => set({ isComplete }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  updateBasicInfo: (field, value) =>
    set((state) => {
      const newBasicInfo = {
        ...state.formData.basicInfo,
        [field]: value,
      };
      const validationResult = validateBasicInfo(newBasicInfo);
      return {
        formData: {
          ...state.formData,
          basicInfo: newBasicInfo,
        },
        validation: {
          ...state.validation,
          basicInfo: {
            valid: validationResult.valid,
            errors: validationResult.errors,
          },
        },
      };
    }),
  updateCTAFields: (field, value) =>
    set((state) => {
      const newCTA = {
        ...state.formData.cta,
        [field]: value,
      };
      const validationResult = validateCTAFields(newCTA);
      return {
        formData: {
          ...state.formData,
          cta: newCTA,
        },
        validation: {
          ...state.validation,
          cta: {
            valid: validationResult.valid,
            errors: validationResult.errors,
          },
        },
      };
    }),
  updateAdditionalInfo: (field, value) =>
    set((state) => {
      const newAdditionalInfo = {
        ...state.formData.additionalInfo,
        [field]: value,
      };
      // Assuming validateAdditionalInfo exists or create a simple validation
      const validationResult = { valid: true, errors: {} };
      return {
        formData: {
          ...state.formData,
          additionalInfo: newAdditionalInfo,
        },
        validation: {
          ...state.validation,
          additionalInfo: {
            valid: validationResult.valid,
            errors: validationResult.errors,
          },
        },
      };
    }),
  validateStep: (stepId : keyof WebinarFormState) => {
   const {formData} = get();
   let validationResult;
   switch(stepId) {
     case 'basicInfo':
      validationResult = validateBasicInfo(formData.basicInfo);
    
      
     break;
     case 'cta':
      validationResult = validateCTAFields(formData.cta);
      break ;
     case 'additionalInfo':
       validationResult = { valid: true, errors: {} }; // Placeholder for additional info validation
        break;  
    }
    set((state) => ({
      validation: {
        ...state.validation,
        [stepId]: validationResult,
      },
    }));
    return validationResult.valid;
  },
  getStepValidationErrors: (step) => {
    const state = get();
    return state.validation[step].errors;
  },
  resetForm :()=>{
    set({
      formData: initialState,
      validation: initialValidationState,
      isModalOpen: false,
      isComplete: false,
      isSubmitting: false,
    });
  }
}));

export default useWebinarStore;
