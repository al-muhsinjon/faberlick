"use client";

import auth from "@/actions/auth";
import Button from "@/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [tokenCheck, setTokenCheck] = useState(
    tokend?.refresh_token ? true : false
  );

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

  useEffect(() => {
    setTokenCheck(tokend?.refresh_token ? true : false);
  }, [tokend]);

  const back = () => {
    router.replace("/cart");
  };
  const logOut = () => {
    auth
      .logOut(tokend?.refresh_token || "")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("token");
        toast.success("Successfully logged out");
        setTokenCheck(true);
        router.refresh();
      });
  };

  const loginFunc = async (e: SyntheticEvent) => {
    e.preventDefault();
    await auth
      .login(email, password)
      .then((data) => data.json())
      .then((response) => {
        if (response.detail) {
          toast.error(response.detail);
          return;
        }
        setToken(response);
        setTokenCheck(false);
        router.refresh();
        toast.success("Login success");
      })
      .catch((error) => {
        setError("Login failed. Please check your credentials.");
        console.log(error);
      });
  };

  return (
    <>
      {!tokenCheck ? (
        <div className="grid place-items-center h-screen">
          <div className="shadow-lg p-5 rounded-lg border-t-4 border-main">
            <h1 className="text-xl font-bold my-4">Login</h1>
            <form onSubmit={loginFunc} className="flex flex-col gap-3">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                className="w-full border border-gray-200 py-2 px-6 bg-zinc-100/40"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                className="w-full border border-gray-200 py-2 px-6 bg-zinc-100/40"
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
      ) : (
        <div className="flex justify-center h-screen items-center">
          <div>
            <h2 className="text-center text-3xl font-bold leading-loose my-4">
              Ro&apos;yxatdan o&apos;tgansiz
            </h2>
            <div className="flex gap-5">
              <Button onClick={back}>Savatga qaytish</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
