import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SubCard from "../components/pricecards/SubCard";
import { UserContext } from "../context/context";

const Home = ({history}) => {
  const [state, setState] = useContext(UserContext);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data } = await axios.get("http://localhost:8000/api/prices");
    console.log("prices get request", data);
    setPrices(data);
  };

  const handleClick = async (e, price) => {
    e.preventDefault();
    if(state && state.token) {
      //make a request to the server, server will make the request to stripe and when payment completed the user will get redirected back to our site
      const {data} = await axios.post('http://localhost:8000/api/create-subscription', {
        priceId: price.id
        
      })
      window.open(data)
    } else {
        history.push('/register')
    }
  };

  return (
    <section
      className="
   bg-[#f3f3f3]
   pt-12
   lg:pt-[4rem]
   pb-12
   lg:pb-[90px]
  flex
   overflow-hidden
   "
    >
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-1/2">
              <h2
                className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-4
                  "
              >
Transparent pricing for every step in your Bitcoin journey.
              </h2>
              <p className="text-base text-body-color">
                But first hire Justin ;) 
              </p>
            </div>
          </div>
        </div>
        {prices &&
          prices.map((price) => (
            <SubCard
              key={price.id}
              price={price}
              handleSubscription={handleClick}
            />
          ))}
      </div>
    </section>
  );
};

export default Home;
