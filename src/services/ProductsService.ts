import { categories } from '../widgets/Categories/categories.data';
import { IProduct } from '../entities/ProductCard/product.interface';
import { ICategory } from '../entities/Category/category.interface';
import { $api } from '../app/api/api';
import { IProductDetails } from '../pages/ProductDetailsPage/IProductDetalis';
import { EAvailableAreas } from '../features/Search/EAvailableAreas';
import { IFavourite } from '../features/Favourites/favourite.interface';
import { IEntry } from '../features/Cart/entry.interface';
import { ICartEntry } from '../entities/CartEntry/cartEntry.interface';

export class ProductsService {
  static async getProducts(category = '') {
    const products = await $api<IProduct[]>('products.json');

    return category
      ? products.filter(product => product.category === category)
      : products;
  }

  static async getProductDetails(id = '') {
    const product = await $api<IProductDetails>(`products/${id}.json`);

    return product;
  }

  static async getCategories(): Promise<ICategory[]> {
    const products = await this.getProducts();

    return categories.map(category => {
      const total = products.filter(product => {
        return product.category === category.name;
      }).length;

      return { ...category, total };
    });
  }

  static async getProductsByHotPrices() {
    const products = await this.getProducts();

    return products.sort((a, b) => {
      if (!a.price || !b.price) {
        return 1;
      }

      return (b.fullPrice - b.price) - (a.fullPrice - a.price);
    });
  }

  static async getSuggestedProducts() {
    const products = await this.getProducts();
    const suggestedProducts = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      const randomIdx = Math.random() * products.length;

      suggestedProducts.push(products[Math.round(randomIdx)]);
    }

    return suggestedProducts;
  }

  static async getBrandNewProducts() {
    const products = await this.getProducts();

    return products.filter(product => !product.price)
      .sort((a, b) => {
        return b.fullPrice - a.fullPrice;
      });
  }

  // eslint-disable-next-line max-len
  static async getProductsByPage(category: string, sortBy: string, page: number, perPage: number) {
    const phones = await this.getProducts(category);
    const sorting = (arr: IProduct[], sort: string) => {
      return arr.sort((a, b) => {
        switch (sort) {
          case 'Cheapest': {
            const compareA = !a.price ? a.fullPrice : a.price;
            const compareB = !b.price ? b.fullPrice : b.price;

            return compareA - compareB;
          }

          case 'Newest': {
            return b.year - a.year;
          }

          case 'Alphabetically': {
            return a.name.localeCompare(b.name);
          }

          default: return 0;
        }
      });
    };

    const sorted = sorting(phones, sortBy);
    const countOfItems = page * perPage;
    const paginationIdxStart = countOfItems - perPage;
    const paginationIdxEnd = countOfItems >= sorted.length
      ? sorted.length : countOfItems;

    return sorted.slice(paginationIdxStart, paginationIdxEnd);
  }

  static async getSearchedProducts(
    area: string, value: string, arrId: IFavourite[] = [],
  ) {
    switch (area) {
      case EAvailableAreas.Accessories:
      case EAvailableAreas.Phones:
      case EAvailableAreas.Tablets: {
        const products = await this.getProducts(area);

        return value
          ? products.filter(product => product.name.toLowerCase()
            .includes(value.toLowerCase()))
          : [];
      }

      case EAvailableAreas.Favourites: {
        const products = await this.getFavouritesProducts(arrId);

        return value
          ? products.filter(product => product.name.toLowerCase()
            .includes(value.toLowerCase()))
          : [];
      }

      default:
        return [];
    }
  }

  static async getFavouritesProducts(idArr: IFavourite[]) {
    const products = await $api<IProduct[]>('products.json');

    return products.filter(product => idArr
      .some(iProd => product.itemId === iProd.id));
  }

  static async getProductsFromCart(entries: IEntry[]) :Promise<ICartEntry[]> {
    const products = await $api<IProduct[]>('products.json');

    return entries.map(entry => {
      const product = products.find(prod => prod.itemId === entry.id);

      if (!product) {
        throw new Error(`Product not found for entry with id ${entry.id}`);
      }

      return { ...entry, ...product };
    });
  }
}
