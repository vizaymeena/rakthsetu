

import { createContext, useContext,useEffect,useState } from "react";
import { useLogin } from "./LoginContext";
import axios from "axios";

export let NotificationContext = createContext()

export let useNotification=()=>{
    return useContext(NotificationContext)
}
export let NotificationProvider=({children})=>{
    let {user} = useLogin()
    let [notifications,setNotifications] = useState([]);

    useEffect(()=>{        
        if(!user) return 
        axios.get(`http://localhost:3000/blood_request/?email=${user}&read=false`)
        .then((res)=>{
            let filteredData = res.data.filter(el=> el.approval == "cancel" || el.approval == "approved")
            setNotifications(filteredData)
        })
    },[user])

    let clearNotification=(id)=>{
       setNotifications((prev)=>prev.filter(el=>el.id !==id ))
       axios.patch(`http://localhost:3000/blood_request/${id}`,{
          read:true
       })
       .catch(()=>{
        console.log(err)
       })
       
    }

    return(
        <NotificationContext.Provider value={{notifications,clearNotification}}>
                    {children}
        </NotificationContext.Provider>
        
    )
    
}

