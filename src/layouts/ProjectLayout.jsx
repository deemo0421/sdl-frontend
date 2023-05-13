import React from 'react'
import TopBar from '../components/TopBar';
import SideBar from '../components/Sidebar';
import { Outlet, useLocation } from 'react-router-dom'

export default function ProjectLayout() {
    const location = useLocation();
    return (
        <div className='min-w-full min-h-screen h-screen overflow-hidden overflow-x-scroll'>
            {
                location.pathname ===  "/project/ideaWall" ?(
                    <>
                    </>
                ):(
                    <>
                        <TopBar />
                        <SideBar /> 
                    </>
                )
            } 
            <Outlet />
        </div>
    )
}
