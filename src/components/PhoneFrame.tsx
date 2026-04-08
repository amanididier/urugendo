import React from 'react';

const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {/* Desktop frame wrapper */}
      <div className="hidden md:flex w-screen h-screen items-center justify-center" style={{ backgroundColor: '#0F0F0F' }}>
        {/* Phone shell */}
        <div
          className="relative"
          style={{
            width: 390,
            height: 844,
            borderRadius: 52,
            overflow: 'hidden',
            border: '9px solid #111111',
            boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-[500]"
            style={{
              width: 118,
              height: 33,
              top: 14,
              borderRadius: 18,
              backgroundColor: '#000000',
            }}
          />
          {/* App content */}
          <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-background">
            {children}
          </div>
        </div>
      </div>
      {/* Mobile: render content directly */}
      <div className="md:hidden w-full min-h-screen">
        {children}
      </div>
    </>
  );
};

export default PhoneFrame;
