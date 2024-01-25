import axios from "axios";

export const http_api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export interface IProductItemLookup {
  id: number;
  title: string;
  price: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ILinkUrl {
  url: string;
  label: string;
  active: boolean;
}

export interface IProductGetResult {
  current_page: number;
  data: IProductItemLookup[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ILinkUrl[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
