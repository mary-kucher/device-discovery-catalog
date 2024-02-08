import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { ProductsService } from '../../services/ProductsService';
import { PageLayout } from '../../shared/PageLayout';
import { BackButton } from '../../shared/BackButton';
import { Loader } from '../../shared/Loader';
import { CartEntry } from '../../entities/CartEntry/CartEntry';
import { List } from '../../entities/List';
import styles from './CartPage.module.scss';
import { NoResults } from '../../widgets/NoResults';
import { ICartEntry } from '../../entities/CartEntry/cartEntry.interface';
import { PrimaryButton } from '../../shared/Buttons/PrimaryButton';

export const CartPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ICartEntry[]>([]);
  const { entries } = useAppSelector(state => state.cart);
  const values = Object.values(entries);
  const totalQuantity = values.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setIsLoading(true);
    ProductsService
      .getProductsFromCart(entries)
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [entries]);

  const totalPrice = useMemo(() => products
    .reduce((acc: number, item) => acc
      + ((item.price || item.fullPrice) * item.quantity), 0), [products]);

  return (
    <PageLayout>
      <div className={styles.pageHeader}>
        <BackButton />
        <h1>Cart</h1>
      </div>
      {entries.length < 1 && <NoResults name="cart" />}
      {isLoading && <Loader />}
      <div className={styles.cartWrapper}>
        <List cartList>
          {products.map((prod) => (
            <CartEntry product={prod} key={prod.itemId} />
          ))}
        </List>
        {entries.length > 0
          && (
            <div className={styles.totalPriceBlock}>
              <div className={styles.totalPrice}>{`$${totalPrice}`}</div>
              <span className={styles.text}>{`Total for ${totalQuantity} items`}</span>
              <span className={styles.line} />
              <PrimaryButton>
                Checkout
              </PrimaryButton>
            </div>
          )}
      </div>
    </PageLayout>
  );
};
