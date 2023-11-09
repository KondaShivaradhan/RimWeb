import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./User/Dashboard";
import DashboardOLD3 from "./User/Custome";

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="/" element={<Dashboard></Dashboard>}></Route>
          ) : (
            <Route path="/" element={<LoginPage />}></Route>
          )}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/dash" element={<DashboardOLD3 />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
