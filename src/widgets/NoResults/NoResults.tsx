import React from 'react';
import styles from './NoResults.module.scss';

type Props = {
  name: string,
};

export const NoResults: React.FC<Props> = ({ name }) => {
  return (
    <div className={styles.container}>
      Ooo-oops!
      <br />
      {name === 'cart'
        ? 'Cart is empty :('
        : `${name} not found :(`}
    </div>
  );
};
