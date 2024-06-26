import React from 'react'
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import { Outlet, useLocation, useParams } from 'react-router-dom';

export default function ProjectLayout() {
    const location = useLocation();
    const { projectId } = useParams();
    return (
        <div className='min-w-full min-h-screen h-screen overflow-hidden overflow-x-scroll'>
            {
                location.pathname === `/project/${projectId}/ideaWall` ?(
                    <></>
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
