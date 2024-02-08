import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './List.module.scss';

type Props = {
  children: ReactNode,
  cartList?: boolean,
};

export const List: React.FC<Props> = ({ children, cartList }) => {
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapperCartList]: cartList,
      })}
    >
      {children}
    </div>
  );
};

List.defaultProps = { cartList: false };
