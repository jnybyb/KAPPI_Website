import React from 'react';
import coffeeLogo from '../../assets/coffee crop logo.png';

const Header = () => (
  <header
    style={{
      background: 'var(--white)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.3rem 0.7rem',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 4px 7px rgba(161, 134, 111, 0.15)', 
      zIndex: 10, 
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.20rem' }}>
      <img 
        src={coffeeLogo} 
        alt="Coffee Crop Logo" 
        style={{
          height: '65px',
          width: 'auto',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <span style={{ 
          fontWeight: 800, 
          fontSize: '1.6rem',
          letterSpacing: '0.1px',
          fontFamily: 'Montserrat, sans-serif',
          color: 'var(--dark-green)',
          lineHeight: '1.4'
        }}>
          Coffee Crop Monitoring System
        </span>
        <span style={{ 
          fontWeight: 500, 
          fontSize: '0.77rem',
          letterSpacing: '0.3px',
          fontFamily: 'Montserrat',
          color: 'var(--dark-brown)',
          lineHeight: '1.1'
        }}>
          Taocanga, Manay, Davao Oriental
        </span>
      </div>
    </div>
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.75rem',
      padding: '0.5rem 1rem',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span style={{ 
          fontWeight: 500, 
          fontSize: '1.2rem',
          color: 'var(--forest-green)',
          fontFamily: 'Montserrat'
        }}>
          Administrator
        </span>
      </div>
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'var(--mint-green)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--forest-green)',
          fontWeight: 700,
          fontSize: '1.2rem',
          fontFamily: 'Montserrat',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
      >
        AP
      </div>
    </div>
  </header>
);

export default Header;
