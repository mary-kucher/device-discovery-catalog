import React from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { ProductList } from '../../widgets/ProductList';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import styles from './Phones.module.scss';
import { Breadcrumbs } from '../../shared/Breadcrumbs';

export const Phones: React.FC = () => {
  const { categories } = useAppSelector(state => state.category);
  const { total, name } = categories.filter(c => c.name === 'phones')[0];
  const { searchedValue, searchedProducts }
    = useAppSelector(state => state.search);

  return (
    <PageLayout>
      {searchedValue ? (<span className={styles.span}>{`${searchedProducts.length} results`}</span>)
        : (
          <>
            <Breadcrumbs />
            <div className={styles.pageDetails}>
              <h1>Mobile phones</h1>
              <span className={styles.span}>{`${total} models`}</span>
            </div>
          </>
        )}
      <ProductList category={name} />
    </PageLayout>
  );
};
