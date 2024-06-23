import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [redirecter, setRedirecter] = useState(false);
  const [confirmations, setConfirmations] = useState(false);

  const passwordChecker = (pass) => {
    const letterReg = /[a-zA-Z]/;
    const sayiReg = /[0-9]/;

    const hasLetter = letterReg.test(pass);
    const hasNumber = sayiReg.test(pass);
    return hasLetter && hasNumber;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (
      (password.length > 5) & passwordChecker(password) &&
      password === confPass
    ) {
      try {
        await axios.post(`/register`, {
          email,
          password,
        });
        alert("Registration successful.");
        setEmail("");
        setPassword("");
        setConfPass("");
      } catch (error) {
        alert("Already registered with this email.");
      }
      setRedirecter(true);
    } else if (password !== confPass) {
      setPasswordError(true);
    } else {
      setConfirmations(true);
    }
  };

  return (
    <div>
      <div className="w-full h-screen pt-10 justify-center flex">
        <form
          className="border rounded-md shadow-md w-fit h-fit p-6 flex flex-col gap-4"
          onSubmit={registerUser}
        >
          <div className="border-b pb-3 flex items-center justify-between">
            <Link to={"/"}>
              <MdClose />
            </Link>
            <div className="flex-1 text-center">
              <h1 className="text-3xl font-bold">Register</h1>
            </div>
          </div>
          <h1 className="font-semibold text-2xl">Welcome to Airbnb</h1>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="email"
              className="border shadow-md rounded-md pl-4 md:w-96 w-full py-3"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              className="border rounded-md shadow-md px-4 py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="password repeat"
              className="border rounded-md shadow-md px-4 py-3"
              value={confPass}
              onChange={(e) => setConfPass(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            {passwordError ? (
              <span className="text-red-400 font-bold text-sm">
                Password didn't match.
              </span>
            ) : (
              " "
            )}
            {confirmations ? (
              <span className="text-red-400 font-bold text-sm w-80 mb-2">
                Password must include a letter and a number, and be at least 6
                characters long.
              </span>
            ) : (
              " "
            )}
            <span className="opacity-70 text-sm">
              We are gonna send you e-mail for confirmation.
            </span>
          </div>
          <button className="bg-airbnb text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-100 ease-in">
            Register
          </button>
          <div className="-mt-1">
            <span>Already a member?</span>
            <Link to="/login" className="underline font-semibold ml-1 ">
              Login
            </Link>
          </div>
        </form>
      </div>
      {redirecter && <Navigate to="/login" />}
    </div>
  );
};

export default Register;
