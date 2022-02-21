import React, { useState, useContext } from "react";
import Input from "../utils/reinput";
import Button from "../utils/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/context";

const Login = ({ history }) => {
  const [state, setState] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setEmail("");
        setPassword("");
        setState(data);
        localStorage.setItem('auth', JSON.stringify(data))
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", error);
    }
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col bg-[#f3f3f3]">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>
          <Input
            label="Email"
            type="email"
            value={email}
            setValue={setEmail}
            placeholder="Email"
          />

          <Input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="Password"
          />

          <Button handleClick={handleClick} text="Login" classname/>

          <div className="text-center text-sm text-grey-dark mt-4">
          Please Sign in {" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="https://keys.casa/company"
            >
              Terms and Conditions
            </a>{" "}
            and {" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="https://keys.casa/privacy"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
           {" "} Login
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
