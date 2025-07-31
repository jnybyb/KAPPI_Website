import React from 'react';

const AlertModal = ({ 
  isOpen, 
  onClose, 
  type = 'success', 
  title, 
  message, 
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = false,
  onConfirm,
  onCancel,
  autoClose = false,
  autoCloseDelay = 3000
}) => {
  // Auto-close functionality
  React.useEffect(() => {
    if (isOpen && autoClose && !showCancel) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose, showCancel]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get alert configuration based on type
  const getAlertConfig = () => {
    const configs = {
      success: {
        icon: '✓',
        headerColor: '#28a745',
        iconColor: '#28a745',
        textColor: '#000000',
        buttonColor: '#28a745',
        buttonTextColor: '#28a745'
      },
      error: {
        icon: '✕',
        headerColor: '#dc3545',
        iconColor: '#dc3545',
        textColor: '#000000',
        buttonColor: '#dc3545',
        buttonTextColor: '#dc3545'
      },
      warning: {
        icon: '!',
        headerColor: '#ffc107',
        iconColor: '#ffc107',
        textColor: '#000000',
        buttonColor: '#ffc107',
        buttonTextColor: '#ffc107'
      },
      info: {
        icon: '?',
        headerColor: '#17a2b8',
        iconColor: '#17a2b8',
        textColor: '#000000',
        buttonColor: '#17a2b8',
        buttonTextColor: '#17a2b8'
      }
    };
    return configs[type] || configs.success;
  };

  const config = getAlertConfig();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          animation: 'modalSlideIn 0.3s ease-out'
        }}
      >
        {/* Colored Header */}
        <div style={{
          backgroundColor: config.headerColor,
          height: '60px',
          position: 'relative',
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px, 15px 15px, 25px 25px'
        }} />

        {/* Icon Circle */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: `3px solid ${config.iconColor}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: config.iconColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            {config.icon}
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: '50px 30px 30px 30px',
          textAlign: 'center'
        }}>
          {/* Title */}
          <h3 style={{
            margin: '0 0 15px 0',
            color: config.textColor,
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            {title}
          </h3>

          {/* Message */}
          <div style={{
            marginBottom: '30px',
            color: config.textColor,
            fontSize: '14px',
            lineHeight: '1.5',
            textAlign: 'center'
          }}>
            {message}
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            justifyContent: showCancel ? 'space-between' : 'center',
            gap: '15px'
          }}>
            {showCancel && (
              <button
                onClick={onCancel || onClose}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  border: `2px solid ${config.buttonColor}`,
                  backgroundColor: 'white',
                  color: config.buttonTextColor,
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = config.buttonColor;
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = config.buttonTextColor;
                }}
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={onConfirm || onClose}
              style={{
                flex: 1,
                padding: '12px 20px',
                border: showCancel ? `2px solid ${config.buttonColor}` : 'none',
                backgroundColor: showCancel ? 'white' : config.buttonColor,
                color: showCancel ? config.buttonTextColor : 'white',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (showCancel) {
                  e.target.style.backgroundColor = config.buttonColor;
                  e.target.style.color = 'white';
                } else {
                  e.target.style.backgroundColor = config.buttonColor === '#28a745' ? '#218838' :
                    config.buttonColor === '#dc3545' ? '#c82333' :
                    config.buttonColor === '#ffc107' ? '#e0a800' :
                    config.buttonColor === '#17a2b8' ? '#138496' : config.buttonColor;
                }
              }}
              onMouseOut={(e) => {
                if (showCancel) {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = config.buttonTextColor;
                } else {
                  e.target.style.backgroundColor = config.buttonColor;
                }
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AlertModal; 