export interface IProductCreate {
  title: string;
  price: number;
  description: string;
}

export interface IProductCreateError {
  title: string[];
  price: string[];
  description: string[];
}
