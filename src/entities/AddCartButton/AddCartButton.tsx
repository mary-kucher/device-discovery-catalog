import React, { useMemo } from 'react';
import { PrimaryButton } from '../../shared/Buttons/PrimaryButton';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';
import { addProduct } from '../../features/Cart/reducers/cartSlice';
import { useAppSelector } from '../../app/hooks/useAppSelector';

type Props = {
  productId: string;
};

export const AddCartButton: React.FC<Props> = ({ productId }) => {
  const { entries } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const isSelected = useMemo(() => {
    return entries.some(entry => entry.id === productId);
  }, [entries]);

  const handleAddToCart = () => {
    dispatch(addProduct(productId));
  };

  return (
    <PrimaryButton
      isSelected={isSelected}
      onClick={handleAddToCart}
    >
      {isSelected ? 'Added to cart' : 'Add to cart'}
    </PrimaryButton>
  );
};
