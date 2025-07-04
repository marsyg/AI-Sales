import { CtaTypeEnum } from '@prisma/client';
export  type ValidationResult  = {
    valid: boolean;
    errors: ValidationErrors;
};
 
export const validateBasicInfo = (data :{
    webinarName?: string;
    description?: string;
    date?: Date;
    time?: string;
    timeFormat?: 'AM' | 'PM';
    }) :ValidationResult=> {
    const errors: ValidationErrors = {};
    if (!data.webinarName) {
        errors.webinarName = ['Webinar name is required'];
    }
    if (!data.description) {
        errors.description = ['Description is required'];
    }
    if (!data.date) {
        errors.date = ['Date is required'];
    }
    if (!data.time?.trim()) {
        errors.time = ['Time is required'];
    }else {
        const timeRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM)$/i;
        if (!timeRegex.test(data.time)) {
            errors.time = ['Time must be in the format HH:MM AM/PM'];
        }
    }
    if (!data.timeFormat) {
        errors.timeFormat = ['Time format is required'];
    }
    
    return { valid: Object.keys(errors).length === 0, errors };
}
export const validateCTAFields = (data: {
    ctaLabel?: string;
    ctaType: CtaTypeEnum;
    tags?: string[];
    aiAgent?: string;
    priceId?: string;
}):ValidationResult => {
    const errors: ValidationErrors = {};
    
    if (!data.ctaLabel) {
        errors.ctaLabel = ['CTA label is required'];
    }
    if (!data.ctaType) {
        errors.ctaType = ['CTA type is required'];
    }
    
    return { valid: Object.keys(errors).length === 0, errors };
}


export type ValidationErrors = Record<string, string[]>;