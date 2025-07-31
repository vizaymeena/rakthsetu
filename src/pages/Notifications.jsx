import { useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "../contexts/LoginContext";
import "../assets/styles/notification.css";
import { useNotification } from "../contexts/NotificationContext";

export default function Notifications() {
  const [approvedReq, setApprovedReq] = useState([])
  let {notifications , clearNotification} = useNotification()

  

  

 

  return (
    <div className="notifyMainDiv">
      <div className="notificationContainer">
        <h4 className="notificationTitle">Notifications</h4>
        {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          notifications.map((el, key) => (
            <div
              className={`notificationCard ${el.approval?.toLowerCase()}`}
              key={key}
            >
              <h5>{el.patientName}</h5>
              <div className="cardBody">
              <p>
                This is to inform you that the request you made for{" "}
                <strong>{el.patientName}</strong> has been{" "}
                <strong>{el.approval}</strong>.
              </p>
              <button onClick={()=>clearNotification(el.id)}>Clear</button>
              </div>
            
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}
