"use client";
import auth from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const token = JSON.parse(localStorage.getItem("token") as string) || "";
  const loginFunc = async (e: SyntheticEvent) => {
    e.preventDefault();
    await auth
      .login(email, password)
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", JSON.stringify(response));
      });
  };
  console.log(token);

  useEffect(() => {
    if (token.access_token) {
      router.replace("/");
    }
  }, []);

  //   access_token
  // :
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyMjk3NzgwLCJpYXQiOjE3MTIyOTcxODAsImp0aSI6ImUxMjdlMzhjZmJmODQ3Nzg4OGRlNmMwNDJhNjFiZjZmIiwidXNlcl9pZCI6NH0.lHsFaVx4-7ROhqg9ka4dWU0iQgBEZ6TtKVcq-1H6vnk"
  // email
  // :
  // "muhsinjonmullajonov0@gmail.com"
  // full_name
  // :
  // "Muhsinjon Mullajonov"
  // refresh_token
  // :
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMjM4MzU4MCwiaWF0IjoxNzEyMjk3MTgwLCJqdGkiOiJjM2FlNmFiMmExZDE0MjA1YWFhOWE0ZDExNjhlN2MzYSIsInVzZXJfaWQiOjR9.tzRUqVHW7MCyZX6o80GEbBeZRfLVD4MMtMxazBWuUQ0"

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
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
