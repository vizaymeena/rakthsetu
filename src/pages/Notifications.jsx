import { useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "../contexts/LoginContext";
import "../assets/styles/notification.css";

export default function Notifications() {
  const [approvedReq, setApprovedReq] = useState([])
  let   [clearNotificationIndex,setClearNotificationIndex] = useState()

  const { user } = useLogin();

  useEffect(() => {
    if (!user) return;
    axios
      .get(
        `http://localhost:3000/blood_request/?email=${user}`
      )
      .then((res) =>{
        let filteredData = res.data.filter((el)=> el.approval == "cancel" || el.approval == "approved" )
        setApprovedReq(filteredData)
      });
  }, [user])

  let clearNotification=(id)=>{
    axios.get(`http://localhost:3000/blood_request/${}`)


  }

  return (
    <div className="notifyMainDiv">
      <div className="notificationContainer">
        <h4 className="notificationTitle">Notifications</h4>
        {approvedReq.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          approvedReq.map((el, key) => (
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
