import React from 'react';
import styles from './Attribute.module.scss';

type Props = {
  name: string,
  value: string,
};

export const Attribute: React.FC<Props> = ({ name, value }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>{`${name}:`}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};
