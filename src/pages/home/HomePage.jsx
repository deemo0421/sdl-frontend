import React, { useState } from 'react'
import SideBar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import Kanban from '../Kanban/Kanban'

export default function HomePage() {

  return (
    <div  className='min-w-full min-h-screen h-screen overflow-hidden overflow-x-scroll'>
      {/* <TopBar /> */}
      <SideBar />
      <Kanban />
      
    </div>
  )
}

