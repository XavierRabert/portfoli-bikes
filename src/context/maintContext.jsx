import React, { createContext, useState } from "react";

const MaintContext = createContext()

export const MaintProvider = ({ children }) => {

    const [allMaintCont, setAllMaintCont] = useState()

    return <MaintContext.Provider value={{ allMaintCont, setAllMaintCont }}>{children}</MaintContext.Provider>
}

export default MaintContext


