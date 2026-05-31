import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import ProtectedRoute from "./components/common/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
