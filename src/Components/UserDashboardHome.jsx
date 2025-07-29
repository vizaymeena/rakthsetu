import { useOutletContext } from "react-router-dom";

export default function DashboardHome() {
  const { nearByCamps, registeredDonor } = useOutletContext();

  return (
    <div className="userDash_DonationResults">
      <h4>Nearby Camps</h4>
      <div>
        {registeredDonor &&
          nearByCamps.map((camp) => (
            <div key={camp.id} className="campcard">
              <div className="campgrid">
                <div className="campmain">
                  <h2 className="camptitle">{camp.campName}</h2>
                  <p className="campdescription">{camp.description}</p>
                </div>
                <div className="campdetails">
                  <div><strong>Organiser:</strong> {camp.organiserName}</div>
                  <div><strong>Location:</strong> {camp.location}, {camp.city}, {camp.state}</div>
                  <div><strong>Date & Time:</strong> {camp.date} @ {camp.time}</div>
                  <div><strong>Contact:</strong> {camp.contact}</div>
                  <div><strong>Email:</strong> {camp.email}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
