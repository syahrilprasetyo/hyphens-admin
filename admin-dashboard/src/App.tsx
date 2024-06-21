import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./home/home";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/nav";
import Dashboard from "./dashboard/dashboard";
import Product from "./products/product";
import Order from "./orders/order";
import Messages from "./messages/messages";
import MessagePage from "./roomChat/roomChat";
import LoginPage from "./login/LoginPage";
import FromTambahProduct from "./products/formTambah";
import UpdateOrder from "./orders/updateOrders";
import Dokter from "./dokter/dokter_list";
import FromTambahDokter from "./dokter/add_new_dokter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
      <div className="bg-[#EEEEEE] min-h-screen flex">
        <Sidebar />
        <Navbar />

        <div className="flex-grow ">
          <div className="flex ml-72 mt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Product" element={<Product />} />
              <Route path="/Order" element={<Order />} />
              <Route path="/Dokter" element={<Dokter />} />
              <Route path="/Messages" element={<Messages />} />
              <Route
                path="/FormTambahProduct"
                element={<FromTambahProduct />}
              />
              <Route path="/FormTambahDokter" element={<FromTambahDokter />} />
         
              <Route path="/UpdateOrder/:id" element={<UpdateOrder />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
