import React from 'react';
import classNames from 'classnames';
import styles from './Price.module.scss';

type Props = {
  price: number | null,
  fullPrice: number,
};

export const Price: React.FC<Props> = ({ price, fullPrice }) => {
  return (
    <div className={styles.wrapper}>
      {price && (<span className={styles.price}>{`$${price}`}</span>)}
      <span
        className={classNames(styles.price, {
          [styles.discount]: price,
        })}
      >
        {`$${fullPrice}`}
      </span>
    </div>
  );
};
