import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard.jsx";
import TravelRequestForm from "./pages/TravelRequestForm/TravelRequestForm.jsx";
import AppliedForm from "./pages/AppliedForm/AppliedForm.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import ApprovedRequest from "./pages/ApprovedRequest/ApprovedRequest.jsx";
import TravelRequest from "./pages/TravelRequest/TravelRequest.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/travel-request-form" element={<TravelRequestForm />} />
          <Route path="/applied-form" element={<AppliedForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/approved-requests" element={<ApprovedRequest />} />
          <Route path="/travel-requests" element={<TravelRequest/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
