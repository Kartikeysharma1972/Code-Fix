import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8000" : window.location.origin;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Invalid token");
        return r.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("auth_token");
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const getAnonymousId = () => localStorage.getItem("debugger_user_id") || null;

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, anonymous_id: getAnonymousId() }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Login failed");
    localStorage.setItem("auth_token", data.token);
    localStorage.removeItem("debugger_user_id");
    setToken(data.token);
    setUser({ id: data.user_id, email: data.email, display_name: data.display_name });
    return data;
  };

  const signup = async (email, password, displayName) => {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        display_name: displayName,
        anonymous_id: getAnonymousId(),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Signup failed");
    localStorage.setItem("auth_token", data.token);
    localStorage.removeItem("debugger_user_id");
    setToken(data.token);
    setUser({ id: data.user_id, email: data.email, display_name: data.display_name });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
