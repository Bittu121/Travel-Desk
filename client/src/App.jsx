import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard.jsx";
import TravelRequestForm from "./pages/TravelRequestForm/TravelRequestForm.jsx";
import AppliedForm from "./pages/AppliedForm/AppliedForm.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import ApprovedRequest from "./pages/ApprovedRequest/ApprovedRequest.jsx";
import TravelRequest from "./pages/TravelRequest/TravelRequest.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/Auth/Login.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import UpdateUser from "./pages/Auth/UpdateUser.jsx";

function App() {
  const user = true;
  // const user = false;
  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Layout /> : <Login />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/travel-request-form" element={<TravelRequestForm />} />
          <Route path="/applied-form" element={<AppliedForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/approved-requests" element={<ApprovedRequest />} />
          <Route path="/travel-requests" element={<TravelRequest />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/forgot-password"
          element={user ? <Navigate to="/" /> : <ForgotPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={user ? <Navigate to="/" /> : <ResetPassword />}
        />
      </Routes>
    </>
  );
}

export default App;
