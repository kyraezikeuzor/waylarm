import React, { useState, useEffect } from 'react';
import { ClockIcon } from 'lucide-react'

export const Clock: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Options for formatting date and time
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };

  return (
    <div className="flex flex-row gap-1 items-center justify-center px-2 text-xs lg:text-sm text-gray-600">
      <ClockIcon className='w-4 h-5'/> <span>{currentDateTime.toLocaleString('en-US', dateTimeOptions)}</span>
    </div>
  );
};

/*
{currentDateTime.toLocaleString('en-US', dateTimeOptions)}
 
 */