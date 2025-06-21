import { useEffect, useState } from "react"

export const UserDashboard = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // Simulating API call
    const mockData = {
      name: "Vizay",
      totalDonations: 5,
      lastDonation: "12 June 2025, 3:00 PM",
      nextEligibleDate: "12 August 2025",
      bloodGroup: "B+",
      upcomingCamp: "Bhopal City Hospital, 29 June 2025",
    }

    setTimeout(() => {
      setUserData(mockData)
    }, 1000)
  }, [])

  if (!userData) return <div className="loading">Loading your dashboard...</div>

  return (
    <div className="dashboardContainer">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>🩸 RakthSetu</h2>
        <button className="ctaBtn">🏠 Dashboard</button>
        <button className="ctaBtn">📅 My Donations</button>
        <button className="ctaBtn">📝 Update Profile</button>
        <button className="ctaBtn">📍 Find Camps</button>
        <button className="ctaBtn logoutBtn">🚪 Logout</button>
      </div>

      {/* Main Content */}
      <div className="contentArea">
        <h1>Welcome, {userData.name} 👋</h1>

        <div className="cardGrid">
          <div className="card">
            <h3>Total Donations</h3>
            <p>{userData.totalDonations}</p>
          </div>
          <div className="card">
            <h3>Last Donation</h3>
            <p>{userData.lastDonation}</p>
          </div>
          <div className="card">
            <h3>Next Eligible Date</h3>
            <p>{userData.nextEligibleDate}</p>
          </div>
          <div className="card">
            <h3>Blood Group</h3>
            <p>{userData.bloodGroup}</p>
          </div>
          <div className="card">
            <h3>Upcoming Camp</h3>
            <p>{userData.upcomingCamp}</p>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .dashboardContainer {
          display: flex;
          height: 100vh;
          background-color: #f9f9f9;
        }
        .sidebar {
          width: 250px;
          background-color: #d62828;
          padding: 1.5rem;
          color: white;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .sidebar h2 {
          margin-bottom: 2rem;
          font-size: 1.8rem;
        }
        .ctaBtn {
          background-color: #e63946;
          border: none;
          padding: 0.8rem 1rem;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
        }
        .ctaBtn:hover {
          background-color: #f77f00;
        }
        .logoutBtn {
          margin-top: auto;
          background-color: #6c757d;
        }
        .contentArea {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }
        .contentArea h1 {
          margin-bottom: 1.5rem;
          font-size: 2rem;
        }
        .cardGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }
        .card {
          background-color: white;
          padding: 1.2rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .card h3 {
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          color: #333;
        }
        .card p {
          font-size: 1rem;
          color: #555;
        }
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-size: 1.5rem;
          color: #333;
        }
      `}</style>
    </div>
  )
}


