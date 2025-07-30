import React, { useState } from 'react';
import bgImage from '../assets/bg1.png';
import DashboardScreen from './Admin_Dashboard';

const FrontPage = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <DashboardScreen />;
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center', // Center vertically
        justifyContent: 'flex-start', // Align content to left
        overflow: 'hidden',
        padding: '2rem',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
        }}
      />
      {/* Black Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 2,
        }}
      />
      {/* Content */}
      <div
        className="p-8 rounded-2xl shadow-lg max-w-2xl text-left mx-4"
        style={{
          position: 'relative',
          zIndex: 3,
          color: '#fff',
          background: 'none',
        }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: 'inherit' }}
        >
          Welcome to KAPPI
        </h1>
        <p
          className="text-lg md:text-xl"
          style={{ color: 'inherit' }}
        >
          A Coffee Farm Monitoring Website for Taocanga, Manay, Davao Oriental.
        </p>
        <button
          onClick={() => setShowDashboard(true)}
          style={{
            marginTop: '2rem',
            padding: '0.8em 2em',
            borderRadius: '8px',
            border: 'none',
            background: '#2d7c4a',
            color: '#fff',
            fontSize: '1.1em',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'background 0.2s',
          }}
        >
          Proceed to Dashboard
        </button>
      </div>
    </div>
  );
};

export default FrontPage;