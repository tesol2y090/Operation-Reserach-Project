import React, { useState } from 'react';

export const dataContext = React.createContext('emthy')
export const abContext = React.createContext([])
export const isRenderContext = React.createContext(false)

const Store = ({children}) => {
    const [data, setData] = useState('emthy')
    const [ab, setAb] = useState([0, 0])
    const [isRender, setIsRender] = useState(0)

    return (
        <dataContext.Provider value={[data, setData]} >
            <abContext.Provider value={[ab, setAb]} >
               <isRenderContext.Provider value={[isRender, setIsRender]} >
                    {children}
               </isRenderContext.Provider>
            </abContext.Provider>
        </dataContext.Provider>
    )
}

export default Store;