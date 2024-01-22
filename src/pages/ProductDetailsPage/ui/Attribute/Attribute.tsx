import React from 'react';
import classNames from 'classnames';
import styles from './Attribute.module.scss';

type Props = {
  name: string,
  value: string,
  ext?: boolean,
};

export const Attribute: React.FC<Props> = ({ name, value, ext }) => {
  return (
    <div className={classNames(styles.wrapper, { [styles.extended]: ext })}>
      <span className={styles.name}>{`${name}:`}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

Attribute.defaultProps = {
  ext: false,
};
