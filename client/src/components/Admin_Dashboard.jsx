import React, { useState } from 'react';
import Layout from './admin_layout/Layout';
import PersonalDetails from './beneficiaries/Personal_Details';
import SeedlingRecords from './beneficiaries/Seedling_Records';
import CropStatus from './beneficiaries/Crop_Status';

const DashboardScreen = () => {
  const [active, setActive] = useState('Dashboard');

  let content;
  
  switch (active) {
    case 'Personal Details':
      content = <PersonalDetails />;
      break;
    
    case 'Seedling Records':
      content = <SeedlingRecords />;
      break;
    
    case 'Crop Status':
      content = <CropStatus />;
      break;
    
    default:
      content = (
        <div style={{ padding: '2rem' }}>
          <h2 style={{ color: '#2c5530' }}>Dashboard</h2>
          <p>Welcome to the dashboard!</p>
        </div>
      );
  }

  return (
    <Layout active={active} setActive={setActive}>
      {content}
    </Layout>
  );
};

export default DashboardScreen;