import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from './product.interface';
import { Price } from './ui/Price';
import { Attribute } from './ui/Attribute';
import { AddCartButton } from '../AddCartButton';
import { AddFavouritesButton } from '../AddFavouritesButton';
import styles from './ProductCard.module.scss';

type Props = {
  product: IProduct,
};

export const ProductCard: React.FC<Props> = ({
  product: {
    itemId,
    category,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
  },
}) => {
  const attributes = useMemo(() => {
    return {
      Screen: screen,
      Capacity: capacity,
      RAM: ram,
    };
  }, [screen, capacity, ram]);

  return (
    <div className={styles.wrapper} data-cy="cardsContainer">
      <Link reloadDocument to={`/${category}/${itemId}`}>
        <div className={styles.image}>
          <img src={`/_new/${image}`} alt={name} />
        </div>
        <h3 className={styles.title}>{name}</h3>
      </Link>
      <Price
        price={price}
        fullPrice={fullPrice}
      />
      <div className={styles.attributes}>
        {Object.entries(attributes).map(([key, value]) => (
          <Attribute key={key} name={key} value={value} />
        ))}
      </div>
      <div className={styles.actions}>
        <AddCartButton />
        <AddFavouritesButton />
      </div>
    </div>
  );
};
