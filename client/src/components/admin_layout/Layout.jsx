import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Layout = ({ children, active, setActive }) => (
  <div style={{ minHeight: '100vh', minWidth: '100vw', maxWidth: '100vw', maxHeight: '100vh', overflow: 'hidden', background: '#F4F6F8' }}>
    <Header />
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '60px', height: 'calc(100vh - 60px)' }}>
      <Sidebar active={active} setActive={setActive} />
      <MainContent>{children}</MainContent>
    </div>
  </div>
);

export default Layout; 