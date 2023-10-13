import { Navigate } from "react-router-dom";
export { PrivateRoute };
function PrivateRoute({ children }) {
  if (!JSON.parse(localStorage.getItem("login"))) {
    return <Navigate to="/" />;
  }
  return children;
}
