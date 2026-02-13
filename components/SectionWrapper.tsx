
import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id }) => {
  return (
    <section 
      id={id} 
      className="min-h-screen w-full flex flex-col items-center justify-center snap-start relative px-4"
    >
      <div className="w-full h-full flex flex-col items-center justify-start md:justify-center overflow-y-auto hidden-scrollbar py-20 md:py-0">
        <div className="min-h-min w-full flex flex-col items-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper;
