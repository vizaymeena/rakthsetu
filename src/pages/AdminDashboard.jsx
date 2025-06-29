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
        {label:'Filter By Email',path:'user/email'},
        {label:'Filter By Name',path:'admin/user/name'},
        {label:'Filter By Gender',path:'admin/user/gender'},
        {label:'New Users',path:'admin/user/newUser'},
        {label:'Old Users',path:'admin/user/oldUser'}
      ],
    },
    {
      name: 'Donors',
      filters: [
        {label:'Filter By Email',path:'admin/donor/email'},
        {label:'Filter By Name',path:'admin/donor/name'},
        {label:'Filter By Gender',path:'admin/donor/gender'},
        {label:'Latest Donors',path:'admin/donor/latest'},
        {label:'Active Donor',path:'admin/donor/active'},
        {label:'Inactive Donor',path:'admin/donor/inactive'},
        {label:'Donor Donation Period',path:'admin/donor/donationPeriod'},
        {label:'Donor By Location',path:'admin/donor/location'},
        {label:'Nearby Donor To Camp',path:'admin/donor/camp'},
      ],
    },
    {
      name: 'Blood Request',
      filters: [
        {label:'Request By Date',path:"admin/req/date"},
        {label:'Request By Requirement',path:"admin/req/urgent"},
        {label:'Request By Location',path:"admin/req/city"},
      ],
    },
    {
      name: 'Blood Camps',
      filters: [
        {label:'Search By City', path:'admin/camp/city'},
        {label:'Search By Date', path:'admin/camp/date'}
      ],
    },
  ]

  return (
    <div className="dashboardContainer">
      <div className="leftsidebar">
        <h1>Rakth Setu</h1>
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
