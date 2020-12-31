import React, {useState, useEffect, createContext} from "react";
import { auth } from "../config/firebase"

export default ({children}) => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      user ? (
        setUser({
          displayName: user?.displayName,
          email: user?.email,
          photoUrl: user?.photoURL
        })
      ) : (
        setUser(null)
      )
    })
  }, [])

  return (
    <UserContext.Provider value={user}> {children} </UserContext.Provider>
  )
}

export const UserContext = createContext({user: null})
