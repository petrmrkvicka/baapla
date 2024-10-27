"use client";
import Basket, { BasketProvider } from "@/components/Basket";
import { useHandleBasket } from "@/hooks/useBasket";
import { useProducts } from "@/hooks/useProducts";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

export default function Component() {
  const { addToBasket } = useHandleBasket();
  const { products } = useProducts();

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as { [key: string]: Product[] });

  return (
    <BasketProvider>
      <div className="container mx-auto p-4 grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <h1 className="text-4xl font-bold mb-8">BAAApla Food Ordering</h1>

          {Object.entries(groupedProducts).map(
            ([category, categoryProducts]) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold mt-8 mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryProducts.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg">
                      <div className="relative w-full h-48 mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray-600">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => addToBasket(product.id)}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Add to Basket
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        <div className="col-span-2">
          {/* <OrderStatuses /> */}
          <Basket />
        </div>
      </div>
    </BasketProvider>
  );
}
