import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapMonitoring = () => {
  // Default coordinates for Taocanga, Manay, Davao Oriental
  const defaultLocation = {
    lat: 7.2167, // Approximate latitude for Manay, Davao Oriental
    lng: 126.3333, // Approximate longitude for Manay, Davao Oriental
    zoom: 12
  };

  const styles = {
    container: {
      padding: '2rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxHeight: '100vh',
      backgroundColor: '#f8f9fa',
      gap: '1.5rem',
      overflow: 'hidden'
    },
    detailsPanel: {
      width: '12.5%', // 1/8 of the main content
      minWidth: '250px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    mapPanel: {
      flex: 1, // Takes the remaining space (7/8)
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      color: 'var(--forest-color)',
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '0.1rem'
    },
    subtitle: {
      color: '#6c757d',
      fontSize: '0.9rem'
    },
    infoPanel: {
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e8f5e8'
    },
    infoTitle: {
      color: '#2c5530',
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    infoText: {
      color: '#6c757d',
      fontSize: '0.8rem',
      lineHeight: '1.4'
    },
    controlsPanel: {
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e8f5e8',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    controlButton: {
      padding: '0.75rem 1rem',
      backgroundColor: '#2d7c4a',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '500',
      transition: 'background-color 0.2s',
      width: '100%'
    },
    mapContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e8f5e8',
      position: 'relative',
      maxHeight: '67vh',
      minHeight: '400px'
    },
    map: {
      width: '100%',
      height: '100%',
      minHeight: '400px',
      maxHeight: '67vh'
    },
    statsPanel: {
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e8f5e8'
    },
    statItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0',
      borderBottom: '1px solid #f0f0f0'
    },
    statLabel: {
      color: '#6c757d',
      fontSize: '0.8rem',
      fontWeight: '500'
    },
    statValue: {
      color: '#2c5530',
      fontSize: '0.9rem',
      fontWeight: '600'
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // You can update the map center here if needed
          console.log('Current location:', { lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const handleAddLocation = () => {
    // Add location functionality
    console.log('Add location clicked');
    // You can implement location adding logic here
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div>
        <h2 style={styles.title}>Map Monitoring</h2>
        <p style={styles.subtitle}>Real-time location monitoring</p>
      </div>

      {/* Content Section - Map and Details side by side */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1.5rem',
        flex: 1
      }}>
        {/* Left Panel - Map (7/8 width) */}
        <div style={styles.mapPanel}>
          <div style={styles.mapContainer}>
            <MapContainer 
              center={[defaultLocation.lat, defaultLocation.lng]} 
              zoom={defaultLocation.zoom} 
              style={styles.map}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Default location marker */}
              <Marker position={[defaultLocation.lat, defaultLocation.lng]}>
                <Popup>
                  <b>Taocanga, Manay, Davao Oriental</b><br />
                  Default monitoring location
                </Popup>
              </Marker>

              {/* Monitoring area circle */}
              <Circle
                center={[defaultLocation.lat, defaultLocation.lng]}
                radius={5000} // 5km radius
                pathOptions={{
                  color: '#2d7c4a',
                  fillColor: '#2d7c4a',
                  fillOpacity: 0.2
                }}
              >
                <Popup>
                  <b>Monitoring Area</b><br />
                  5km radius from center point
                </Popup>
              </Circle>

              <ScaleControl />
            </MapContainer>
          </div>
        </div>

        {/* Right Panel - Details (1/8 width) */}
        <div style={styles.detailsPanel}>
          <div style={styles.infoPanel}>
            <h3 style={styles.infoTitle}>Current Location</h3>
            <p style={styles.infoText}>
              <strong>Taocanga, Manay</strong><br />
              Davao Oriental<br />
              <strong>Coordinates:</strong><br />
              {defaultLocation.lat}°N, {defaultLocation.lng}°E
            </p>
          </div>

          <div style={styles.controlsPanel}>
            <h3 style={styles.infoTitle}>Controls</h3>
            <button 
              style={styles.controlButton}
              onClick={handleAddLocation}
            >
              Add Location
            </button>
            <button 
              style={styles.controlButton}
              onClick={() => console.log('Refresh map data')}
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapMonitoring; 