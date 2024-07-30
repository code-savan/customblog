"use client";

import { Mail, Lock, User } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Input from "@/components/shared/Input";
import PasswordInput from "@/components/shared/PasswordInput";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(user);
    try {
      if (!user.name || !user.email || !user.password) {
        setError("please fill all the fields");
        return;
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setError("invalid email id");
        return;
      }
      const res = await axios.post("/api/register", user);
      console.log(res.data);
      if (res.status == 200 || res.status == 201) {
        console.log("user added successfully");
        setError("");
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
      setError("");
    } finally {
      setLoading(false);

      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <section className="flex w-full h-[100dvh] m-0">
      <div className="h-[100dvh] w-[50%]">
        <Image
          alt="image"
          src="/bg1.jpg"
          className="h-full w-full object-cover"
          width={400}
          height={400}
        />
      </div>

      <div className="w-[50%] flex items-center justify-center h-[100dvh]">
        <form
          className=" px-5 py-6 space-y-6 rounded-xl shadow-slate-300 shadow-xl drop-shadow-2xl bg-white border border-slate-200"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="text-center font-bold text-[20px]">Sign Up to Blog</p>
            <p className="text-[13px] text-center text-slate-600 mt-1">
              Heyy there👋 Create an Account with us!
            </p>
          </div>
          <div className="flex flex-col w-full lg:px-5">
            <Input
              label={"Fullname"}
              type={"text"}
              placeholder={"John Doe"}
              inputIcon="true"
              icon={"/user.png"}
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-full lg:px-5">
            <Input
              label={"Email"}
              type={"email"}
              placeholder={"example@gmail.com"}
              inputIcon="true"
              icon={"/mail.png"}
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-full lg:px-5">
            <PasswordInput
              label={"Password"}
              placeholder={"***********"}
              value={user.password}
              onChange={handleInputChange}
              name="password"
            />
            <div className="grid place-items-center w-full mx-auto pt-7">
              {error && <p className="py-6 text-lg">{error}</p>}
              <button
                type="submit"
                className="bg-[#5D7DF3] text-white text-lg w-full px-8 py-2 rounded-md uppercase font-semibold"
              >
                {loading ? "Loading..." : " Register"}
              </button>
            </div>
            <div className="flex justify-center w-full items-center gap-3 py-3">
              <div className="border-b border-gray-300 py-2 w-full px-6" />
              <div className="mt-3 text-[15px]">or</div>
              <div className="border-b border-gray-300 py-2 w-full px-6" />
            </div>

            <div className=" text-slate-900 font-medium text-[12px] text-center">
              <span>Already have an account?</span>
              <a href="/sign-in" className="text-[#5D7DF3] pl-3 text-[12px]">
                Sign In
              </a>
            </div>
          </div>
        </form>
        
      </div>
    </section>
  );
};

export default Signup;

