import React from 'react';
import classNames from 'classnames';
import styles from './Price.module.scss';

type Props = {
  price: number | null,
  fullPrice: number,
  quantity: number,
};

export const Price: React.FC<Props> = ({ price, fullPrice, quantity }) => {
  return (
    <div className={styles.wrapper}>
      {price && (<span className={styles.price}>{`$${price * quantity}`}</span>)}
      <span
        className={classNames(styles.price, {
          [styles.discount]: price,
        })}
      >
        {`$${fullPrice * quantity}`}
      </span>
    </div>
  );
};
