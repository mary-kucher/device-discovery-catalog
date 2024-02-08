import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { ProductsService } from '../../services/ProductsService';
import { PageLayout } from '../../shared/PageLayout';
import styles from '../Accessories/Accessories.module.scss';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { NoResults } from '../../widgets/NoResults';
import { Loader } from '../../shared/Loader';
import { List } from '../../entities/List';
import { ProductCard } from '../../entities/ProductCard/ProductCard';
import { IProduct } from '../../entities/ProductCard/product.interface';

export const FavouritesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { favourites } = useAppSelector(state => state.favourites);
  const { searchedValue, searchedProducts }
    = useAppSelector(state => state.search);

  useEffect(() => {
    setIsLoading(true);
    ProductsService
      .getFavouritesProducts(favourites)
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [favourites]);

  const productsForView = useMemo(() => {
    return searchedValue ? searchedProducts : products;
  }, [products, searchedProducts]);

  return (
    <PageLayout>
      {searchedValue ? (<span className={styles.span}>{`${searchedProducts.length} results`}</span>)
        : (
          <>
            <Breadcrumbs />
            <div className={styles.pageDetails}>
              <h1>Favourites</h1>
              {
                favourites.length ? <span className={styles.span}>{`${favourites.length} items`}</span>
                  : <NoResults name="Favourites" />
              }
            </div>
          </>
        )}
      {isLoading && <Loader />}
      <List>
        {productsForView.map((prod) => (
          <ProductCard product={prod} key={prod.id} />
        ))}
      </List>
    </PageLayout>
  );
};
