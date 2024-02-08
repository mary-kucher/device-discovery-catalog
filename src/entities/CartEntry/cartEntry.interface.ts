export interface ICartEntry {
  category: string,
  itemId: string,
  name: string,
  fullPrice: number,
  price: number | null,
  image: string,
  quantity: number,
}
