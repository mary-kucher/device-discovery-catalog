import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './AddFavouritesButton.module.scss';
import { SecondaryButton } from '../../shared/Buttons/SecondaryButton';
import { Icon } from '../../shared/Icon';

type Props = {
};

export const AddFavouritesButton: React.FC<Props> = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <SecondaryButton onClick={() => setIsSelected(prevState => !prevState)}>
      <Icon
        className={classNames(styles.icon, {
          [styles.selected]: isSelected,
        })}
        id={isSelected ? 'heart-fill' : 'heart'}
      />
    </SecondaryButton>
  );
};
