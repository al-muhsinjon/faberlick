import Billboard from "@/components/billboard";
import EntriesProduct from "@/components/entries";
import PaginationControls from "@/components/pagination";
import { Categories, Products } from "@/interfaces";

interface CategoryProps {
  params: {
    categoryId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}
export const revalidate = 0;

const Category: React.FC<CategoryProps> = async ({ params, searchParams }) => {
  const res = await fetch(
    `https://faberlick.pythonanywhere.com/product/category/`
  );
  const productRes = await fetch(
    `https://faberlick.pythonanywhere.com/product/product-filterGet/`
  );
  const categories: Categories[] = await res.json();
  const products: Products[] = await productRes.json();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["number_page"] ?? "10";
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const data = categories.filter(
    (category) => category.translations.ru.name === params.categoryId
  );
  const filterData = products.filter(
    (product) => product.category.translations.ru.name === params.categoryId
  );

  return (
    <div className="w-full mx-auto  px-[7%]">
      <div className="my-6">
        <Billboard data={data} />
      </div>
      <EntriesProduct end={end} start={start} filterData={filterData} />

      <div>
        <PaginationControls
          hasNextPage={end < data.length}
          hasPrevPage={start > 0}
          length={products.length}
        />
      </div>
    </div>
  );
};

export default Category;
