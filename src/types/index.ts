export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
}

export interface Receipt {
  id: string;
  userId: string;
  merchantName: string;
  date: string;
  total: number;
  items: ReceiptItem[];
  imageUrl: string;
  category: string;
  tags: string[];
  createdAt: string;
}

export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}