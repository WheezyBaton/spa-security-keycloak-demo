//frontend/src/contextAuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);

      const userManager = new UserManager({
            authority: import.meta.env.VITE_KEYCLOAK_URL,
            client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
            redirect_uri: window.location.origin,
            response_type: "code",
            scope: "openid profile",
            filterProtocolClaims: true,
            loadUserInfo: true,
            userStore: new WebStorageStateStore({ store: localStorage }),
      });

      useEffect(() => {
            userManager.clearStaleState();

            const handleCallback = async () => {
                  setIsLoading(true);
                  try {
                        const user = await userManager.signinRedirectCallback();
                        setUser({
                              ...user.profile,
                              roles: user.profile.roles || [],
                        });
                        setIsAuthenticated(true);
                        window.history.replaceState({}, document.title, window.location.pathname);
                  } catch (err) {
                        console.error("Callback error:", err);
                        setError("Błąd podczas logowania. Spróbuj ponownie.");
                  } finally {
                        setIsLoading(false);
                  }
            };

            if (window.location.search.includes("code=")) {
                  handleCallback();
            } else {
                  userManager
                        .getUser()
                        .then((user) => {
                              if (user) {
                                    setUser({
                                          ...user.profile,
                                          roles: user.profile.roles || [],
                                    });
                                    setIsAuthenticated(true);
                              }
                              setIsLoading(false);
                        })
                        .catch((err) => {
                              console.error("Failed to load user:", err);
                              setIsLoading(false);
                        });
            }

            const onUserLoaded = (user) => {
                  setUser({
                        ...user.profile,
                        roles: user.profile.roles || [],
                  });
                  setIsAuthenticated(true);
                  setIsLoading(false);
            };

            const onUserUnloaded = () => {
                  setUser(null);
                  setIsAuthenticated(false);
                  setIsLoading(false);
            };

            userManager.events.addUserLoaded(onUserLoaded);
            userManager.events.addUserUnloaded(onUserUnloaded);

            return () => {
                  userManager.events.removeUserLoaded(onUserLoaded);
                  userManager.events.removeUserUnloaded(onUserUnloaded);
            };
      }, []);

      const login = async () => {
            setIsLoading(true);
            setError(null);
            try {
                  await userManager.signinRedirect();
            } catch (err) {
                  console.error("Login error:", err);
                  setError("Błąd podczas próby logowania");
                  setIsLoading(false);
            }
      };

      const logout = async () => {
            setIsLoading(true);
            try {
                  await userManager.signoutRedirect();
            } catch (err) {
                  console.error("Logout error:", err);
                  setError("Błąd podczas wylogowywania");
                  setIsLoading(false);
            }
      };

      return (
            <AuthContext.Provider
                  value={{
                        user,
                        isAuthenticated,
                        isLoading,
                        error,
                        login,
                        logout,
                  }}
            >
                  {children}
            </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext);
