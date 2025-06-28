import React from 'react';
import { Card } from '@/components/ui/card';
import { OnBoardingSteps } from '@/lib/data';
import { on } from 'events';
type Props = {};

function OnBoarding({}: Props) {
  return (
    <div className='w-80'>
      <div className='text-4xl'>Get your maximum conversions from webinars</div>
      {OnBoardingSteps.map((step, index) => (
        <div className='' key={index}>
          <div className='flex flex-row'>
            <step.icon />
            <div className='text-2xl'>{step.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OnBoarding;
