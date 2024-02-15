import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Footer from "./components/footer/footer";
import LabourRegister from "./pages/registration/LabourRegister";
import ContractorRegister from "./pages/registration/ContractorRegistration";
import ContractorHome from "./pages/contractor/ContractorHome";
import ContractorProfile from "./pages/contractor/ContractorProfile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/labour/register" element={<LabourRegister />} />
          <Route path="/contractor/register" element={<ContractorRegister />} />

          <Route
            path="/contractor"
            element={
              <ProtectedRoute>
                <ContractorHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contractor/profile"
            element={
              <ProtectedRoute>
                <ContractorProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
