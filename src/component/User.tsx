import React, { useEffect, useState } from "react";
import axios from "axios";
import Typewriter from "typewriter-effect";
import "./user.css";

interface IUser {
  email: string | null;
  createdAt: string;
  currentQualification: string | null;
  dob: string | null;
  fullName: string | null;
}

interface IState {
  user: IUser;
}

let User: React.FC = () => {
  const [userData, setUserData] = useState<IState>({
    user: {
      email: "",
      createdAt: "",
      currentQualification: "",
      dob: "",
      fullName: "",
    },
  });

  let accessToken = localStorage.getItem("accessToken");

  let getAllUser = async () => {
    try {
      let { data } = await axios.get(
        `https://dev.api.infigon.app/user/get-profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserData({ user: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <h1 className="effect">
        <Typewriter
          options={{
            strings: ["Welcome to Infigon Futures"],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>

      <div className="details">
        <div className="card">
          <p className="card-title">User Details</p>
          <p>Name: {userData.user.fullName || "N/A"}</p>
          <p>Email: {userData.user.email || "N/A"}</p>
          <p>Qualification: {userData.user.currentQualification || "N/A"}</p>
          <p>Date Of Birth: {userData.user.dob || "N/A"}</p>

          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
