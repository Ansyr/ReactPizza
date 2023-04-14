export type Pizza = {
  id: string;
  title: string;
  type: number;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};
