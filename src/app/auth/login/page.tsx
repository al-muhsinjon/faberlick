"use client";

import auth from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";

interface TokenProps {
  access_token: string;
  email: string;
  full_name: string;
  refresh_token: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tokend, setToken] = useState<TokenProps | null>(null); // Tokend o'zgaruvchisini null qiymati bilan boshladik
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Tokend o'zgaruvchisi o'zgarganida localStorage ga yozamiz
    if (tokend) {
      localStorage.setItem("token", JSON.stringify(tokend));
    }
  }, [tokend]);

  // localStorage dan token o'zgaruvchisini olish
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const loginFunc = async (e: SyntheticEvent) => {
    e.preventDefault();
    await auth
      .login(email, password)
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        setToken(response);
      })
      .catch((error) => {
        setError("Login failed. Please check your credentials.");
      });
  };

  useEffect(() => {
    // Token mavjud bo'lsa, avvalgi sahifaga o'tamiz
    if (tokend?.access_token) {
      router.replace("/");
    }
  }, [tokend, router]);

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-main">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={loginFunc} className="flex flex-col gap-3">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
          />
          <button className="bg-main text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 mt-2 rounded-md">
              {error}
            </div>
          )}
          <Link href={"/auth/sign-up"}>
            Don&apos;t have an account?{" "}
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
