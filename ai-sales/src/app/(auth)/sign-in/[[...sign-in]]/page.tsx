import React from 'react';
import { SignIn } from '@clerk/nextjs';
function page() {
  return (
    <div>
      <SignIn></SignIn>
    </div>
  );
}

export default page;
