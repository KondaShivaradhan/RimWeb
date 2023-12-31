import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import './GBtn.css'
import { Database } from "@phosphor-icons/react";
import { getAuth, signOut } from "firebase/auth";
const Header = () => {
  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth);

  if (user) {
    return (
      <div className=" 2xl:container 2xl:mx-auto  border-b-2">
        <div className="bg-background py-5 px-7">
          <div className="flex justify-evenly items-center">
            <div className="flex items-center space-x-3 lg:pr-16 pr-6">
              <img src={"https://raw.githubusercontent.com/KondaShivaradhan/rimexpo/main/rimmind/assets/icon.png"} className="h-20 scale-125" alt="" />
              <h2 className="font-normal text-2xl flex flex-row items-center gap-2 leading-6 text-primary">{user.displayName}
                <Database size={25} />
              </h2>
            </div>

            <ul className="hidden md:flex h-12 space-x-2">
              <li className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white bg-indigo-600 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 flex items-center shadow-md rounded">Analytics</li>
              <li className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 flex items-center shadow-md rounded">Arts</li>
              <li className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 flex items-center shadow-md rounded">New Record</li>
              <li className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 flex items-center shadow-md rounded">About</li>
              <button> I'M READY
              </button>
            </ul>
            <div className="w-32">
            <button className="Btn " onClick={() => {
              const auth = getAuth();
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                })
                .catch((error) => {
                  // An error happened.
                });
            }}>

              <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

              <div className="text">Logout</div>
            </button>
            </div>
         

          </div>

        </div>
      </div>

    );
  }
  else {
    navigate('/')
  }
}

export default Header;
