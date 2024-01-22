import React, {
  Children,
  ReactNode,
  useRef,
  useState,
} from 'react';
import {
  Swiper as SwiperType,
  Navigation,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import styles from './ProductsCarousel.module.scss';
import { SecondaryButton } from '../../shared/Buttons/SecondaryButton';
import { Icon } from '../../shared/Icon';

type Props = {
  title: string,
  children: ReactNode,
};

interface IDisableBtn {
  start: boolean,
  end: boolean,
}

export const ProductsCarousel: React.FC<Props> = ({
  title,
  children,
}) => {
  const swiperRef = useRef<SwiperType>();
  const [disableBtn, setDisableBtn] = useState<IDisableBtn>({
    start: true, end: false,
  });

  const btnDisabling = () => {
    if (swiperRef.current && (swiperRef.current?.isBeginning
    !== disableBtn.start || swiperRef.current?.isEnd !== disableBtn.end)) {
      setDisableBtn({
        start: swiperRef.current?.isBeginning,
        end: swiperRef.current?.isEnd,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.upperBlock}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.btnsWrapper}>
          <SecondaryButton
            onClick={() => {
              swiperRef.current?.slidePrev();
              btnDisabling();
            }}
            disabled={disableBtn.start}
          >
            <Icon className={styles.icon} id="arrow-left" />
          </SecondaryButton>
          <SecondaryButton
            onClick={() => {
              swiperRef.current?.slideNext();
              btnDisabling();
            }}
            disabled={disableBtn.end}
          >
            <Icon className={styles.icon} id="arrow-right" />
          </SecondaryButton>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className={styles.slider}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          564: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          836: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1136: {
            spaceBetween: 16,
            slidesPerView: 4,
          },
        }}
      >
        {Children.toArray(children).map((child, i) => (
          <SwiperSlide
            key={+i}
            className={styles.slide}
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
