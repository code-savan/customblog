"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navLinks } from "@/constants";

const Header = () => {
  const  {data:session}  = useSession();
  return (
    <header className="w-full py-5 px-8">
      <nav className="flex justify-between items-center">
        <Image
          src={"/logo.png"}
          alt="logo"
          className="size-12"
          width={10}
          height={10}
        />

        <div className="flex space-x-6">
          {navLinks.map((item) => (
            <Link
              key={item.sn}
              href={item.route}
              className="text-slate-700 text-[15px]"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div>
          {session ? (
            <div className="flex items-center space-x-3">
              <Button variant={"outline"} size={"lg"}>
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
            </div>
          ) : (
            <Button variant={"outline"} size={"lg"}>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          )}
          
        </div>
      </nav>
    </header>
  );
};

export default Header;
