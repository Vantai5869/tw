export interface CategoryState {
  loading?: boolean;
  categories: CategoryType[];
}
export type CategoryType = {
  id?: string;
  parentId?: string;
  name?: string;
  level?: number;
  tree?: string;
  hasChild?: boolean;
  avatar?: string;
};

export interface CategoryReq {
  skip?: string;
  take?: string;
  searchKey?: string;
}

export interface CategoryRes {
  items: CategoryType[];
}
