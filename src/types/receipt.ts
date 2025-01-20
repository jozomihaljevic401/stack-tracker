export interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: ItemCategory;
  subtotal: number;
}

export type ItemCategory =
  | 'Groceries'
  | 'Electronics'
  | 'Clothing'
  | 'Healthcare'
  | 'Food & Dining'
  | 'Household'
  | 'Uncategorized';

export interface Receipt {
  id: string;
  userId: string;
  storeName: string;
  transactionDate: string;
  totalAmount: number;
  items: ReceiptItem[];
  imageUrl: string;
  rawText?: string;
  createdAt: string;
  updatedAt: string;
  status: 'processing' | 'completed' | 'error';
  errorMessage?: string;
}