import { useContext,createContext, useEffect,useState } from 'react'

// Created Context
export let LoginContext = createContext()

// Context Provider
export let LoginProvider = ({children})=>{

    let [isLogin,setLogin] = useState({
        admin:null,
        user:null
    })

    useEffect(()=>{
        let isAdmin = sessionStorage.getItem('admin')
        let isUser = sessionStorage.getItem('user')

        setLogin({
            admin:isAdmin,
            user:isUser
        })
    },[])

    return (
        // used this spread ...Login to flatten the data by 1 level  
        <LoginContext.Provider value={{...isLogin,setLogin }}> 
          {children}
        </LoginContext.Provider> 
    )
}
// Custom hook to user context values
export const useLogin = () => useContext(LoginContext)