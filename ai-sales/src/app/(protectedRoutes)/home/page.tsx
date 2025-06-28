import React from 'react';
import OnBoarding from './_components/OnBoarding';
import { Card } from '@/components/ui/card';
import { Upload, Camera, Video } from 'lucide-react';
function Page() {
  return (
    <div className='flex-col flex h-screen'>
      <div className='flex flex-row'>
        <div>
          <OnBoarding></OnBoarding>
        </div>
        <Card className='mx-4 w-96 relative'>
          <div className='flex justify-end  pr-4 '>
            <Upload></Upload>
          </div>
          <div className='bottom-1  absolute  text-center text-2xl justify-center flex'>
            Browse or drag a pre-recorder webinar file
          </div>
        </Card>
        <Card className='mx-4 relative flex w-96'>
          <div className='flex justify-end pr-4'>
            <Camera></Camera>
          </div>
          <div className='bottom-1 absolute justify-center text-2xl text-center flex'>
            Browse or drag a pre-recorder webinar file
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Page;
