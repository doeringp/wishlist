export interface WishlistItemResult {
  data: WishlistItem[];
  meta: Metadata;
}

export interface WishlistItem {
  id: number;
  attributes: WishlistItemAttributes;
}

export interface WishlistItemAttributes {
  name: string;
  done: boolean;
  shopUrl: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo: string | null;
}

export interface Metadata {
  pagination: PageInfo;
}

export interface PageInfo {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
