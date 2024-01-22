import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Logo } from '../../shared/Logo';
import { BackToTopButton } from './ui/BackToTopButton';

export const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Logo className={styles.logo} />
        <div className={styles.itemsWrapper}>
          <Link
            className={styles.linkItem}
            to="https://github.com/fe-fe0-OMteam/react_phone-catalog"
          >
            Github
          </Link>
          <Link className={styles.linkItem} to="/">
            Contacts
          </Link>
          <Link className={styles.linkItem} to="/">
            Rights
          </Link>
        </div>
        <BackToTopButton />
      </div>
    </div>
  );
};
