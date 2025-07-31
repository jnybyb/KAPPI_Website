import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Layout = ({ children, active, setActive }) => {
  const headerHeight = '80px'; // Consistent across screens
  const sidebarWidth = '245px'; // Adjust as needed for responsiveness

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <div style={{ height: headerHeight, width: '100%', flexShrink: 0 }}>
        <Header />
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 0, // Important for flex child
          width: '100%',
        }}
      >
        <div
          style={{
            width: sidebarWidth,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Sidebar active={active} setActive={setActive} />
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 0, // Important for flex child
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </div>
  );
};

export default Layout;
