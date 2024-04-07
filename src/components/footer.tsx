import { Instagram, Send } from "lucide-react";
import React from "react";
import Link from "next/link";

const Footer = async () => {
  return (
    <footer className="bg-main text-white  border-t">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="text-3xl font-medium text-dark-blue">
            Faberlic
          </Link>
          <ul className="flex flex-wrap w-[50%] items-center mb-6 text-sm font-medium text-gray sm:mb-0 ">
            <li>Assa</li>
            <li>Assa</li>
            <li>Assa</li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              Faberlic
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center gap-6 sm:mt-0">
            <Link
              className="p-3 bg-main text-white bg-opacity-90 hover:bg-opacity-100 hover:bg-white hover:text-main  border rounded-full"
              href={"/"}
            >
              <Instagram />
            </Link>
            <Link
              className="p-3 bg-main hover:bg-opacity-100 hover:bg-white hover:text-main text-white bg-opacity-90  border rounded-full"
              href={"/"}
            >
              <Send />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
