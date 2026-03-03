//oauth-project/frontend/src/components/LogoutButton.jsx
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
      const { logout, user } = useAuth();

      return (
            <div className="user-info">
                  <span>Welcome, {user?.given_name || user?.preferred_username}</span>
                  <button onClick={logout} className="logout-btn">
                        Logout
                  </button>
            </div>
      );
};

export default LogoutButton;
