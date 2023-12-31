import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { Database } from "@phosphor-icons/react";
const Header = () => {
  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth);
  
  if (user) {
    return (
      <div className="2xl:container 2xl:mx-auto">
        <div className="bg-background rounded shadow-lg py-5 px-7">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-3 lg:pr-16 pr-6">
              <img src={"https://raw.githubusercontent.com/KondaShivaradhan/rimexpo/main/rimmind/assets/icon.png"} className="h-20 scale-125" alt="" />
              <h2 className="font-normal text-2xl flex flex-row items-center gap-2 leading-6 text-primary">{user.displayName}
                <Database size={25} />
              </h2>
            </div>

            <ul className="hidden md:flex h-12 space-x-2">
              <li className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white bg-indigo-600 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 flex items-center shadow-md rounded">Collections</li>
              <li className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 flex items-center shadow-md rounded">Arts</li>
              <li className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 flex items-center shadow-md rounded">Space</li>
              <li className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 flex items-center shadow-md rounded">Game</li>
              <li className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 flex items-center shadow-md rounded">Utility</li>
              <li className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 flex items-center shadow-md rounded">Cards</li>
            </ul>


          </nav>

        </div>
      </div>

    );
  }
  else {
    navigate('/')
  }
}

export default Header;
