import React, { useState } from "react";
import App from "./App";
import LoginPage from "./components/LoginPage.jsx";

function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This function will be called after successful login
  const handleLoginSuccess = () => setIsAuthenticated(true);

  return (
    <>
      {isAuthenticated ? (
        <App />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default MainApp;