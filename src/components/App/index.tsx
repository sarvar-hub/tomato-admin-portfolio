import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import "./style.css"
import Add from "@/pages/Add";
import List from "@/pages/List";
import Orders from "@/pages/Orders";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="*" element={<Navigate to="/list" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
