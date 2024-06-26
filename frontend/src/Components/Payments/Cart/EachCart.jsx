import React, { useEffect, useState } from "react";
import GetNumberRange from "../../Inputs/GetNumberRange";
import GetSizeRange from "../../Inputs/GetSizeRange";
import { useDispatch } from "react-redux";
import {
  updateCartItemColor,
  updateCartItemQty,
  updateCartItemSize,
  removeItemFromCart,
} from "../../../redux/Slices/Cart/cartSlice";
import {
  SwiperImage1,
  SwiperImage2,
  SwiperImage3,
  SwiperImage4,
} from "../../../assets/index";
import { CiTrash, CiShoppingCart } from "react-icons/ci";
import { Button } from "@chakra-ui/react";

const EachCard = ({ items }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(items?.qty);
  const [size, setSize] = useState(items?.defaultSize);
  const [color, setColor] = useState(items?.defaultColor);

  const handleQtyChange = (newValue) => {
    setQty(newValue);
    dispatch(updateCartItemQty({ _id: items._id, qty: newValue }));
  };
  const handleSizeChange = (newValue) => {
    console.log(newValue);
    dispatch(
      updateCartItemSize({ _id: items._id, size: newValue })
    );
  };

  const totalPrice = qty * items?.price
  const options = ["HTML", "CSS", "JavaScript", "React", "Redux"];

  const onOptionChangeHandler = (event) => {
    const newColor = event.target.value;

    // Update local state
    setColor(newColor);

    // Dispatch action to update Redux state
    dispatch(
      updateCartItemColor({ _id: items._id, color: newColor })
    );
  };

  return (
    <div className=" flex h-32 w-full border-2 rounded-md  gap-5 ">
      <img
        src={items?.image && items?.image.length > 0 ? items.image[0] : "" }
        // src={SwiperImage1}
        alt=""
        className="w-28 h-28 m-1  rounded-md object-cover "
      />

      <div className="flex flex-col m-1  justify-evenly w-full ">
        <div className="font-bold sm:text-xl text-sm">
          <div>{items.name}</div>
          <div className="text-base text-red-500">${totalPrice}</div>
        </div>

        <div className="  text-base flex sm:flex-row flex-col justify-start  sm:gap-10 gap-2 text-secondary-text pt-2 ">
          <div className='flex gap-2 sm:gap-5  sm:flex-row flex-col  '>
          <div className="flex items-center ">
            <span className="font-medium sm:text-base text-xs w-10">Qty: </span>
            <GetNumberRange
              defaultvalue={qty}
              min={1} 
              onValueChange={handleQtyChange}
            />
          </div>
          <div className="flex items-center ">
            <span className="font-medium sm:text-base text-xs w-10">Size: </span>
            <GetSizeRange
              max={44}
              defaultvalue={size}
              min={1}
              maxw={"180px"}
              onValueChange={handleSizeChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <span className=" sm:text-base text-xs font-medium">Color:</span>
            <select
              onChange={onOptionChangeHandler}
              value={color}
              className="text-xs sm:text-base"
            >
              {items?.colors?.map((option, index) => {
                return (
                  <option key={index} value={option.color}>
                    {option.color}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      
      </div>
    </div>
    <div className="flex flex-col justify-center items-center"> 
        <div className='flex p-5  h-full  justify-center items-center cursor-pointer text-3xl bg-black rounded-r-md text-white' onClick={()=>dispatch(removeItemFromCart(items._id))}><CiTrash/></div>
        
        </div>
       
    </div>
  );
};

export default EachCard;
