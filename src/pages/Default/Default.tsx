import { HeroSlider } from '../../widgets/HeroSlider/HeroSlider';
import { PageLayout } from '../../shared/PageLayout';
import { Categories } from '../../widgets/Categories';
import { HotPricesCarousel }
  from '../../widgets/HotPricesCarousel/HotPricesCarousel';
import { BrandNewCarousel }
  from '../../widgets/BrandNewCarousel/BrandNewCarousel';

export const Default = () => {
  return (
    <PageLayout>
      <HeroSlider />
      <HotPricesCarousel />
      <Categories />
      <BrandNewCarousel />
    </PageLayout>
  );
};
