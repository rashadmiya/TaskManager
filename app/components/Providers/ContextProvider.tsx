'use client'

import React from 'react';
import { GlobalContextProvider } from '@/app/context/globalContextProvider';
interface Props {
    children: React.ReactNode;
}

const ContextProvider = ({children}:Props) => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 250);
  }, []);

  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }
  
  return (
    <GlobalContextProvider>{children}</GlobalContextProvider>
  )
}

export default ContextProvider