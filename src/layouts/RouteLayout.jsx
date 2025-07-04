import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from "react-router";

const RouteLayout = () => {
  return (
    <>
    <Outlet/>
    </>
  )
}

export default RouteLayout