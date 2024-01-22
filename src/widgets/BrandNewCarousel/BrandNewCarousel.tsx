import React, { useEffect, useState } from 'react';
import { IProduct } from '../../entities/ProductCard/product.interface';
import { ProductsService } from '../../services/ProductsService';
import { ProductCard } from '../../entities/ProductCard/ProductCard';
import { ProductsCarousel }
  from '../../entities/ProductsCarousel/ProductsCarousel';

export const BrandNewCarousel: React.FC = () => {
  const [brandNew, setBrandNew] = useState<IProduct[]>([]);

  useEffect(() => {
    ProductsService.getBrandNewProducts()
      .then(setBrandNew);
  }, []);

  return (
    <ProductsCarousel title="Brand new models">
      {brandNew.map(prod => (
        <ProductCard product={prod} key={prod.id} />
      ))}
    </ProductsCarousel>
  );
};
