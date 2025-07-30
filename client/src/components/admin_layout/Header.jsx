import React from 'react';
import coffeeLogo from '../../assets/coffee crop logo.png';

const Header = () => (
  <header
    style={{
      height: '75px',
      background: '#FFFFFF',
      color: 'var(--secondary-green)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem',
      fontFamily: 'var(--font-main)',
      fontWeight: 600,
      fontSize: '1.2rem',
      letterSpacing: '1px',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.10)', 
      zIndex: 10, 
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      <img 
        src={coffeeLogo} 
        alt="Coffee Crop Logo" 
        style={{
          height: '65px',
          width: 'auto',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
        <span style={{ 
          fontWeight: 800, 
          fontSize: '1.5rem',
          letterSpacing: '0.5px',
          fontFamily: 'Montserrat, sans-serif',
          color: 'var(--secondary-green)',
          lineHeight: '1.2'
        }}>
          Coffee Crop Monitoring System
        </span>
        <span style={{ 
          fontWeight: 400, 
          fontSize: '0.75rem',
          letterSpacing: '0.3px',
          fontFamily: 'Montserrat, sans-serif',
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
          fontWeight: 700, 
          fontSize: '1.2rem',
          color: 'var(--secondary-green)',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          Administrator
        </span>
      </div>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'var(--secondary-green)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
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
