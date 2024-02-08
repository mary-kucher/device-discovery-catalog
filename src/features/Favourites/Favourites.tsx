import { Icon } from '../../shared/Icon';
import styles from './Favourites.module.scss';
import { useAppSelector } from '../../app/hooks/useAppSelector';

export const Favourites = () => {
  const { favourites } = useAppSelector(state => state.favourites);

  return (
    <Icon className={styles.icon} id="heart" count={favourites.length} />
  );
};
