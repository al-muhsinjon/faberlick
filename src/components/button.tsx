"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  fill?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  fill = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        fill
          ? "bg-main text-white border-none"
          : "bg-transparent text-dark-blue border border-main"
      } px-12 py-3 font-bold uppercase hover:bg-main hover:text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
