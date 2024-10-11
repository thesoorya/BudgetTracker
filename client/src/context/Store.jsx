import { useUser } from '@clerk/clerk-react'
import React, { createContext } from 'react'

export const StoreContext = createContext()

const Store = ({children}) => {

    const {user} = useUser()

    const value = {}
  return (
    <StoreContext.Provider value={value}>
        {children}
    </StoreContext.Provider>
  )
}

export default Store