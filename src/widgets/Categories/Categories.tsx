import { useEffect } from 'react';
import { Category } from '../../entities/Category';
import { ProductsService } from '../../services/ProductsService';
import styles from './Categories.module.scss';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';
import { setCategories } from '../../entities/Category/reducers/categorySlice';

export const Categories = () => {
  const { categories } = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ProductsService.getCategories()
      .then(c => dispatch(setCategories(c)));
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.body} data-cy="categoryLinksContainer">
        {categories.map(category => (
          <Category key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};
