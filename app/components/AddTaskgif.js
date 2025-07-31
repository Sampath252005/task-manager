import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AddTaskgif = () => {
  return (
    <div className="md:flex items-center justify-center hidden  md:h-[250px] lg:h-[300px] w-full">
      <video
        src="/taskmanagement.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-75 w-75"
      />
    </div>
  );
};
export default AddTaskgif;  