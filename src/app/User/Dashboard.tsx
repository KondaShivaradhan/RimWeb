import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { User, getAuth, signOut } from "firebase/auth";
import Search from "../../components/search";
import axios from "axios";
import { UserRecord } from "../../Misc/interfaces";
import { Decrypt, urls } from "../../Misc/Constants";
import { Plus } from "@phosphor-icons/react";
import Header from "../../components/Header";
const DashboardOLD: React.FC = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [records, setrecord] = useState<UserRecord[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      console.log(user);
    }
    fetchAll()
  }, []);

  const fetchAll = async () => {
    try {
      const emailObject = { email: user?.email };
      const config = { headers: { 'Content-Type': 'application/json' } };
      const response = await axios.post(`${urls.devNode}/rim`, emailObject, config);
      if (response.data === "exists" && user) {
        var temp: UserRecord[] = []

        const recordsResponse = await axios.get(`${urls.fetchRecords}?email=${user.email}`);
        // Decrpting data
        for (const key in recordsResponse.data) {
          if (recordsResponse.data.hasOwnProperty(key)) {
            const z = recordsResponse.data[key];
            const newArray = z.tags.map((x: any) => { return Decrypt(x, user.email as string) })

            try {
              const updated = {
                title: Decrypt(z.title, user.email as string),
                description: Decrypt(z.description, user.email as string),
                tags: newArray,
                media: z.media,
                ruid: z.ruid,
                userid: z.userid
              }
              temp.push(updated)

            } catch (error) {
              console.log(error);

            }

          }
        }
        console.log(temp.flatMap((t: any) => t.tags));
        setrecord(temp)
      }
    } catch (error) {
      setrecord([])

    }
  };
  return (
    <>
      <Header />
      {/* <GoogleDriveAccess /> */}
      <div className="min-h-screen flex justify-center">
        <div className="container">
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
          {records.length > 2 && <Search user={user as User} records={records}></Search>}
        </div>
        <div className="bg-white fixed z-50 bottom-8 right-10 p-2 rounded-full shadow-xl" >
          <a href="/new">
            <Plus size={32} />
          </a>
        </div>
      </div>
    </>
  );
};

export default DashboardOLD;
