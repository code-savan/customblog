// import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-[300px] h-[100dvh] overflow-hidden bg-zinc-900 py-10 text-white">
      <div className=" flex flex-col justify-between h-full">
        <div>
          <div className="size-14 bg-yellow-600 rounded-full ml-8" />

          <div className="mt-8">
            <div className="flex py-3 pl-[50px] bg-yellow-600 space-x-2 items-center cursor-pointer">
              <Image
                src="/square-pen.png"
                alt="create"
                width={20}
                height={15}
              />
              <p className="text-white font-medium">Create Blog</p>
            </div>
          </div>
        </div>

        <div
          className="flex pl-[50px] space-x-3 items-center cursor-pointer hover:bg-zinc-800 transition py-3"
          // onClick={signOut}
        >
          <Image
            src={"/circle-help.png"}
            alt="logout"
            className="size-5"
            width={20}
            height={10}
          />
          <p className="text-[18px]">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
