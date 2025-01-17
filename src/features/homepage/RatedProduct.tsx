import { FaStar } from 'react-icons/fa';
import { Product } from '../../services/apiProducts';
import OffersContainer from './OffersContainer';

type RatedProductProps = {
  products: Product[];
};

function RatedProduct({ products }: RatedProductProps) {
  return (
    <OffersContainer
      products={products}
      title="Rating Above 3.5"
      Icon={FaStar}
      iconColor="text-yellow-600 dark:text-yellow-800"
      filterProducts={(products) =>
        products.filter((product) => product.rating > 4)
      }
      linkTo="/products"
      bgColor="bg-rating-background"
    />
  );
}

export default RatedProduct;
