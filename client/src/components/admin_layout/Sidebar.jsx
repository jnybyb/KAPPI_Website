import React, { useState } from 'react';
import {
  MdOutlineDashboard,
  MdDashboard,
} from 'react-icons/md';
import {
  RiMapPinLine,
  RiMapPinFill,
  RiFolderUserLine,
  RiFolderUserFill,
  RiSeedlingLine,
  RiSeedlingFill,
  RiBarChartLine,
  RiBarChartFill,
} from 'react-icons/ri';
import {
  PiCoffeeLight,
  PiCoffeeFill,
} from 'react-icons/pi';
import {
  BsClipboard2Data,
  BsClipboard2DataFill,
} from 'react-icons/bs';
import {
  IoChevronDown,
} from 'react-icons/io5';

// Navigation items configuration
const navItems = [
  { 
    label: 'Dashboard', 
    inactiveIcon: <MdOutlineDashboard />,
    activeIcon: <MdDashboard />
  },
  { 
    label: 'Map Monitoring', 
    inactiveIcon: <RiMapPinLine />,
    activeIcon: <RiMapPinFill />
  },
  { 
    label: 'Coffee Beneficiaries', 
    inactiveIcon: <PiCoffeeLight />,
    activeIcon: <PiCoffeeFill />,
    hasSubcategories: true,
    subcategories: [
      { 
        label: 'Personal Details',
        inactiveIcon: <RiFolderUserLine />,
        activeIcon: <RiFolderUserFill />
      },
      { 
        label: 'Seedling Records',
        inactiveIcon: <RiSeedlingLine />,
        activeIcon: <RiSeedlingFill />
      },
      { 
        label: 'Crop Status',
        inactiveIcon: <RiBarChartLine />,
        activeIcon: <RiBarChartFill />
      }
    ]
  },
  { 
    label: 'Reports', 
    inactiveIcon: <BsClipboard2Data />,
    activeIcon: <BsClipboard2DataFill />
  },
];

// Common button styles
const getButtonStyles = (isActive, isParent = false) => ({
  width: isParent ? '95%' : '83%',
  background: isActive ? 'var(--white)' : 'transparent',
  border: 'none',
  color: isActive ? 'var(--dark-green)' : 'var(--light-gray)',
  fontFamily: 'inherit',
  fontWeight: isActive ? 600 : (isParent ? 400 : 500),
  fontSize: isParent ? '0.75rem' : '0.7rem',
  padding: isParent ? '0.65rem .75rem' : '0.75rem 0.75rem 0.65rem 1rem',
  borderRadius: isParent ? '7px' : '6px',
  cursor: 'pointer',
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: isParent ? '0.5rem' : '0.7rem',
  borderLeft: isActive ? `${isParent ? '3px' : '2px'} solid var(--ivory)` : `${isParent ? '3px' : '2px'} solid transparent`,
  transition: 'all 0.2s ease',
  justifyContent: 'flex-start',
  textAlign: 'left',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  boxShadow: isActive && isParent ? '0 1px 10px rgba(12, 17, 15, 0.10)' : 'none',
  transform: isActive && isParent ? 'translateY(-1px)' : 'none',
});

// Icon container styles
const getIconStyles = (isActive, isParent = false) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: isParent ? 20 : 16,
  minWidth: isParent ? 20 : 16,
  fontSize: isParent ? '1.1rem' : '0.9rem',
  color: isActive ? (isParent ? 'var(--dark-green)' : 'var(--primary-green)') : 'inherit',
  transition: 'color 0.2s ease',
});

// Hover handlers
const getHoverHandlers = (isActive, isParent = false) => ({
  onMouseOver: (e) => {
    if (!isActive) {
      e.currentTarget.style.background = 'var(--mint-green)';
      e.currentTarget.style.color = 'var(--dark-brown)';
      const iconElement = e.currentTarget.querySelector('span:first-child');
      if (iconElement) {
        iconElement.style.color = 'var(--dark-brown)';
      }
    }
  },
  onMouseOut: (e) => {
    if (!isActive) {
      e.currentTarget.style.background = isParent ? 'transparent' : 'rgba(0, 0, 0, 0.03)';
      e.currentTarget.style.color = 'var(--white)';
      const iconElement = e.currentTarget.querySelector('span:first-child');
      if (iconElement) {
        iconElement.style.color = isParent ? 'var(--light-gray)' : 'var(--deep-brown)';
      }
    }
  }
});

