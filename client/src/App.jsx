import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard.jsx";
import TravelRequestForm from "./pages/TravelRequestForm/TravelRequestForm.jsx";
import AppliedForm from "./pages/AppliedForm/AppliedForm.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import ApprovedRequest from "./pages/ApprovedRequest/ApprovedRequest.jsx";
import PendingRequest from "./pages/PendingRequest/PendingRequest.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/Auth/Login.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import GetUserDetails from "./pages/Auth/GetUserDetails.jsx";
import { useSelector } from "react-redux";

function App() {
  const { authData: user } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Layout /> : <Login />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/travel-request-form" element={<TravelRequestForm />} />
          <Route path="/applied-form" element={<AppliedForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/update-user" element={<GetUserDetails />} />
          <Route path="/approved-requests" element={<ApprovedRequest />} />
          <Route path="/pending-requests" element={<PendingRequest />} />
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
