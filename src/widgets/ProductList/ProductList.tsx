import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductList.module.scss';
import { EPerPage } from './PerPage.enum';
import { ESortBy } from './SortBy.enum';
import { IProduct } from '../../entities/ProductCard/product.interface';
import { ProductsService } from '../../services/ProductsService';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { List } from '../../entities/List';
import { ProductCard } from '../../entities/ProductCard/ProductCard';
import { Dropdown } from '../../shared/Dropdown';
import { Pagination } from '../../entities/Pagination';
import { Loader } from '../../shared/Loader';

type Props = {
  category?: string,
};

export const ProductList: React.FC<Props> = ({ category = '' }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { categories } = useAppSelector(state => state.category);
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || EPerPage.Sixteen;
  const sortBy = searchParams.get('sortBy') || ESortBy.Newest;
  const { searchedProducts, searchedValue }
    = useAppSelector(state => state.search);
  const { total } = categories.filter(c => c.name === category)[0];

  useEffect(() => {
    setIsLoading(true);
    ProductsService
      .getProductsByPage(category, sortBy, currentPage,
        Number(perPage) || total)
      .then(setProducts)
      .finally(() => setIsLoading(false));

    window.scrollTo(0, 0);
  }, [perPage, sortBy, currentPage]);
  const lastPage = Math.round(total / (Number(perPage) || total));

  const setPerPage = (value: string) => {
    searchParams.delete('page');
    searchParams.set('perPage', `${value}`);
    setSearchParams(searchParams);
  };

  const setSortBy = (value: string) => {
    searchParams.delete('page');
    searchParams.set('sortBy', `${value}`);
    setSearchParams(searchParams);
  };

  const productsForView = useMemo(() => {
    return searchedValue ? searchedProducts : products;
  }, [products, searchedProducts]);

  return (
    <div className={styles.wrapper}>
      {!searchedValue && (
        <div className={styles.dropdowns}>
          <Dropdown label="Sort by" onChange={setSortBy} current={sortBy}>
            {(Object.values(ESortBy) as Array<string>)}
          </Dropdown>
          {/* eslint-disable-next-line max-len */}
          <Dropdown label="Items on page" onChange={setPerPage} current={perPage}>
            {(Object.values(EPerPage) as Array<string>)}
          </Dropdown>
        </div>
      )}
      {isLoading && <Loader />}
      <List>
        {productsForView.map((prod) => (
          <ProductCard product={prod} key={prod.id} />
        ))}
      </List>

      {!searchedValue && (
        <Pagination
          lastPage={lastPage}
          totalCount={total}
          pageSize={+perPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

ProductList.defaultProps = {
  category: '',
};
