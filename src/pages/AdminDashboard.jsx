import { useState } from 'react';
import '../assets/styles/admindashboard.css';
import { Link,Outlet } from 'react-router-dom'
export let AdminDashboard = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  // Sidebar data structure
  const sidebarSections = [
    {
      name: 'Users',
      filters: [
        {label:'Show All User',path:'user/showAllUser'},
      ],
    },
    {
      name: 'Donors',
      filters: [
        {label:'Show All Donor',path:'donor/showAllDonor'},
      ],
    },
    {
      name: 'Blood Request',
      filters: [
        {label:'All Request',path:"req/showAllReq"},
      ],
    },
    {
      name: 'Blood Camps',
      filters: [
        {label:'Add Camp ', path:'camp/addcamp'},
        {label:'Blood Camps', path:'camp/ongoing'},
      ],
    },
  ]

  return (
    <div className="dashboardContainer">
      <div className="leftsidebar">
        <Link className='h1' to='/'>Rakth Setu</Link>
        <div className="listDiv">
          <ul>
            {sidebarSections.map((section) => (
              <li key={section.name}>
                <div className="menuHeader" onClick={() => toggleSection(section.name)}>
                  <span>{section.name}</span>
                  <span className="dropdownIcon">▼</span>
                </div>
                {openSections[section.name] && (
                  <div className="filterOptions">
                    {section.filters.map((obj, idx) => (
                      <Link key={idx} to={obj.path} className="filterLink">
                        {obj.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rightBody">
       <Outlet/>
      </div>
    </div>
  )
}
