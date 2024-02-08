import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { PageLayout } from '../../shared/PageLayout';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import styles from './ProductDetailsPage.module.scss';
import { ProductsService } from '../../services/ProductsService';
import { IProductDetails } from './IProductDetalis';
import { BackButton } from '../../shared/BackButton';
import { ProdDetailsGallery } from '../../entities/ProdDetailsGallery';
import { Selector } from '../../shared/Selector';
import { Price } from './ui/Price';
import { AddCartButton } from '../../entities/AddCartButton';
import { AddFavouritesButton } from '../../entities/AddFavouritesButton';
import { Attribute } from './ui/Attribute';
// eslint-disable-next-line max-len
import { SuggestedProductsCarousel } from '../../widgets/SuggestedProductsCarousel';
import { Loader } from '../../shared/Loader';

export const ProductDetailsPage: React.FC = () => {
  const [currentProduct, setCurrentProduct]
    = useState<IProductDetails>({} as IProductDetails);
  const [isLoading, setIsLoading] = useState(false);
  const { phoneId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    id,
    name,
    priceRegular,
    colorsAvailable,
    capacityAvailable,
    images,
    priceDiscount,
    capacity,
    color,
    screen,
    resolution,
    processor,
    ram,
    description = [],
    camera,
    zoom,
    cell,
  } = currentProduct;

  useEffect(() => {
    setIsLoading(true);
    ProductsService
      .getProductDetails(phoneId)
      .then(setCurrentProduct)
      .finally(() => setIsLoading(false));

    window.scrollTo(0, 0);
  }, [phoneId]);

  const handleChangeProduct = (currentOption: string, newOption: string) => {
    if (phoneId) {
      const newId = phoneId
        .replace(currentOption.toLowerCase(), newOption.toLowerCase());

      navigate(pathname.replace(phoneId, newId));
      window.location.reload();
    }
  };

  const attributes = useMemo(() => {
    return {
      Screen: screen,
      Resolution: resolution,
      Processor: processor,
      RAM: ram,
    };
  }, [screen, resolution, processor, ram]);

  let cellString = '';
  const extendedAttributes = useMemo(() => {
    if (cell) {
      cellString = cell.join(', ');
    }

    return {
      Screen: screen,
      Resolution: resolution,
      Processor: processor,
      RAM: ram,
      Camera: camera,
      Zoom: zoom,
      Cell: cellString,
    };
  }, [screen, resolution, processor, ram, camera, zoom]);

  return (
    <PageLayout>
      <Breadcrumbs name={name} />
      <div className={styles.pageHeader}>
        <BackButton />
        <h1>{name}</h1>
      </div>
      {isLoading && <Loader />}
      <div className={styles.productMainBlock}>
        <ProdDetailsGallery images={images} />
        <div className={styles.rightSideWrapper}>
          <div className={styles.shortProductInformation}>
            <div className={styles.selectorsWrapper}>
              <Selector
                label="Available colors"
                optionsData={colorsAvailable}
                current={color}
                onChange={(newColor) => handleChangeProduct(color, newColor)}
              />
              <span className={styles.line} />
              <Selector
                label="Select capacity"
                optionsData={capacityAvailable}
                current={capacity}
                onChange={(newCapacity) => handleChangeProduct(capacity,
                  newCapacity)}
              />
              <span className={styles.line} />
            </div>
            <Price price={priceDiscount} fullPrice={priceRegular} />
            <div className={styles.buttonsWrapper}>
              <AddCartButton productId={id} />
              <AddFavouritesButton productId={id} />
            </div>
            <div className={styles.attributesWrapper}>
              {Object.entries(attributes).map(([key, value]) => (
                <Attribute key={key} name={key} value={value} />
              ))}
            </div>
          </div>
          <span className={styles.id}>{`ID: ${priceRegular * 89}MD`}</span>
        </div>
      </div>
      <div className={styles.productDescription}>
        <div className={styles.aboutBlock} data-cy="productDescription">
          <h2>About</h2>
          <span className={styles.line} />
          {
            description.map(({ title, text }) => (
              <article key={title} className={styles.article}>
                <h3>{title}</h3>
                <div className={styles.textDescription}>{text}</div>
              </article>
            ))
          }
        </div>
        <div className={styles.techSpecsBlock}>
          <h2>Tech specs</h2>
          <span className={styles.line} />
          <div className={styles.extAttributesWrapper}>
            {Object.entries(extendedAttributes).map(([key, value]) => (
              <Attribute key={key} name={key} value={value} ext />
            ))}
          </div>
        </div>
      </div>
      <SuggestedProductsCarousel />
    </PageLayout>
  );
};
