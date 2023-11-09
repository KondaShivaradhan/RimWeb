import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import AddPostForm from "../components/Add";
import { fetchcomplete, handleFormSubmit } from "../Misc/BackedFunc";
import { getAuth, signOut } from "firebase/auth";
import Search from "../components/search";
const DashboardOLD: React.FC = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [records, setrecord] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // console.log(user);
    }
  });

  const fetchAll = async () => {
    try {
      let output = {
        user: user?.email,
      };
      await fetchcomplete(output)
        .then((message: string) => {
          console.log(message);
          setrecord(JSON.stringify(message));
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {}
  };
  return (
    <>
      {/* <GoogleDriveAccess /> */}
      <div>
        <p>This is Home after login {user?.displayName}</p>
        <img
          height={30}
          width={30}
          src={
            user?.photoURL
              ? user?.photoURL
              : "https://freesvg.org/img/Website-No-Image-Icon.png"
          }
        />
        <AddPostForm user={user} onSubmit={handleFormSubmit}></AddPostForm>
        <button
          onClick={() => {
            fetchAll();
          }}
        >
          Click here to fetch all
        </button>
        <button
          onClick={() => {
            const auth = getAuth();
            signOut(auth)
              .then(() => {
                // Sign-out successful.
              })
              .catch((error) => {
                // An error happened.
              });
          }}
          type="button"
        >
          Signout
        </button>

        {records.length > 2 && <Search records={JSON.parse(records)}></Search>}
      </div>
    </>
  );
};

export default DashboardOLD;
