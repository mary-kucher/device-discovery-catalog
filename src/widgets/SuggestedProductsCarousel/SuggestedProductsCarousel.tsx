import React, { useEffect, useState } from 'react';
import { ProductsCarousel } from '../../entities/ProductsCarousel';
import { ProductCard } from '../../entities/ProductCard/ProductCard';
import { ProductsService } from '../../services/ProductsService';
import { IProduct } from '../../entities/ProductCard/product.interface';

export const SuggestedProductsCarousel: React.FC = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    ProductsService.getSuggestedProducts()
      .then(setSuggestedProducts);
  }, []);

  return (
    <ProductsCarousel title="You may also like">
      {suggestedProducts.map((prod) => (
        <ProductCard product={prod} key={prod.itemId} />
      ))}
    </ProductsCarousel>
  );
};
