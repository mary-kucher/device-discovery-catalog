import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './AddFavouritesButton.module.scss';
import { SecondaryButton } from '../../shared/Buttons/SecondaryButton';
import { Icon } from '../../shared/Icon';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';
// eslint-disable-next-line max-len
import { addFavourite, removeFavourite } from '../../features/Favourites/reducers/favouritesSlice';

type Props = {
  productId: string;
};

export const AddFavouritesButton: React.FC<Props> = ({ productId }) => {
  const { favourites } = useAppSelector(state => state.favourites);
  const dispatch = useAppDispatch();
  const isSelected = useMemo(() => {
    return favourites.some(favourite => favourite.id === productId);
  }, [favourites, productId]);

  const handleAddToFavourites = () => {
    if (isSelected) {
      dispatch(removeFavourite(productId));
    } else {
      dispatch(addFavourite(productId));
    }
  };

  return (
    <SecondaryButton onClick={handleAddToFavourites}>
      <Icon
        className={classNames(styles.icon, {
          [styles.selected]: isSelected,
        })}
        id={isSelected ? 'heart-fill' : 'heart'}
      />
    </SecondaryButton>
  );
};
