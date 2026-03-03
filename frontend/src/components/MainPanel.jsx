//frontend/src/components/MainPanel.jsx
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MainPanel = () => {
      const { user, isAuthenticated } = useAuth();

      return (
            <div className="panel">
                  <h2>Main Panel</h2>
                  {isAuthenticated ? (
                        <>
                              <p>Logged in as: {user?.preferred_username}</p>
                              <p>Your roles: {user?.roles?.join(", ")}</p>
                              {user?.roles.includes("admin") && <Link to="/admin">Go to admin panel</Link>}
                        </>
                  ) : (
                        <p>Log in to see content</p>
                  )}
            </div>
      );
};

export default MainPanel;
