import React from 'react';

const MainContent = ({ children }) => (
  <main
    style={{
      flex: 1,
      minWidth: 0, // allow to shrink in flex
      background: '#F9FAFB',
      padding: '2rem',
      fontFamily: 'var(--font-main)',
      minHeight: '95%', // fill flex container
      height: '95%',
      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12), 0 1.5px 6px 0 rgba(0,0,0,0.18)', // more prominent floating shadow
      overflow: 'auto',
    }}
  >
    {children}
  </main>
);

export default MainContent; 