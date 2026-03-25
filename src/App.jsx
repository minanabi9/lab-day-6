import { Routes, Route, Navigate } from "react-router";
import { useAuthStore } from "./store/useAuthStore";
import LoginForm from "./components/LoginForm";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <div>Welcome to your Cart, Ahmed!</div>
          </ProtectedRoute>
        }
      />
        <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
