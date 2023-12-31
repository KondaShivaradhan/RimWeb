import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import "../components/GBtn.css";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("this function is from LoginPage");
      console.log(result.user);
      // const updatedUser: UserInterface = {
      //   email: `${result.user.email}`,
      //   name: `${result.user.displayName}`,
      //   photo: `${result.user.photoURL}`,
      // };
      // setusa(updatedUser)
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
      <div className="h-80 flex flex-row bg-red-400 items-center justify-center">
        <div className="h-fit bg-black rounded-lg flex-col p-5">
          <img src="icon.png" className="" height={100} width={100} alt="" />
          <p className="text-cyan-100">
          </p>
          <button onClick={GoogleLogin} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
              <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
}
