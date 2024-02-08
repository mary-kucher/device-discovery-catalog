import { useMemo } from 'react';
import { Icon } from '../../shared/Icon';
import styles from './Cart.module.scss';
import { useAppSelector } from '../../app/hooks/useAppSelector';

export const Cart = () => {
  const { entries } = useAppSelector(state => state.cart);

  const totalQuantity = useMemo(() => {
    return entries.reduce((acc, item) => acc + item.quantity, 0);
  }, [entries]);

  return (
    <Icon className={styles.icon} id="cart" count={totalQuantity} />
  );
};
