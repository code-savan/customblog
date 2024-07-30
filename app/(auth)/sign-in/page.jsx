"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Input from "@/components/shared/Input"
import PasswordInput from "@/components/shared/PasswordInput"
import Image from "next/image";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
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
    try {
      if (!user.email || !user.password) {
        setError("please fill all the fields");
        return;
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setError("invalid email id");
        return;
      }

      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        console.log(res);
        setError("error");
      }

      setError("");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("");
    } finally {
      setLoading(false);

      setUser({
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
            <p className="text-center font-bold text-[20px]">Sign in to Blog</p>
            <p className="text-[13px] text-center text-slate-600 mt-1">
              Welcome back! Please sign in to continue
            </p>
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
              <button
                type="submit"
                className="bg-[#5D7DF3] text-white text-lg w-full px-8 py-2 rounded-md uppercase font-semibold"
              >
                Login
              </button>
            </div>
            <div className="flex justify-center w-full items-center gap-3 py-3">
              <div className="border-b border-gray-300 py-2 w-full px-6" />
              <div className="mt-3 text-[15px]">or</div>
              <div className="border-b border-gray-300 py-2 w-full px-6" />
            </div>

            <div className=" text-slate-900 font-medium text-[12px] text-center">
              <span>Don&apos;t have an account?</span>
              <a href="/sign-up" className="text-[#5D7DF3] pl-3 text-[12px]">
                Create an account
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
