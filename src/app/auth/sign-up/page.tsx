"use client";
import auth from "@/actions/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const registerFun = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Parol ikkalasi ham bir xil emas");
      return;
    }

    try {
      await auth
        .signUp(email, first_name, last_name, password, password2)
        .then((result) => result.json())
        .then((req) => {
          console.log(req);
        });
      router.replace("/auth/verify");
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-main">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={registerFun} className="flex flex-col gap-3">
          <input
            type="text"
            value={first_name}
            required
            placeholder="First Name"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setFirst_name(e.target.value)}
          />
          <input
            type="text"
            value={last_name}
            required
            placeholder="Last Name"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setLast_name(e.target.value)}
          />
          <input
            type="email"
            value={email}
            required
            placeholder="Email"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            required
            placeholder="Parol"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            value={password2}
            required
            placeholder="Parolni qayta kiriting"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setPassword2(e.target.value)}
          />

          <button
            type="submit"
            className="bg-main text-white font-bold cursor-pointer px-6 py-2"
          >
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 mt-2 rounded-md">
              {error}
            </div>
          )}
          <Link href={"/auth/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
