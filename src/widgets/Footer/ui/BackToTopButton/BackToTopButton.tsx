import React from 'react';
import { Icon } from '../../../../shared/Icon';
import styles from './BackToTopButton.module.scss';
import { SecondaryButton } from '../../../../shared/Buttons/SecondaryButton';

export const BackToTopButton: React.FC = () => {
  return (
    <div
      className={styles.buttonsWrapper}
    >
      Back to top
      <SecondaryButton onClick={() => window.scrollTo(0, 0)}>
        <Icon className={styles.icon} id="arrow-up" />
      </SecondaryButton>
    </div>
  );
};
