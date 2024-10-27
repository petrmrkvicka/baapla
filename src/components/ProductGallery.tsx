import { Product } from "@/app/api/products/route";

const ProductGallery = ({ products }: { products: Product[] }) => {
  console.log(products);
  throw new Error("It's empty here...");
};

export default ProductGallery;
