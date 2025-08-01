import React from 'react';

// Main content container component
const MainContent = ({ children }) => (
  <main
    style={{
      flex: 1,
      minWidth: 0,
      background: 'var(--white)',
      borderRadius: '7px',
      fontFamily: 'var(--font-main)',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      minHeight: 0, // Important for flex child
    }}
  >
    {/* Content wrapper */}
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
