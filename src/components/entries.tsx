"use client";
import useFilter from "@/hooks/use-filter";
import ProductCard from "./product-card";
import { Products } from "@/types";
import useLanguage from "@/hooks/use-languages";

interface EntriesProps {
  filterData: Products[];
  start?: number;
  end?: number;
}

const EntriesProduct: React.FC<EntriesProps> = ({ filterData, start, end }) => {
  const filter = useFilter();
  const language = useLanguage();
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-6 items-center">
      {filterData
        .filter((entry) => {
          return filter.text.toLowerCase() === ""
            ? entry
            : entry.translations[language.language].name
                .toLowerCase()
                .includes(filter.text.toLowerCase()) ||
                entry.translations[language.language].short_description
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