const Sidebar = ({ active, setActive }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (itemLabel) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemLabel)) {
      newExpanded.delete(itemLabel);
    } else {
      newExpanded.add(itemLabel);
    }
    setExpandedItems(newExpanded);
  };

  const isItemExpanded = (itemLabel) => expandedItems.has(itemLabel);

  // Main button click handler
  const handleMainButtonClick = (item) => {
    if (item.hasSubcategories) {
      if (active === item.label || isItemExpanded(item.label)) {
        toggleExpanded(item.label);
      } else {
        setActive(item.label);
        setExpandedItems(new Set([item.label]));
      }
    } else {
      setActive(item.label);
      setExpandedItems(new Set());
    }
  };

  // Subcategory button click handler
  const handleSubButtonClick = (subItem, parentItem) => {
    setActive(subItem.label);
    if (!isItemExpanded(parentItem.label)) {
      setExpandedItems(new Set([...expandedItems, parentItem.label]));
    }
  };

  return (
    <aside
      style={{
        background: 'var(--dark-green)',
        color: 'var(--white)',
        boxSizing: 'border-box',
        padding: '1.6rem 0.3rem',
        fontFamily: 'var(--font-main)',
        fontWeight: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        minHeight: 0,
        marginTop: '-0.3rem',
      }}
    >
      <nav style={{ width: '100%', padding: '0 0.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {navItems.map((item) => {
            const isActive = active === item.label;
            const isExpanded = isItemExpanded(item.label);
            const hasActiveSubcategory = item.hasSubcategories && item.subcategories && 
              item.subcategories.some(subItem => active === subItem.label);
            const isParentActive = isActive || (item.hasSubcategories && (isExpanded || hasActiveSubcategory));

            return (
              <li key={item.label} style={{ marginBottom: '.75rem', width: '100%' }}>
                {/* Main navigation button */}
                <button
                  style={getButtonStyles(isParentActive, true)}
                  onClick={() => handleMainButtonClick(item)}
                  {...getHoverHandlers(isParentActive, true)}
                >
                  <span style={getIconStyles(isParentActive, true)}>
                    {isParentActive ? item.activeIcon : item.inactiveIcon}
                  </span>
                  <span style={{ flex: 1, textAlign: 'left' }}>
                    {item.label}
                  </span>
                  {item.hasSubcategories && (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        color: isParentActive ? 'var(--dark-green)' : 'inherit',
                        transition: 'transform 0.2s ease',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <IoChevronDown />
                    </span>
                  )}
                </button>
                
                {/* Subcategories */}
                {item.hasSubcategories && isExpanded && (
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: '0.7rem 0 0 0',
                      margin: 0,
                      width: '95%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}
                  >
                    {item.subcategories.map((subItem) => {
                      const isSubActive = active === subItem.label;
                      
                      return (
                        <li key={subItem.label} style={{ marginBottom: '0.5rem', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                          <button
                            style={getButtonStyles(isSubActive, false)}
                            onClick={() => handleSubButtonClick(subItem, item)}
                            {...getHoverHandlers(isSubActive, false)}
                          >
                            {subItem.inactiveIcon ? (
                              <span style={getIconStyles(isSubActive, false)}>
                                {isSubActive ? subItem.activeIcon : subItem.inactiveIcon}
                              </span>
                            ) : (
                              <span
                                style={{
                                  width: 4,
                                  height: 4,
                                  borderRadius: '50%',
                                  backgroundColor: isSubActive ? 'var(--primary-green)' : 'var(--deep-brown)',
                                  opacity: 0.6,
                                }}
                              />
                            )}
                            <span style={{ flex: 1, textAlign: 'left' }}>
                              {subItem.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
