"use client";

import Button from "@/components/button";
import Feature from "@/components/feature";
import Hero from "@/components/hero";
import ProductCard from "@/components/product-card";
import { Products } from "@/interfaces";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

//Md = planshet  || Xl = Macbook

const HomePage = () => {
  const handle = () => {
    toast.success("Welcome");
  };

  const [lastProduct, setLastProduct] = useState<Products[]>();

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(
        `${process.env.NEXT_FABERLIC_API}/product/product-filterGet`
      );
      const product: Products[] = await res.json();
      console.log(product);
      setLastProduct(product.splice(0, 3));
    };

    fetching();
  }, []);

  console.log(lastProduct);
  return (
    <div>
      <Hero />

      <div className="my-6 px-[8%]">
        <div className="h-56 bg-[url(/since.png)] flex justify-around items-center">
          <div className="flex flex-col justify-center items-start">
            <h2 className="text-5xl font-bold uppercase my-4 ">
              up to 80% off.
            </h2>
            <Button onClick={handle} fill>
              Salom
            </Button>
          </div>
          <div className="bg-main w-36 h-36 flex items-center justify-center p-4 rounded-full">
            <h2 className="uppercase text-white italic inline">
              trusted since 1997
            </h2>
          </div>
        </div>
      </div>
      <section className="text-gray-600 px-[7%] body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-2">
            Eng yangi maxsulotlar
          </h1>
        </div>
        {lastProduct?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      <Feature />
    </div>
  );
};

export default HomePage;
