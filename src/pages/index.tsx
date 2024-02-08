import { Route, Routes } from 'react-router-dom';
import { Default } from './Default';
import { Phones } from './Phones';
import { ProductDetailsPage } from './ProductDetailsPage';
import { Tablets } from './Tablets';
import { Accessories } from './Accessories';
import { FavouritesPage } from './FavouritesPage';
import { CartPage } from './CartPage';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />} />
      <Route path="phones">
        <Route index element={<Phones />} />
        <Route path=":phoneId" element={<ProductDetailsPage />} />
      </Route>
      <Route path="tablets" element={<Tablets />} />
      <Route path="accessories" element={<Accessories />} />
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />
    </Routes>
  );
};
