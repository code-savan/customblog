"use client";

import Image from "next/image";
import React, { useState } from "react";

const PasswordInput = ({ label, placeholder, value, onChange, name }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full">
      <div className="relative">
        <label htmlFor="" className="text-color-1 text-[15px] font-semibold">
          {label}
        </label>
        <input
          className={`h-[42px] w-full rounded-[5px] border-[0.5px] 
        border-slate-300 mt-2 focus:outline-none px-3 text-[14px] text-color-1 pl-[45px]`}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        <Image
          src={"/key.png"}
          className="absolute bottom-3 left-4"
          alt="key"
          width={20}
          height={20}
        />
        <Image
          src={show ? "/eye.png" : "/eye-off.png"}
          className="absolute right-3 bottom-3 cursor-pointer"
          alt="eye"
          width={20}
          height={20}
          onClick={() => setShow(!show)}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
