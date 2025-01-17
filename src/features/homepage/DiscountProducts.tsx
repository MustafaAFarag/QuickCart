import { FaTag } from 'react-icons/fa';
import { Product } from '../../services/apiProducts';
import OffersContainer from './OffersContainer';

type DiscountProductsProps = {
  products: Product[];
};

function DiscountProducts({ products }: DiscountProductsProps) {
  return (
    <OffersContainer
      products={products}
      title="Discounts Over 15%"
      Icon={FaTag}
      iconColor="text-red-600 dark:text-red-900"
      filterProducts={(products) =>
        products.filter((product) => product.discountPercentage > 18)
      }
      linkTo="/products"
      bgColor="bg-discount-background"
    />
  );
}

export default DiscountProducts;
