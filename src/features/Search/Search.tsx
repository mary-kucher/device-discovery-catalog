import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { SearchInput } from '../../shared/SearchInput';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';
import styles from './Search.module.scss';
import { ProductsService } from '../../services/ProductsService';
import {
  clearSearchedProducts, setSearchedProducts, setSearchedValue,
} from './reducers/searchSlice';
import { Icon } from '../../shared/Icon';
import { EAvailableAreas } from './EAvailableAreas';

export const Search: React.FC = () => {
  const { pathname } = useLocation();
  const area = pathname.slice(1);
  const { searchedValue } = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();
  const isAvailableArea = Object.values(EAvailableAreas)
    .map(v => v.toString()).includes(area);
  const [searchParams, setSearchParams] = useSearchParams();
  const { favourites } = useAppSelector(state => state.favourites);
  const query = searchParams.get('query') || '';
  const setInputValue = (value: string) => {
    searchParams.set('query', `${value}`);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchedValue(query));
    }, 500);

    if (!query.length) {
      searchParams.delete('query');
      setSearchParams(searchParams);
    }

    return () => clearTimeout(timeoutId);
  }, [query, 500]);

  useEffect(() => {
    ProductsService.getSearchedProducts(area, searchedValue, favourites)
      .then(p => dispatch(setSearchedProducts(p)));
  }, [searchedValue]);

  const handleClearSearch = () => {
    dispatch(clearSearchedProducts());
    setInputValue('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  return (
    <div className={classNames(styles.searchWrapper,
      { [styles.disable]: !isAvailableArea })}
    >
      <SearchInput
        areaName={area}
        inputValue={query}
        setInputValue={setInputValue}
      />
      <button onClick={handleClearSearch} type="button">
        <Icon className={styles.icon} id={searchedValue ? 'close' : 'search'} />
      </button>
    </div>
  );
};
