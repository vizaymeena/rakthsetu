import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../assets/styles/admindashboard.css';

export const AdminDashboard = () => {
  const [openSections, setOpenSections] = useState({});
  const location = useLocation();

  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const sidebarSections = [
    {
      name: 'Users',
      filters: [
        { label: 'Show All Users', path: 'user/showAllUser' },
      ],
    },
    {
      name: 'Donors',
      filters: [
        { label: 'Show All Donors', path: 'donor/showAllDonor' },
      ],
    },
    {
      name: 'Blood Requests',
      filters: [
        { label: 'All Requests', path: 'req/showAllReq' },
      ],
    },
    {
      name: 'Blood Camps',
      filters: [
        { label: 'Add Camp', path: 'camp/addcamp' },
        { label: 'Show All Camps', path: 'camp/showallcamp' },
      ],
    },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Link className="logo" to="/">🩸 Rakth Setu</Link>

        <nav className="navMenu">
          {sidebarSections.map((section) => (
            <div key={section.name} className="navSection">
              <div
                className="sectionHeader"
                role="button"
                onClick={() => toggleSection(section.name)}
                aria-expanded={!!openSections[section.name]}
                tabIndex={0}
              >
                <span>{section.name}</span>
                <span className={`chevron ${openSections[section.name] ? 'rotate' : ''}`}>▼</span>
              </div>

              <div
                className={`sectionLinks ${openSections[section.name] ? 'show' : ''}`}
              >
                {section.filters.map((filter) => (
                  <Link
                    key={filter.path}
                    to={filter.path}
                    className={`navLink ${location.pathname.includes(filter.path) ? 'active' : ''}`}
                  >
                    {filter.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="mainContent">
        <Outlet />
      </main>
    </div>
  );
};
