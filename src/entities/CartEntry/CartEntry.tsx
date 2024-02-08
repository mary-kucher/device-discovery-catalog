import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ICartEntry } from './cartEntry.interface';
import styles from './CartEntry.module.scss';
import { Icon } from '../../shared/Icon';
import { Price } from './ui/Price';
import { SecondaryButton } from '../../shared/Buttons/SecondaryButton';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';
import { decrementQuantity, incrementQuantity, removeProduct }
  from '../../features/Cart/reducers/cartSlice';

type Props = {
  product: ICartEntry,
};

export const CartEntry: React.FC<Props> = ({
  product: {
    category,
    itemId,
    name,
    price,
    fullPrice,
    image,
    quantity,
  },
}) => {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemoveEntry = () => {
    setIsDeleting(true);
    const timer = setTimeout(() => {
      dispatch(removeProduct(itemId));
      setIsDeleting(false);
    }, 800);

    return () => clearTimeout(timer);
  };

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity(itemId));
  };

  return (
    // eslint-disable-next-line max-len
    <div className={classNames(styles.wrapper, { [styles.deleting]: isDeleting })}>
      <div className={styles.leftSideWrapper}>
        <button
          type="button"
          className={styles.buttonClose}
          onClick={handleRemoveEntry}
        >
          <Icon className={styles.icon} id="close" />
        </button>
        <Link className={styles.productWrapper} reloadDocument to={`/${category}/${itemId}`}>
          <div className={styles.image}>
            <img src={`new/${image}`} alt={name} />
          </div>
          <h3 className={styles.title}>{name}</h3>
        </Link>
      </div>

      <div className={styles.rightSideWrapper}>
        <div className={styles.counter}>
          <SecondaryButton
            onClick={handleDecrementQuantity}
            disabled={quantity === 1}
            className={styles.paginationBtn}
          >
            <Icon className={styles.icon} id="minus" />
          </SecondaryButton>
          <span className={styles.quantity}>{quantity}</span>
          <SecondaryButton
            onClick={handleIncrementQuantity}
            disabled={quantity === 5}
            className={styles.paginationBtn}
          >
            <Icon className={styles.icon} id="plus" />
          </SecondaryButton>
        </div>
        <div className={styles.price}>
          <Price price={price} fullPrice={fullPrice} quantity={quantity} />
        </div>
      </div>
    </div>
  );
};
