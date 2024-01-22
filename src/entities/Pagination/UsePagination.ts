import { useMemo } from 'react';

export const DOTS = '...';

export const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = (
  totalCount: number,
  pageSize: number,
  siblingCount = 1,
  currentPage: number,
) => {
  return useMemo(() => {
    const totalPgCount = Math.round(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 4;

    if (totalPageNumbers >= totalPgCount) {
      return range(1, totalPgCount);
    }

    const leftSiblingIdx = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIdx = Math.min(currentPage + siblingCount, totalPgCount);
    const shouldShowLeftDots = leftSiblingIdx > 2;
    const shouldShowRightDots = rightSiblingIdx < totalPgCount - 2;
    const firstPageIdx = 1;
    const totalPageCountIdx = totalPgCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPgCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPgCount - rightItemCount + 1, totalPgCount);

      return [firstPageIdx, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIdx, rightSiblingIdx);

      return [firstPageIdx, DOTS, ...middleRange, DOTS, totalPageCountIdx];
    }

    return [];
  }, [siblingCount, currentPage, totalCount, pageSize]);
};
