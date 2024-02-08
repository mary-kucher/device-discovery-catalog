import React, { useEffect } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { ProductList } from '../../widgets/ProductList';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import styles from './Tablets.module.scss';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { NoResults } from '../../widgets/NoResults';
import { ProductsService } from '../../services/ProductsService';
import { setCategories } from '../../entities/Category/reducers/categorySlice';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';

export const Tablets: React.FC = () => {
  const { categories } = useAppSelector(state => state.category);
  const { total, name } = categories.filter(c => c.name === 'tablets')[0];
  const { searchedValue, searchedProducts }
    = useAppSelector(state => state.search);
  const capitalizedName = name[0].toUpperCase() + name.slice(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ProductsService.getCategories()
      .then(c => dispatch(setCategories(c)));
  }, []);

  return (
    <PageLayout>
      {searchedValue ? (<span className={styles.span}>{`${searchedProducts.length} results`}</span>)
        : (
          <>
            <Breadcrumbs />
            <div className={styles.pageDetails}>
              <h1>{capitalizedName}</h1>
              {
                total ? <span className={styles.span}>{`${total} models`}</span>
                  : <NoResults name={capitalizedName} />
              }
            </div>
          </>
        )}
      {!!total && <ProductList category={name} />}
    </PageLayout>
  );
};
