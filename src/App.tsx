import "./App.css";
import { Route, Routes } from "react-router-dom";
import { protectedPaths, unprotectedPaths } from "./Routes/routes";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { UseAuthContext } from "./context/authContext/AuthContext";

function App() {
  const { isLoggedIn } = UseAuthContext();

  return (
    <Routes>
      {unprotectedPaths.map((element) => (
        <Route
          key={element.path}
          path={element.path}
          element={element.component}
        />
      ))}
      {protectedPaths.map((element) => (
        <Route
          key={element.path}
          path={element.path}
          element={
            <ProtectedRoute
              component={element.component}
              isLoggedIn={isLoggedIn}
            />
          }
        />
      ))}
    </Routes>
  );
}

export default App;
