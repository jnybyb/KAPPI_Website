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
  IoChevronUp,
} from 'react-icons/io5';

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

  return (
    <aside
      style={{
        width: '245px',
        background: 'var(--white)',
        color: 'var(--dark-brown)',
        height: '100vh',
        boxSizing: 'border-box',
        padding: '2.8rem 0.3rem',
        fontFamily: 'var(--font-main)',
        fontWeight: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRight: '1px solid var(--tan)',
        //boxShadow: '4px 0 12px rgba(0, 0, 0, 0.05)', 
        zIndex: 2,
      }}
    >
      <nav style={{ width: '100%', padding: '0 0.5rem' }}>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            width: '100%',
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
                <button
                  style={{
                    width: '95%',
                    background: isParentActive ? 'var(--white)' : 'none',
                    border: 'none',
                    color: isParentActive ? 'var(--primary-green)' : 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: isParentActive ? 600 : 400,
                    fontSize: '0.75rem',
                    padding: '0.65rem .75rem',
                    borderRadius: '7px',
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderLeft: isParentActive ? '3px solid var(--primary-green)' : '3px solid transparent',
                    transition: 'all 0.2s ease',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    boxShadow: isParentActive ? '0 1px 10px rgba(12, 17, 15, 0.10)' : 'none',
                    transform: isParentActive ? 'translateY(-1px)' : 'none',
                  }}
                  onClick={() => {
                    if (item.hasSubcategories) {
                      // If this is a main button with subcategories
                      if (active === item.label || isExpanded) {
                        // If already active or expanded, just toggle expansion
                        toggleExpanded(item.label);
                      } else {
                        // If not active, set as active and expand
                        setActive(item.label);
                        setExpandedItems(new Set([item.label]));
                      }
                    } else {
                      // If this is a regular main button (Dashboard, Map, Reports)
                      setActive(item.label);
                      // Close all expanded subcategories when switching to a different main button
                      setExpandedItems(new Set());
                    }
                  }}
                  onMouseOver={(e) => {
                    if (!isParentActive) {
                      e.currentTarget.style.background = 'var(--mint-green)';
                      e.currentTarget.style.color = 'var(--primary-green)';
                      e.currentTarget.querySelector('span:first-child').style.color = 'var(--primary-green)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isParentActive) {
                      e.currentTarget.style.background = 'none';
                      e.currentTarget.style.color = 'inherit';
                      e.currentTarget.querySelector('span:first-child').style.color = 'inherit';
                    }
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      minWidth: 20,
                      fontSize: '1.1rem',
                      color: isParentActive ? 'var(--primary-green)' : 'inherit',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {isParentActive ? item.activeIcon : item.inactiveIcon}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      textAlign: 'left',
                    }}
                  >
                    {item.label}
                  </span>
                  {item.hasSubcategories && (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        color: isParentActive ? 'var(--primary-green)' : 'inherit',
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
                            style={{
                              width: '83%',
                              background: isSubActive ? 'var(--mint-green)' : 'rgba(0, 0, 0, 0.03)',
                              border: 'none',
                              color: isSubActive ? 'var(--primary-green)' : 'var(--deep-brown)',
                              fontFamily: 'inherit',
                              fontWeight: isSubActive ? 600 : 500,
                              fontSize: '0.7rem',
                              padding: '0.75rem 0.75rem 0.65rem 1rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              outline: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.7rem',
                              borderLeft: isSubActive ? '2px solid var(--primary-green)' : '2px solid transparent',
                              transition: 'all 0.2s ease',
                              justifyContent: 'flex-start',
                              textAlign: 'left',
                              whiteSpace: 'normal',
                              wordBreak: 'break-word',
                            }}
                            onClick={() => {
                              setActive(subItem.label);
                              // Ensure the parent item stays expanded when subcategory is clicked
                              if (!isExpanded) {
                                setExpandedItems(new Set([...expandedItems, item.label]));
                              }
                            }}
                            onMouseOver={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.background = 'var(--mint-green)';
                                e.currentTarget.style.color = 'var(--primary-green)';
                                if (subItem.inactiveIcon) {
                                  e.currentTarget.querySelector('span:first-child').style.color = 'var(--primary-green)';
                                }
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!isSubActive) {
                                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
                                e.currentTarget.style.color = 'var(--deep-brown)';
                                if (subItem.inactiveIcon) {
                                  e.currentTarget.querySelector('span:first-child').style.color = 'var(--deep-brown)';
                                }
                              }
                            }}
                          >
                            {subItem.inactiveIcon ? (
                              <span
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 16,
                                  minWidth: 16,
                                  fontSize: '0.9rem',
                                  color: isSubActive ? 'var(--primary-green)' : 'var(--deep-brown)',
                                  transition: 'color 0.2s ease',
                                }}
                              >
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
                            <span
                              style={{
                                flex: 1,
                                textAlign: 'left',
                              }}
                            >
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
