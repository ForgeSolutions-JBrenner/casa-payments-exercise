import React, { useState, useContext} from "react";
import Input from "../utils/reinput";
import Button from "../utils/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/context";

const Register = ({ history }) => {
  const [setState] = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setName("");
        setEmail("");
        setPassword("");
        toast.success(`${data.user.name}, welcome to CASA!`);
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
      <div className="bg-[#f3f3f3] min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <Input
              type="text"
              label="Name"
              value={name}
              setValue={setName}
              placeholder="Full Name"
            />

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

            <Button  handleClick={handleClick} text="Register" />

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
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
              Log in
            </a>
            .
          </div>
        </div>
      </div>
  );
};

export default Register;
