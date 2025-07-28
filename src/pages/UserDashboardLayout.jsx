import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogin } from "../contexts/LoginContext";
import axios from "axios";
import "../assets/styles/userDashboard.css";
import "../assets/styles/userdashboardcampcard.css";

export default function UserDashboardLayout() {
  const [notifications, setNotifications] = useState([]);
  const [registeredDonor, setRegisteredDonor] = useState(false);
  const [nearByCamps, setNearyByCamps] = useState([]);
  const navigate = useNavigate();
  const { user } = useLogin();

  const navbar = [
    { label: "Home", path: "/" },
    { label: "Notification", path: "/UserDashboard/notifications", showBadge: true },
    { label: "Donations", path: "/UserDashboard/donations" },
    { label: "Help", path: "/UserDashboard/help" },
    { label: "Logout", path: "" },
  ];

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:3000/blood_donor/?email=${user}`)
      .then((res) => {
        if (!res.data.length) return;
        setRegisteredDonor(true);
        const { state, city } = res.data[0];

        axios.get(`http://localhost:3000/camp/?state=${state}&city=${city}`)
          .then(res => setNearyByCamps(res.data));

        axios.get(`http://localhost:3000/blood_request/?email=${user}&approval=cancel&approval=approved`)
          .then(res => setNotifications(res.data));
      });
  }, [user]);

  return (
    <div className="containerDashboard">
      <div className="userD_sidebar">
        <div className="userAbout">
          <img alt=" no image" />
          <p><strong>Dipti Anand</strong></p>
          <div><button>Edit</button></div>
        </div>

        <nav className="sidebar_nav">
          {navbar.map((el) => {
            if (el.label === "Logout") {
              return (
                <span className="span spanLogout" key={el.label}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        sessionStorage.removeItem("user");
                        navigate("/");
                      }}>
                  {el.label}
                </span>
              );
            }

            return (
              <Link className="span" key={el.label} to={el.path}>
                {el.label}
                {el.showBadge && notifications.length > 0 && (
                  <span className="notification">{notifications.length}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rightBodyContainer">
        <h4>Hello Mrs Dipti</h4>
        <Outlet context={{ nearByCamps, registeredDonor }} />
      </div>
    </div>
  );
}
