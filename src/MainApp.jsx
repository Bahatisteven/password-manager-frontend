import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import SignUp from "./components/SignUp.jsx";
import LoginPage from "./components/LoginPage.jsx"; h
import { Link } from "react-router-dom"; 

function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // called after successful login or sign-up
  const handleLoginSuccess = () => setIsAuthenticated(true);

  return (
    <BrowserRouter>
      <Routes>
        {/* sign-in (login) route */}
        <Route
          path="/signin"
          element={
            <>
              <LoginPage onLoginSuccess={handleLoginSuccess} />
              {/* link to sign up */}
              <div className="mt-4 text-center">
                <span className="text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                    Create account
                  </Link>
                </span>
              </div>
            </>
          }
        />

        {/* sign-up route */}

        <Route
          path="/signup"
          element={
            <>
              <SignUp onLoginSuccess={handleLoginSuccess} />
              
              {/* link to sign in */}
              <div className="mt-4 text-center">
                <span className="text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in
                  </Link>
                </span>
              </div>
            </>
          }
        />

        {/* main vault app route (protected) */}

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <App />
            ) : (
              // if not authenticated, redirect to sign in
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* catch-all: redirect unknown routes to sign in */}
        
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;