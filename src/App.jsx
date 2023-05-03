import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import RootLayout from "./layouts/RootLayout";
import ProjectLayout from "./layouts/RootLayout";
import NotFound from "./pages/notFound/NotFound";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="homepage" element={<HomePage />} />
        <Route path="bulletin " element={<HomePage />} />
        <Route path="projectList " element={<ProjectLayout />}>
          <Route path=":id" element={<HomePage />}>
            <Route path="task" element={<HomePage />} />
            <Route path="managePhase" element={<HomePage />} />
            <Route path="reflection" element={<HomePage />} />
            <Route path="protfolio" element={<HomePage />} />
            <Route path="manageIdeaWall" element={<HomePage />} />
            <Route path="ideaWall" element={<HomePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Route>
    )
  )

  return ( 
    <RouterProvider router={router}/>
  )
}

