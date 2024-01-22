import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Swiper as SwiperType, Thumbs } from 'swiper';
import 'swiper/swiper.scss';
import styles from './ProdDetailsGallery.module.scss';

type Props = {
  images: string[],
};

export const ProdDetailsGallery: React.FC<Props> = ({ images = [] }) => {
  const thumbsSwiper = useRef<SwiperType | undefined>();

  return (
    <div className={styles.wrapper}>
      <Swiper
        onSwiper={(swiper) => {
          thumbsSwiper.current = swiper;
        }}
        modules={[Navigation, Thumbs]}
        spaceBetween={17}
        slidesPerView="auto"
        className={styles.swiperThumbs}
        direction="vertical"
        breakpoints={{
          320: {
            direction: 'horizontal',
            spaceBetween: '10px',
          },
          640: {
            direction: 'vertical',
          },
        }}
      >
        {images.map(img => (
          <SwiperSlide
            key={img}
            className={styles.wrapperSlideThumb}
          >
            <img src={`/_new/${img}`} alt="slide" className={styles.imgThumb} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Navigation, Thumbs]}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper.current }}
        className={styles.swiper}
        speed={0}
      >
        {images.map(img => (
          <SwiperSlide key={img} className={styles.wrapperSlide}>
            <img src={`/_new/${img}`} alt="slide" className={styles.imgSlide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
