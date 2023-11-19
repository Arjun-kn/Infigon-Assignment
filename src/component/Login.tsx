import React, { useState, ChangeEvent, FormEvent } from "react";
import "./login.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
interface IState {
  user: {
    phoneNumber: string; // Change to string
    password: string;
  };
}
let Login: React.FC = () => {
  let [state, setState] = useState<IState>({
    user: {
      phoneNumber: "",
      password: "",
    },
  });
  let navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      let { data } = await axios.post(
        `https://dev.api.infigon.app/auth/signin-with-phone-and-password`,
        state.user
      );
      console.log(data);
      if (data?.accessToken) {
        toast.success("Login Successfull");
        navigate("/getuser");
      } else {
        toast.error("Unauthorize user");
      }
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error) {
      console.log(error);
      toast.error("Unauthorized User");
    }
  };

  return (
    <>
      <div className="logo">
        <img
          src="https://www.edumilestones.com/crm/images/infigon-logo-new.png"
          alt="logo"
        />
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="phoneNumber"
              value={state.user.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone Number"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={state.user.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>

          <button type="submit" className="register-btn">
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Login</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
