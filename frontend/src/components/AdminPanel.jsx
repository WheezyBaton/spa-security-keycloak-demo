//oauth-project/frontend/src/components/AdminPanel.jsx
import { useAuth } from "../context/AuthContext";

const AdminPanel = () => {
      const { user } = useAuth();

      return (
            <div className="panel admin-panel">
                  <h2>Panel Administratora</h2>
                  {user?.roles.includes("admin") ? (
                        <div className="admin-data">
                              <h3>Witaj w panelu administracyjnym</h3>
                              <p>Masz pełne uprawnienia administracyjne w systemie</p>
                        </div>
                  ) : (
                        <div className="error">Brak uprawnień administratora</div>
                  )}
            </div>
      );
};

export default AdminPanel;
