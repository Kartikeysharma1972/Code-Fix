import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function LoadingScreen() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "100vh", fontFamily: "var(--sans)", color: "var(--text)",
      background: "var(--bg)",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>&#60;/&#62;</div>
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/app" /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/app" /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/app" /> : <SignupPage />} />
      <Route path="/app" element={user ? <App /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
