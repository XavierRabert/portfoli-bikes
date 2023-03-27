import React, { createContext, useState } from 'react'

const BikeContext = createContext()

export const BikeProvider = ({ children }) => {
    const [bikeCont, setBikeCont] = useState()
    const [allBikesCont, setAllBikesCont] = useState()

    return <BikeContext.Provider value={{ bikeCont, setBikeCont, allBikesCont, setAllBikesCont }}>{children}</BikeContext.Provider>
}

export default BikeContext