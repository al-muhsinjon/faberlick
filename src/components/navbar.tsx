import React from "react";
import Languages from "./languages";
import Link from "next/link";
import Filter from "./filter";
import Image from "next/image";
import { ShoppingBag, User } from "lucide-react";
import { Categories } from "@/interfaces";

const Navbar = async () => {
  const res = await fetch(
    "https://faberlick.pythonanywhere.com/product/category/"
  );
  const categories: Categories[] = await res.json();
  // macbook : xl, Tablet : md
  return (
    <header className=" w-full  ">
      <div className=" px-[7%] bg-main flex relative items-center justify-between py-1">
        <Languages />
        <div className="text-white hidden  xl:flex gap-6">
          <Link href={"/"}>Help & Information</Link>
          <Link href={"/"}>Connect with us</Link>
        </div>
      </div>
      <div className="py-4 border-b xl:flex-row flex flex-col gap-y-6 justify-between px-[7%] items-center">
        <Filter />
        <Link href="/" className="text-3xl font-medium text-dark-blue">
          Faberlic
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href={"/auth/login"}
            className="py-2 border-2 rounded-lg border-main px-4 text-main"
          >
            <User className="text-2xl" />
          </Link>
          <Link
            href={"/cart"}
            className="py-2 px-4 bg-main relative text-white hover:bg-opacity-90 rounded-lg"
          >
            <ShoppingBag />
          </Link>
        </div>
      </div>
      <div className="h-12 flex justify-around border-b flex-wrap gap-5 items-center">
        {categories.map((category) => (
          <Link
            className="text-2xl font-bold"
            href={`/category/${category.translations.ru.name}`}
            key={category.id}
          >
            {category.translations.en.name.toUpperCase()}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
