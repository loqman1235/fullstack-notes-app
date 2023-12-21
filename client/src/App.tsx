import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { Navigate } from "react-router-dom";

const App = () => {
  const { isAuthenticated } = useSelector<RootState, RootState["auth"]>(
    (state: RootState) => state.auth
  );
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
      />
    </Routes>
  );
};
export default App;
