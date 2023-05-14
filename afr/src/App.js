import "./App.css";
import Cookies from 'js-cookie'
import "./style.scss"
import { useContext, useEffect, useState } from "react";
import Login from "./pages/login/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Navbar from "./componants/navbar/Navbar";
import Leftbar from "./componants/leftbar/Leftbar";
import Rightbar from "./componants/rightbar/Rightbar";
import Profile from "./pages/profile/Profile";
import {DarkModeContext} from './context/darkModeContext'
import { AuthContext } from "./context/authContext";
import { makeRequest } from "./axios";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'


function App() {
 const [isTokenValid, setIsTokenValid] = useState(false)
  const {currentUser } = useContext(AuthContext)
// const aceesscookie = Cookies.get("accessToken")
useEffect(()=>{
  
})
const queryClient = new QueryClient()


  useEffect(() => {
    async function fetchData() {
      try {
        console.log("access is fetching")
        const response = await makeRequest.get("/social/autenticate");
        console.log("tokeV", response.data)
        setIsTokenValid(response.data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

   
  console.log("aa ",isTokenValid)
  const {darkMode} = useContext(DarkModeContext)
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>

      <div className={`theme-${darkMode? "dark": "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          {/* this proprerty doesn't deternmined may be it will be profile or home page of the functions  d */}
          {/* <div style={{flex: 6}}> */}
          <Outlet />
          {/* </div> */}
          <Rightbar />
        </div>
      </div>
      </QueryClientProvider>

    );
  };

  const ProtectedRoue = ({ children }) => {
    if (!currentUser || !isTokenValid ) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoue>
          <Layout />
        </ProtectedRoue>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
