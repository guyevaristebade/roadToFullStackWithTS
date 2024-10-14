import React from 'react'
import { Data } from '../components'
import { Outlet } from 'react-router-dom'

export const Home : React.FC = () => {
    return (
        <div>
            <Data/>
            <div>
                <Outlet/>
            </div>
        </div>
)
}
