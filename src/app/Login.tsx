import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import "../components/GBtn.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { AndroidLogo } from "@phosphor-icons/react";
import { urls } from "../Misc/Constants";
import axios from "axios";

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },]
 
export default function LoginPage() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };
  const test = async () => {

    const fetchAPK = await axios.get(urls.getAPK)
    console.log('came here');

    const apkLink = document.getElementById("yourApkLink");
    if (apkLink) {
      console.log(fetchAPK.data);
      apkLink.setAttribute("href", fetchAPK.data);
    }
}
  useEffect(() => {
    try {
      test()
    } catch (error) {
      
    }
  
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="relative isolate overflow-auto bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".2"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="px-6 lg:px-8">
          <nav className="container flex mx-auto items-center  pt-6" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-16 scale-125" src="icon.png" alt="" />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <button onClick={GoogleLogin} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">

                Log In
              </button>
            </div>
          </nav>

          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                Now on Web Platform!{' '}
                {/* <a href="#" className="font-semibold text-white">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a> */}
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Never Forget, Always Secure
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                In the world of Rimmind, trust is earned through security, not just words. Our application ensures the utmost security from the moment you entrust us with your information. Every piece of data you add is encrypted and securely transmitted to our database, fortifying the foundation of your digital vault. With Rimmind, rest assured that your memories and information are shielded with the highest level of protection, allowing you to focus on what matters most. Your trust is our priority, and we uphold it with an unyielding commitment to security.  </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {/* <button onClick={GoogleLogin} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                  <svg className="w-8 h-8 shrink-0 fill-neutral-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                    <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                  </svg>
                  Sign in with Google
                </button> */}
                <button
                  onClick={GoogleLogin}
                  className="group w-12 hover:w-60 h-12 hover:bg-sky-600 relative bg-sky-700 rounded text-neutral-50 duration-700 before:duration-700 before:hover:500 font-bold flex justify-start gap-2 items-center p-2 pr-6 before:absolute before:-z-10 before:left-8 before:hover:left-40 before:w-6 before:h-6 before:bg-sky-700 before:hover:bg-sky-600 before:rotate-45"
                >
                  <svg className="w-8 h-8 shrink-0 fill-neutral-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                    <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                  </svg>
                  <span
                    className="origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-500 opacity-0 group-hover:opacity-100 border-l-2 px-1 transform scale-x-0 group-hover:scale-x-100 transition-all"
                  >Login with Google
                  </span>
                </button>


              </div>
            </div>
          </div>
        </div>
     
        <a id="yourApkLink" target="_blank" rel="noopener noreferrer">
      <div className="fixed -bottom-1 p-4  left-0 right-0 mx-auto rounded-2xl h-16 bg-white animate-bounce infinite flex items-center justify-center w-fit">
        <div className="flex flex-row items-center justify-evenly gap-4">
          <AndroidLogo size={32} weight="duotone" />
          <h3>Available for Android</h3>
        </div>
      </div>
      </a>
      </div>
    
    </>
  );
}
