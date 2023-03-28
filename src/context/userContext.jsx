import React, { createContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [userCont, setUserCont] = useState()

    return <UserContext.Provider value={{ userCont, setUserCont }}>{children}</UserContext.Provider>
}

export default UserContext