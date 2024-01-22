import React, { useEffect, useState } from 'react';
import { IProduct } from '../../entities/ProductCard/product.interface';
import { ProductsService } from '../../services/ProductsService';
import { ProductsCarousel }
  from '../../entities/ProductsCarousel/ProductsCarousel';
import { ProductCard } from '../../entities/ProductCard/ProductCard';

export const HotPricesCarousel: React.FC = () => {
  const [hotPrices, setHotPrices] = useState<IProduct[]>([]);

  useEffect(() => {
    ProductsService.getProductsByHotPrices()
      .then(setHotPrices);
  }, []);

  return (
    <ProductsCarousel title="Hot prices">
      {hotPrices.map(prod => (
        <ProductCard product={prod} key={prod.id} />
      ))}
    </ProductsCarousel>
  );
};
