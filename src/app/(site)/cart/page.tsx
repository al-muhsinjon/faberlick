"use client";

import { Products } from "@/interfaces";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ShoppingCart = () => {
  const router = useRouter();
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<Products[]>(
    JSON.parse(localStorage.getItem("carts") as string) || []
  );

  const removeProduct = (id: number) => {
    const updatedCart = products.filter((product) => product.id !== id);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    setProducts(updatedCart);
  };

  const handleIncrement = (id: number) => {
    const updatedCart = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }

      return product;
    });

    localStorage.setItem("carts", JSON.stringify(updatedCart));
    setProducts(updatedCart);
  };

  const handleDecrement = (id: number) => {
    const existProduct = products.find((product) => product.id === id);

    if (existProduct?.quantity === 1) {
      removeProduct(existProduct.id);
    } else {
      const updatedCart = products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }

        return product;
      });

      localStorage.setItem("carts", JSON.stringify(updatedCart));
      setProducts(updatedCart);
    }
  };

  const handle = async () => {
    const token = JSON.parse(localStorage.getItem("token") as string) || "";

    const tel = prompt("Iltimos telefon raqamingizni kiriting");

    console.log(tel);

    if (token.access_token) {
      products.map((product) => {
        fetch("https://faberlick.pythonanywhere.com/product/orders/", {
          method: "POST",
          body: JSON.stringify({
            user: token.full_name,
            phone_number: tel,
            items: [
              {
                product: product.id,
                quantity: product.quantity,
              },
            ],
          }),
        });
      });
      toast.success("Ariza topshirildi");
    } else {
      router.replace("auth/login");
    }
  };

  return (
    <>
      {products.length ? (
        <div className="h-screen bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <div className="relative w-52">
                    <Image src={product.images[0]?.image} alt="" fill />
                  </div>
                  <div className="sm:ml-4 sm:flex sm:w-full gap-x-4 sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                        {product.translations.ru.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700 line-clamp-2">
                        {product.translations.ru.description}
                      </p>
                      <div className="flex items-center text-sm my-4">
                        <p>{product?.price}</p>
                        {product?.translations && (
                          <div className="flex items-center ml-2 mr-6">
                            {Array.from(
                              {
                                length: Math.floor(product.average_rating),
                              },
                              (_, i) => (
                                <StarIcon
                                  key={i}
                                  className="h-4 w-4 text-yellow-500"
                                />
                              )
                            )}
                            {Array.from(
                              {
                                length: 5 - Math.floor(product.average_rating),
                              },
                              (_, i) => (
                                <StarIconOutline
                                  key={i}
                                  className="h-4 w-4 text-yellow-500"
                                />
                              )
                            )}
                          </div>
                        )}
                        <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                          See all {product?.average_rating} reviews
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => handleDecrement(product.id)}
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center indent-2 text-xs outline-none"
                          type="number"
                          value={product.quantity}
                          min="1"
                          readOnly
                        />
                        <span
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => handleIncrement(product.id)}
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          {(product.price * product.quantity).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "usd",
                            }
                          )}
                        </p>
                        <button onClick={() => removeProduct(product.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                  {total.toLocaleString("en-US", {
                    currency: "usd",
                    style: "currency",
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">
                  {(10).toLocaleString("en-US", {
                    currency: "usd",
                    style: "currency",
                  })}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {(total + 10).toLocaleString("en-US", {
                      currency: "usd",
                      style: "currency",
                    })}
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-4 font-medium  text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div> */}
          </div>
          <div className="flex justify-center items-center mt-12">
            <button
              onClick={handle}
              className="py-4 px-6 bg-main text-white rounded-md"
            >
              Ariza qoldirish
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full">
          <div className="text-center">
            <div className="inline-flex rounded-full bg-yellow-100 p-4">
              <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
                <svg
                  className="w-16 h-16"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
            <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
              Shopping cart is empty
            </h1>
            <p className="text-slate-600 mt-5 lg:text-lg">
              The page you are looking for doesn&apos;t exist or <br />
              has been removed.
            </p>
            <Link href={"/"}>
              <button className="button py-2 px-6 bg-main mt-4 text-white border rounded hover:border-main hover:bg-opacity-90">
                Products
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
