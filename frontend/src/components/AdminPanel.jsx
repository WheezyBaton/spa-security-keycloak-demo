//frontend/src/components/AdminPanel.jsx
import { useAuth } from "../context/AuthContext";

const AdminPanel = () => {
      const { user } = useAuth();

      return (
            <div className="panel admin-panel">
                  <h2>Administrator Panel</h2>
                  {user?.roles.includes("admin") ? (
                        <div className="admin-data">
                              <h3>Welcome to the admin panel</h3>
                              <p>You have full administrative privileges in the system</p>
                        </div>
                  ) : (
                        <div className="error">You do not have administrator privileges</div>
                  )}
            </div>
      );
};

export default AdminPanel;
