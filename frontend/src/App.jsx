//frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import MainPanel from "./components/MainPanel";
import AdminPanel from "./components/AdminPanel";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
      const { isAuthenticated, user, isLoading } = useAuth();

      if (isLoading) {
            return <div>Loading...</div>;
      }

      return (
            <BrowserRouter>
                  <div className="app">
                        <header>
                              <h1>OAuth 2.0 Demo</h1>
                              {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                        </header>

                        <main>
                              <Routes>
                                    <Route path="/" element={<MainPanel />} />
                                    <Route
                                          path="/admin"
                                          element={
                                                user && user.roles.includes("admin") ? (
                                                      <AdminPanel />
                                                ) : (
                                                      <Navigate to="/" replace />
                                                )
                                          }
                                    />
                              </Routes>
                        </main>
                  </div>
            </BrowserRouter>
      );
}

export default App;
