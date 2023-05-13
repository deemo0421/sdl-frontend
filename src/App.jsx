import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Routes } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Kanban from "./pages/Kanban/Kanban";
import RootLayout from "./layouts/RootLayout";
import ProjectLayout from "./layouts/ProjectLayout";
import Bulletin from "./pages/bulletin/Bulletin";
import List from "./pages/list/List";
import Task from "./pages/task/Task";
import ManagePhase from "./pages/managePhase/ManagePhase";
import Reflection from "./pages/reflection/Reflection";
import Protfolio from "./pages/protfolio/protfolio";
import ManageIdeaWall from "./pages/manageIdeaWall/ManageIdeaWall";
import IdeaWall from "./pages/ideaWall/IdeaWall";
import NotFound from "./pages/notFound/NotFound";

export default function App() {
  const [userInfo , setUserInfo] = useState({})

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} >
        <Route index element={<Login setUserInfo={setUserInfo}/>} />
        <Route path="register" element={<Register setUserInfo={setUserInfo}/>} />
        <Route path="homepage" element={<HomePage />} />
        <Route path="bulletin" element={<Bulletin />} />
        <Route path="List" element={<List />} />
        <Route path="project" element={<ProjectLayout userInfo={userInfo}/>}>
          <Route path="kanban" element={<Kanban />} />
          <Route path="task" element={<Task />} />
          <Route path="managePhase" element={<ManagePhase />} />
          <Route path="reflection" element={<Reflection />} />
          <Route path="protfolio" element={<Protfolio />} />
          <Route path="manageIdeaWall" element={<ManageIdeaWall />} />
          <Route path="ideaWall" element={<IdeaWall />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    )
  )

  return ( 
    <RouterProvider router={router}/>
  )
}

