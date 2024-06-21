import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data);
      alert("login successfull");
      setRedirect(true);
    } catch (error) {
      alert("login failed");
    }
  };

  return (
    <div className="w-full h-screen pt-10 justify-center flex">
      <form
        className="border rounded-md shadow-md w-fit h-fit p-6 flex flex-col gap-4"
        onSubmit={loginHandler}
      >
        <div className="border-b pb-3 flex items-center justify-between">
          <div>
            <MdClose />
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
        </div>
        <h1 className="font-semibold text-2xl">Welcome to Airbnb</h1>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border shadow-md rounded-md pl-4 w-96  py-3"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md shadow-md px-4 py-3"
          />
        </div>

        <button className="bg-airbnb text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-100 ease-in">
          Login
        </button>
        <div className="-mt-1 wider">
          <span>Don't have an account yet?</span>
          <Link to="/register" className="underline font-semibold ml-1">
            Register
          </Link>
        </div>
      </form>
      {redirect ? <Navigate to="/" /> : ""}
    </div>
  );
};

export default LoginPage;
