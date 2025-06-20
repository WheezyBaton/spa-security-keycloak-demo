//oauth-project/frontend/src/components/MainPanel.jsx
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MainPanel = () => {
      const { user, isAuthenticated } = useAuth();

      return (
            <div className="panel">
                  <h2>Panel główny</h2>
                  {isAuthenticated ? (
                        <>
                              <p>Zalogowany jako: {user?.preferred_username}</p>
                              <p>Twoje role: {user?.roles?.join(", ")}</p>
                              {user?.roles.includes("admin") && <Link to="/admin">Przejdź do panelu admina</Link>}
                        </>
                  ) : (
                        <p>Zaloguj się aby zobaczyć zawartość</p>
                  )}
            </div>
      );
};

export default MainPanel;
