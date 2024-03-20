import React, { createContext, useState } from "react";
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
import LabourProfile from "./pages/labour/LabourProfile";
import LabourUpdateProfile from "./pages/labour/LabourUpadteProfile";
import CreatePost from "./pages/contractor/CreatePost";
import ContractorSinglePost from "./pages/contractor/ContractorSinglePost";
import ContractorEditPost from "./pages/contractor/ContractorEditPost";
import DailyWork from "./pages/DailyWork/DailyWork";
import PageNotFoundPage from "./pages/404Page/PageNotFoundPage";

export const appContext = createContext();

function App() {
  const [userDetail, setUserDetail] = useState(false);
  return (
    <appContext.Provider value={{ userDetail, setUserDetail }}>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/labour/register" element={<LabourRegister />} />
            <Route
              path="/contractor/register"
              element={<ContractorRegister />}
            />

            <Route
              path="/contractor"
              element={
                <ProtectedRoute>
                  <ContractorHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contractor/createpost"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contractor/post/view/:id"
              element={
                <ProtectedRoute>
                  <ContractorSinglePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contractor/post/edit/:id"
              element={
                <ProtectedRoute>
                  <ContractorEditPost />
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
            <Route
              path="/labour/profile"
              element={
                <ProtectedRoute>
                  <LabourProfile />
                </ProtectedRoute>
              }
            />

            <Route path="/update" element={<LabourUpdateProfile />} />
            <Route path="/dailywork" element={<DailyWork />} />
            <Route path="/*" element={<PageNotFoundPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </appContext.Provider>
  );
}

export default App;
