import React, { SetStateAction, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import { SecondaryButton } from '../../shared/Buttons/SecondaryButton';
import { Icon } from '../../shared/Icon';
import { usePagination, DOTS } from './UsePagination';

type Props = {
  lastPage: number,
  currentPage: number,
  setCurrentPage: (value: SetStateAction<number>) => void,
  pageSize: number,
  totalCount: number
};

export const Pagination: React.FC<Props> = ({
  lastPage,
  setCurrentPage,
  currentPage,
  pageSize,
  totalCount,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = usePagination(totalCount, +pageSize, 1, currentPage);
  const pageParam = searchParams.get('page');
  const triggerChangePage = (page: number) => {
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    let newCurrentPage;

    if (!pageParam || +pageParam > lastPage) {
      newCurrentPage = 1;
    } else {
      newCurrentPage = +pageParam;
    }

    setCurrentPage(newCurrentPage);
  }, [pageParam]);
  const handleChangePage = (next: boolean) => {
    return next
      ? triggerChangePage(currentPage + 1)
      : triggerChangePage(currentPage - 1);
  };

  return (
    <div className={styles.btnsWrapper} data-cy="pagination">
      <SecondaryButton
        onClick={() => handleChangePage(false)}
        disabled={currentPage === pages[0]}
        className={styles.paginationBtn}
        data-cy="paginationLeft"
      >
        <Icon className={styles.icon} id="arrow-left" />
      </SecondaryButton>
      {
        pages.map((page) => (
          <SecondaryButton
            key={page}
            isSelected={currentPage === page}
            onClick={page !== DOTS ? () => triggerChangePage(+page) : undefined}
            className={styles.paginationBtn}
          >
            {page}
          </SecondaryButton>
        ))
      }
      <SecondaryButton
        onClick={() => handleChangePage(true)}
        disabled={currentPage === pages[pages.length - 1]}
        className={styles.paginationBtn}
        data-cy="paginationRight"
      >
        <Icon className={styles.icon} id="arrow-right" />
      </SecondaryButton>
    </div>
  );
};
