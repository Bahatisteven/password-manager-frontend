import React, { useState } from "react";
import App from "./App";
import SignUp from "./components/SignUp.jsx";

function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This function will be called after successful login
  const handleLoginSuccess = () => setIsAuthenticated(true);

  return (
    <>
      {isAuthenticated ? (
        <App />
      ) : (
        <SignUp onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default MainApp;