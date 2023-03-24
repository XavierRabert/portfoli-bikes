import React, { createContext, useState } from 'react'

const BikeContext = createContext()

export const BikeProvider = ({ children }) => {
    const [bikeCont, setBikeCont] = useState()

    return <BikeContext.Provider value={{ bikeCont, setBikeCont }}>{children}</BikeContext.Provider>
}

export default BikeContext