import React, { useEffect, useState, useContext } from "react";
import { UserCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import { UserContext } from "../context/context";
import moment from "moment";

const Account = ({ history }) => {
  const [state, setState] = useContext(UserContext);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const getSubscriptions = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/subscriptions"
      );
      console.log("subs => ", data);
      setSubscriptions(data.data);
    };

    if (state && state.token) getSubscriptions();
  }, [state && state.token]);

  const manageSubscription = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/customerportal"
    );
    window.open(data);
  };
  return (
    <div className="container ml-8 mt-4">
      <div className="flex flex-col">
        <h1 className="font-bold"> Account Information</h1>
        <h1>{state.user.name}</h1>
        <p className="lead pb-4">{state.user.email}</p>
        <div className="">
          {subscriptions &&
            subscriptions.map((subscription) => (
              <div className="" key={subscription.id}>
                <section>
                  <hr />
                  <h4 className="font-bold">{subscription.plan.nickname}</h4>
                  <h5>
                    {" "}
                    {(subscription.plan.amount / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                  <p className="capitalize">{subscription.status}</p>
                  <p className="">
                    {subscription.default_payment_method.card.last4}
                  </p>
                  <p className="">
                    Current Period End:{" "}
                    {moment(subscription.current_period_end * 1000).format(
                      "MMMM, Do YYYY"
                    )}
                  </p>
                  <div className="">
                    <button
                      className="p-2 bg-indigo-600 m-1 rounded"
                      onClick={manageSubscription}
                    >
                      Manage Subscription
                    </button>
                  </div>
                </section>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
