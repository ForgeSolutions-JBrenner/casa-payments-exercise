import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ChatAlt2Icon } from "@heroicons/react/outline";
import { UserContext } from "../../context/context";

const Success = ({ history }) => {
  const [state, setState] = useContext(UserContext);
  useEffect(() => {
    const getSubscriptionStatus = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/subscription-status"
      );
      console.log("SUBSCRIPTION STATUS => ", data);
      if (data && data.length === 0) {
        history.push("/");
      } else {
        //update user variables in localstorage, update and set it back
        const auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        //update user in UserContext
        setState(auth);

        //lets delay for 1 second to ensure that the auth variable is updated and ensure that all checks are complete for user authentication
        setTimeout(() => {
          history.push("/account");
        }, 1000);
      }
    };

    getSubscriptionStatus();
  }, []);
  return (
    <div className="">
      <div className="">
        <ChatAlt2Icon className="animate-spin h-14" />
      </div>
    </div>
  );
};

export default Success;
