// "use client";
// import useLanguage from "@/hooks/use-languages";
// import { Products } from "@/types";
// import { ShoppingCart, Star } from "lucide-react";
// import Image from "next/image";
// import React from "react";
// import IconButton from "./icon-button";
// import Link from "next/link";
// import toast from "react-hot-toast";

// interface ProductCardProps {
//   product: Products;
// }

// export const revalidate = 0;

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const handleClick = () => {
//     const products: Products[] =
//       JSON.parse(localStorage.getItem("carts") as string) || [];

//     const isExistProduct = products.find((c) => c.id === product?.id);

//     if (isExistProduct) {
//       const updateData = products.map((c) => {
//         if (c.id === product?.id) {
//           return {
//             ...c,
//             quantity: c.quantity + 1,
//           };
//         }
//         return c;
//       });
//       localStorage.setItem("carts", JSON.stringify(updateData));
//     } else {
//       const data = [...products, { ...product, quantity: 1 }];
//       localStorage.setItem("carts", JSON.stringify(data));
//     }
//     toast.success("Maxsulotingiz qo'shildi");
//   };
//   const lang = useLanguage();
//   const { translations, images, price, average_rating } = product;

//   const formattedPrice = new Intl.NumberFormat("en-US").format(price);
//   return (
//     <div className="w-full max-w-sm bg-white border h-auto border-gray-200 rounded-lg shadow ">
//       <Link href={`/product/${product.id}`}>
//         <div className="relative">
//           <span className="px-2 py-1 bg-main text-white left-4 z-10 uppercase absolute top-4">
//             {translations[lang.language].tag}
//           </span>
//         </div>
//         <div className="aspect-square h-56 lg:h-auto flex justify-center items-center rounded-xl bg-gray-100 relative">
//           <Image
//             src={images[0]?.image}
//             fill
//             alt="Image"
//             className="aspect-square object-cover xl:ml-auto ml-10 rounded-md p-6"
//           />
//         </div>
//       </Link>
//       <div className="px-5 pb-5">
//         <Link href={`/product/${product.id}`}>
//           <div>
//             <h5 className="text-lg h-12 font-bold tracking-tight text-slate-800 ">
//               {translations[lang.language].name}
//             </h5>
//             <p className="font-semibold tracking-tight text-neutral-500">
//               {translations[lang.language].short_description}
//             </p>
//           </div>
//         </Link>

//         <div className="flex items-center mt-2.5 mb-5">
//           <Star className="text-yellow-500" />
//           <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
//             {average_rating}
//           </span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-xl font-bold text-gray-900 ">
//             {formattedPrice} so&apos;m
//           </span>
//           <IconButton
//             onClick={handleClick}
//             icon={<ShoppingCart />}
//             className="border"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

"use client";

import { FC } from "react";
import useLanguage from "@/hooks/use-languages";
import { Products } from "@/types";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import IconButton from "./icon-button";
import Link from "next/link";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Products;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const lang = useLanguage();
  const { translations, images, price, average_rating } = product;

  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  const handleClick = () => {
    const products: Products[] = JSON.parse(
      localStorage.getItem("carts") || "[]"
    );

    const updatedProducts = products.map((p) =>
      p.id === product?.id ? { ...p, quantity: p.quantity + 1 } : p
    );

    if (products.find((p) => p.id === product?.id)) {
      localStorage.setItem("carts", JSON.stringify(updatedProducts));
    } else {
      localStorage.setItem(
        "carts",
        JSON.stringify([...products, { ...product, quantity: 1 }])
      );
    }

    toast.success("Maxsulotingiz qo'shildi");
  };

  return (
    <div className="w-full max-w-sm bg-white border h-auto border-gray-200 rounded-lg shadow ">
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <span className="px-2 py-1 bg-main text-white left-4 z-10 uppercase absolute top-4">
            {translations[lang.language].tag}
          </span>
        </div>
        <div className="aspect-square h-56 lg:h-auto flex justify-center items-center rounded-xl bg-gray-100 relative">
          <Image
            src={images[0]?.image}
            fill
            alt="Image"
            className="aspect-square object-cover xl:ml-auto ml-10 rounded-md p-6"
          />
        </div>
      </Link>
      <div className="px-5 pb-5">
        <Link href={`/product/${product.id}`}>
          <div>
            <h5 className="text-lg h-12 font-bold tracking-tight text-slate-800 ">
              {translations[lang.language].name}
            </h5>
            <p className="font-semibold tracking-tight text-neutral-500">
              {translations[lang.language].short_description}
            </p>
          </div>
        </Link>

        <div className="flex items-center mt-2.5 mb-5">
          <Star className="text-yellow-500" />
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {average_rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 ">
            {formattedPrice} so&apos;m
          </span>
          <IconButton
            onClick={handleClick}
            icon={<ShoppingCart />}
            className="border"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
