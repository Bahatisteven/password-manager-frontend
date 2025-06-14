 import React, { useState } from "react";
 import App from "./App";
 import SignUp from "./components/SignUp.jsx";
 import LoginPage from ".components/LoginPage.jsx";

 function MainApp() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   // called after successful login or sign-up
   const handleLoginSuccess = () => setIsAuthenticated(true);

   return (
     // browser router to enable routing in the app
     <BrowserRouter>
     <Routes>
       {/* sign-in (login) route */}
       <Route
       path="/signin"
       element={<LoginPage onLoginSuccess={handleLoginSuccess}  />}
       />

       {/* signup route */}
       <Route
       path="/signup"
       element={<SignUp onLoginSuccess={handleLoginSuccess} />}
       />
       {/* main vault app route */}
       <Route
       path="/"
       element={
         isAuthenticated ? (
           <App />
         ) : (
           // if not authenticated redirect to sign in
           <Navigate to="/signin" replace />
         )
       }
       />
       {/* catch-all: redirect unknown routes to signin */}
       <Route path="*" element={<Navigate to="/signin" replace />}/>
     </Routes>
     </BrowserRouter>
   )
 };

 export default MainApp;
