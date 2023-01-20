import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ErrorPage from "../Pages/ErrorPage";
import AdminLogin from "../Pages/admin";
import Signup from "../Pages/admin/signup";
import Dashboard from "../Pages/admin/Dashboard";
import UserLogin from "../Pages/users";
import UserSignup from "../Pages/users/signup";
import UserDashboard from "../Pages/users/Dashboard";
import Protected from "./Protected";
import ViewsBookedMeetingList from "../Pages/admin/ViewsBookedMeetingList";

const Index = () => {
  return (
    <>
      <BrowserRouter>
        <div style={{ padding: "0.5rem 1rem" }}>
          <Routes>
            <Route exact path="/" element={<UserLogin />} />
            <Route exact path="/signup" element={<UserSignup />} />
            <Route
              exact
              path="/user/dashboard"
              element={
                <Protected>
                  <UserDashboard />
                </Protected>
              }
            />
            <Route exact path="/admin" element={<AdminLogin />} />
            <Route exact path="/admin/signup" element={<Signup />} />
            <Route
              exact
              path="/admin/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route
              exact
              path="/admin/bookedmeetinglist"
              element={
                <Protected>
                  <ViewsBookedMeetingList />
                </Protected>
              }
            />
            <Route exact path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Index;
