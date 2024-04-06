"use client";
import auth from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const page = () => {
  const [otp, setOtp] = useState("");

  const router = useRouter()
  const verifyFun = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await auth
        .verify(otp)
        .then((data) => data.json())
        .then((req) => {
          console.log(req);
        });
        router.replace("/auth/login")

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-main">
        <h1 className="text-xl font-bold my-4">Verify Email</h1>
        <form onSubmit={verifyFun} className="flex flex-col gap-3">
          <input
            type="number"
            value={otp}
            required
            placeholder="OTP Password"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            type="submit"
            className="bg-main text-white font-bold cursor-pointer px-6 py-2"
          >
            Verify Email
          </button>

          <Link href={"/auth/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default page;
