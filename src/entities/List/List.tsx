import React, { ReactNode } from 'react';
import styles from './List.module.scss';

type Props = {
  children: ReactNode,
};

export const List: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper} data-cy="productList">
      {children}
    </div>
  );
};
