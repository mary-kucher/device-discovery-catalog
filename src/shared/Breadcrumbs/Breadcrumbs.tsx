import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './Breadcrumbs.module.scss';

type Props = {
  name?: string,
};

export const Breadcrumbs:React.FC<Props> = ({ name }) => {
  const location = useLocation();
  let currentLink = '';
  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, i) => {
      currentLink += `/${crumb}`;
      const crumbsName = i === 0 ? crumb[0].toUpperCase() + crumb
        .replaceAll('-', ' ').slice(1) : name;

      return (
        <div className={styles.crumb} key={crumb} data-cy="breadCrumbs">
          <Icon className={styles.iconArrow} id="arrow-right" />
          <Link to={currentLink}>{crumbsName}</Link>
        </div>
      );
    });

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.iconWrapper}>
        <Icon className={styles.icon} id="home" />
      </Link>
      {crumbs}
    </div>
  );
};

Breadcrumbs.defaultProps = {
  name: '',
};
