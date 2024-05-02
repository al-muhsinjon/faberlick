"use client";
import useGender from "@/hooks/use-gender";
import { Products } from "@/types";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Gender = () => {
  const [active, setActive] = useState(false);

  const gender = useGender();
  const t = useTranslations("gender");

  const checkGender = (geder?: string) => {
    setActive(false);
    gender.onGenderChange(geder || "");
  };

  return (
    <div className="flex justify-between relative">
      <div>Products</div>
      <div className="cursor-pointer flex items-center gap-2" onClick={() => setActive(!active)}>
        {gender.gender || t("all")} <FaChevronDown />
      </div>
      {active && (
        <div className="w-auto p-2 z-[100] bg-main text-white font-medium absolute right-0 top-7">
          <ul>
            <li
              className="hover:bg-white hover:text-main cursor-pointer"
              onClick={() => checkGender("")}
            >
              {t("all")}
            </li>
            <li
              className="hover:bg-white hover:text-main cursor-pointer"
              onClick={() => checkGender("men")}
            >
              {t("men")}
            </li>
            <li
              className="hover:bg-white hover:text-main cursor-pointer"
              onClick={() => checkGender("women")}
            >
              {t("women")}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Gender;
