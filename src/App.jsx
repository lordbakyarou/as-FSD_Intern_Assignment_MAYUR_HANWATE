import "./App.css";

//Router
import { Routes, Route } from "react-router-dom";

//Pages
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";

import Navbar from "./Component/Navbar";

const WrapComponent = ({ children }) => {
  return (
    <div className="w-screen h-full flex-col justify-center">
      <Navbar />
      {children}
    </div>
  );
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <WrapComponent>
              <Dashboard />
            </WrapComponent>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
