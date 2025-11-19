import React from 'react';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // Supports h1, h2, h3, etc.
  children: React.ReactNode;
  className?: string; // Optional custom styles
}

export const Heading: React.FC<HeadingProps> = ({ as: Tag = 'h1', children, className }) => {
  // Assign custom Tailwind classes based on the tag
  const baseStyles = {
    h1: 'text-2xl font-medium', // For h1
    h2: 'text-xl tracking-h2 font-medium', // For h2
    h3: 'text-lg font-medium', // Example for h3, you can define more
    h4: 'text-h4 font-h4 tracking-h4', // Customize as you need
    h5: 'text-h5 font-h5 tracking-h5 font-medium',
    h6: 'text-sm md:text-base uppercase text-[--clr-grey-dark] font-extrabold opacity-50',
  };

  // Combine the default style with any additional className passed in
  const appliedClassName = `${baseStyles[Tag]} ${className || ''}`;

  return <Tag className={appliedClassName}>{children}</Tag>;
};

