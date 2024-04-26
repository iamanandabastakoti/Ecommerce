import React, { useEffect, useState } from "react";
import Offer from "../Components/Swipers/Offer";
import Nissbody from "../Components/NisseProduct/Nissbody";
import ProductsSwiper from "../Components/Swipers/ProductsSwiper";
import axios from "axios";
import Loader from "../Components/Loaders/Loader";

const Women = () => {
  const [data,setData]= useState([])
  const fetchMenData = async()=>{
    const res = await axios.get('https://clothify-api.onrender.com/items/type/women')
     setData(res.data)
  }

  useEffect(()=>{
    fetchMenData()

  },[])
 
  return (
    <>
   {
      data.length ==0 ? <Loader/> :
    <div className=" p-0 flex flex-col items-start  w-full min-h-screen">
      {/* <Offer /> */}
      {/* <Nissbody />  */}
      <div className="w-full h-auto flex justify-center mb-4" id="homeShop">
        <div className="w-11/12">
         
              <ProductsSwiper products={data} title={"Women"} type={"women"} />
              <ProductsSwiper products={data} title={""} type={"women"} />
        </div>
      </div>
    </div>
}
    </>
  );
};

export default Women;
