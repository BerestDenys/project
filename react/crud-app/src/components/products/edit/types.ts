export interface IProductEdit {
  id: number;
  title: string;
  description: string;
  price: number;
}

export interface IProductEditError {
  title: string;
  description: string;
  price: number;
}
