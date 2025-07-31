import React from 'react';

const MainContent = ({ children }) => (
<main
    style={{
      flex: 1,
      minWidth: 0,
      background: 'var(--white)',
      padding: '0 0.3rem',
      borderRadius: '12px',
      fontFamily: 'var(--font-main)',
      minHeight: '95%',
      height: '95%',
      boxShadow: '0 8px 12px 0 rgba(0,0,0,0.12), 0 1.5px 6px 0 rgba(0,0,0,0.18)',
      overflow: 'auto',
      margin: '30px 12px',  
    }}
  >
    {children}
  </main>
);

export default MainContent; 