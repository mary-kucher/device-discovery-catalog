import { Route, Routes } from 'react-router-dom';
import { Default } from './Default';
import { Phones } from './Phones';
import { ProductDetailsPage } from './ProductDetailsPage';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />} />
      <Route path="phones">
        <Route index element={<Phones />} />
        <Route path=":phoneId" element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  );
};
