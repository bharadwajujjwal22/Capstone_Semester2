import React from "react";

export default function Nav() {
  return (
    <div className="flex justify-between items-center px-8  bg-white shadow">

        <div className="flex space-x-6 text-m font-medium">
            <a className="font-semibold" href="#">About</a>
            <a className="font-semibold" href="#">Contact</a>
            <a className="font-semibold" href="#">Buy</a>
        </div>

        <div className="py-2 cursor-pointer">
            <img
                src="/assets/Uvenza.png"
                alt="Logo"
                className="w-30 h-15 "
            />

        </div>

        <div className=" flex text-m space-x-7 items-center font-medium cursor-pointer">
            <img 
            className="w-5 h-auto" 
            src="./assets/searchicon.png"></img>
            <img 
            className="w-8 h-auto" 
            src="./assets/shoppingCart.png"></img>
            <img 
            className="w-5 h-auto" 
            src="./assets/user.png"></img>
        </div>
    </div>
  );
}
