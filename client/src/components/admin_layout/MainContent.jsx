import React from 'react';

const MainContent = ({ children }) => (
  <main
    style={{
      flex: 1,
      minWidth: 0,
      background: 'var(--white)',
      borderRadius: '7px',
      fontFamily: 'var(--font-main)',
      //boxShadow: '0 8px 12px 0 rgba(0,0,0,0.1), 0 1.5px 6px 0 rgba(0,0,0,0.28)',
      //padding: '1px',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      //margin: '0.8rem 1rem',
      minHeight: 0, // Important for flex child
    }}
  >
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: 0,
      height: '100%'
    }}>
      {children}
    </div>
  </main>
);

export default MainContent;
