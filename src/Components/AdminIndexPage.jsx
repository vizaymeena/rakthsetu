import { useLogin } from "../contexts/LoginContext";
import "../assets/styles/adminIndexPage.css";
import axios from "axios";
import { useState,useEffect } from "react";

export default function AdminHome() {
  let { admin } = useLogin();
  let [users,setUsers]=useState(0)
  let [bloodReq,setBloodReq] = useState({
    pending:0,
    approved:0,
    cancel:0
  })
  let [bloodDonor,setBloodDonor]= useState({
    active:0,
    inActive:0
  })

  useEffect(()=>{
  axios.get(`http://localhost:3000/users`)
  .then(res=>setUsers(res.data.length))
  axios.get(`http://localhost:3000/blood_request`)
  .then(res=>{
    let pendingCount  = res.data.filter(el=>el.approval=="pending").length
    let approvedCount = res.data.filter(el=>el.approval=="approved").length
    let cancelCount = res.data.filter(el=>el.approval=="cancel").length

    setBloodReq((prev)=>({
        ...prev,
            pending:pendingCount,
            cancel:cancelCount,
            approved:approvedCount        
    }))
  })

  axios.get(`http://localhost:3000/blood_donor`)
  .then(res=>{
    let activeCount = res.data.filter(el=>el.active==true).length
    let inActiveCount = res.data.filter(el=>el.active==false).length
    setBloodDonor(prev=>({
        ...prev,
        active:activeCount,
        inActive:inActiveCount
    }))
  })
  },[])

  return (
    <>
    <div className="adminContainer">
      <div className="adminPersonal">
      <p>
        <span className="greetingText">Welcome,</span>
        <span className="adminEmail">{admin}</span>
      </p>
      <span className="spanImg"><img className="profileImg" src="" alt="profilePic" /></span>
      </div>
      <hr />


      <h4>Website Insights</h4>
      <div className="dashboardGrid">
        
        <div className="statCard userStat">
          <h3>Total Registered Users</h3>
          <p className="statCount">{users}</p>
        </div>

        <div className="statCard donorStat">
          <h3>Total Registered Donors</h3>
          <div className="donorBreakdown">
            <p>Inactive: <span className="inactiveCount">{bloodDonor.active}</span></p>
            <p>Active: <span className="activeCount">{bloodDonor.inActive}</span></p>
          </div>
        </div>

        <div className="statCard requestStat">
          <h3>Total Blood Requests</h3> 
          <div className="requestBreakdown">
            <p>Pending: <span className="pendingCount">{bloodReq.pending}</span></p>
            <p>Approved: <span className="approvedCount">{bloodReq.approved}</span></p>
            <p>Cancelled: <span className="cancelledCount">{bloodReq.cancel}</span></p>
          </div>
        </div>
      </div>
    </div>


    <div className="reviewsBox">
      <h4>Reviews And FeedBacks</h4>
    </div>
    </>
  );
}
