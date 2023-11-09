import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef } from "react";
import "../App.css";
import "../components/GBtn.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import { initUser } from "../Misc/BackedFunc";
// https://youtu.be/qr2gR0UOlfg
export default function LoginPage() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("this function is from LoginPage");
      await initUser(result.user).then((data) => {
        console.log(data);
      });
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("user found !");
      navigate("/dash");
    } else if (loading) {
      console.log("loading");
    } else {
      console.log("login");
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div id="test">
            <div className="fullscreen-image"></div>
          </div>
          <div id="conBox">
            <button
              onClick={GoogleLogin}
              type="button"
              className="login-with-google-btn"
            >
              Sign in with Google
            </button>
          </div>
        </header>
      </div>
    </>
  );
}
