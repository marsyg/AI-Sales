import { Attendance, Attendee, CtaTypeEnum } from '@prisma/client';
export type ValidationResult = {
  valid: boolean;
  errors: ValidationErrors;
};
export type FormStepId = 'basicInfo' | 'cta' | 'additionalInfo';

export const validateBasicInfo = (data: {
  webinarName?: string;
  description?: string;
  date?: Date;
  time?: string;
  timeFormat?: 'AM' | 'PM';
}): ValidationResult => {
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
  } else {
    const timeRegex = /^(0?[1-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(data.time)) {
      errors.time = ['Time must be in the format HH:MM (24-hour format)'];
    }
  }
  if (!data.timeFormat) {
    errors.timeFormat = ['Time format is required'];
  }

  return { valid: Object.keys(errors).length === 0, errors };
};
export const validateCTAFields = (data: {
  ctaLabel?: string;
  ctaType: CtaTypeEnum;
  tags?: string[];
  aiAgent?: string;
  priceId?: string;
}): ValidationResult => {
  const errors: ValidationErrors = {};

  if (!data.ctaLabel) {
    errors.ctaLabel = ['CTA label is required'];
  }
  if (!data.ctaType) {
    errors.ctaType = ['CTA type is required'];
  }

  return { valid: Object.keys(errors).length === 0, errors };
};

export const validateAdditionalInfo = (data: {
  lookChat?: boolean;
  couponCode?: string;
  couponEnabled?: boolean;
}): ValidationResult => {
  const errors: ValidationErrors = {};

  if (!data.lookChat) {
    errors.lookChat = ['Look chat is required'];
  }
  if (!data.couponCode) {
    errors.couponCode = ['Coupon code is required'];
  }
  if (!data.couponEnabled) {
    errors.couponEnabled = ['Coupon enabled is required'];
  }

  return { valid: Object.keys(errors).length === 0, errors };
};
export type ValidationErrors = Record<string, string[]>;
export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  clerkId: string;
  email: string;
  profileImage: string;
  stripeConnectId: string | null;
  lastLoginAt: Date | null;
  subscription: boolean;
  stripeCustomerId: string | null;
};
export type AttendanceData = {
  count: number;
  users: Attendee[];
};
