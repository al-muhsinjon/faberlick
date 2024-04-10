"use client";
import { Instagram, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Categories } from "@/interfaces";
import useLanguage from "@/hooks/use-languages";

const Footer = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `https://faberlick.pythonanywhere.com/product/category/`
        );
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  const lang = useLanguage();
  return (
    <footer className="bg-main text-white border-t">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-3xl font-medium text-dark-blue">
            Faberlic
          </Link>
          <ul className="flex flex-wrap w-full md:w-[50%] items-center mb-6 text-sm font-medium text-gray sm:mb-0 ">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.translations.en.name}`}
                className="text-white opacity-50"
              >
                {category.translations[lang.language].name.toUpperCase()}
              </Link>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              Faberlic
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 md:mt-0 gap-6">
            <Link
              className="p-3 bg-main text-white bg-opacity-90 hover:bg-opacity-100 hover:bg-white hover:text-main border rounded-full"
              href={"/"}
            >
              <Instagram />
            </Link>
            <Link
              className="p-3 bg-main hover:bg-opacity-100 hover:bg-white hover:text-main text-white bg-opacity-90 border rounded-full"
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
