import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/DashboardPage/Dashboard";
import Login from "./components/AddonPages/Login";
import Register from "./components/AddonPages/Register";
import ForgotPassword from "./components/AddonPages/ForgotPassword";
import ErrorPage from "./components/AddonPages/ErrorPage";
import BlankPage from "./components/AddonPages/BlankPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from "./components/ComponentsPage/ProductPage/Product";
import User from "./components/ComponentsPage/UsersPage/User";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/errorpage" element={<ErrorPage />} />
        <Route path="/blankpage" element={<BlankPage />} />
      </Routes>
    </div>
  );
}

export default App;
