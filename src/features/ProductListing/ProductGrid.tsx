// ProductGrid.tsx

import { type Product } from '../../services/apiProducts';
import ProductCardListing from '../../ui/ProductCardListing';

interface ProductGridProps {
  products: Product[];
}

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCardListing
            key={product.id}
            product={product}
            className="min-w-[220px]"
          />
        ))
      ) : (
        <div className="col-span-full mt-6 text-center text-lg text-text">
          No products match your search criteria.
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
