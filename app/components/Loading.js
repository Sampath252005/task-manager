import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading= () => {
  return (
    <div className="w-[300px] h-[300px] flex items-center justify-center">
    <DotLottieReact
      src="https://lottie.host/3d04c3cb-f2b7-4217-89a4-771573b48d89/bR6OqKy26R.lottie"
      loop
      autoplay
    />
    </div>
  );
};
export default Loading;
