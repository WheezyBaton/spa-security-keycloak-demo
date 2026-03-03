//frontend/src/components/LoginButton.jsx
import { useAuth } from "../context/AuthContext";

const LoginButton = () => {
      const { login } = useAuth();

      return (
            <button onClick={login} className="login-btn">
                  Login
            </button>
      );
};

export default LoginButton;
