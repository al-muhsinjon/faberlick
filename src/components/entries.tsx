"use client";
import useFilter from "@/hooks/use-filter";
import ProductCard from "./product-card";
import { Products } from "@/types";

interface EntriesProps {
  filterData: Products[];
  start? :number;
  end? :number;
}

const EntriesProduct: React.FC<EntriesProps> = ({ filterData, start, end }) => {
  const filter = useFilter();
  console.log(start, end)
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-6 items-center">
      {filterData
        .filter((entry) => {
          return filter.text.toLowerCase() === ""
            ? entry
            : entry.translations.en.name
                .toLowerCase()
                .includes(filter.text.toLowerCase()) ||
                entry.translations.en.short_description
                  .toLowerCase()
                  .includes(filter.text.toLowerCase());
        })
        .map((entry) => (
          <ProductCard key={entry.id} product={entry} />
        ))}
    </div>
  );
};

export default EntriesProduct;
