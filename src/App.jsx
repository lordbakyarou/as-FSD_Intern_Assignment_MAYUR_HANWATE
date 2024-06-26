import "./App.css";

//Router
import { Routes, Route } from "react-router-dom";

//Pages
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";

import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
const WrapComponent = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      {children}
      <Sidebar />
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
              <div className="p-4 sm:ml-64 min-h-screen bg-gray-100">
                <Dashboard />
              </div>
            </WrapComponent>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
