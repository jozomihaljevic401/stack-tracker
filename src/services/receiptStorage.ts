import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Receipt } from '../types/receipt';

export async function createReceipt(receipt: Omit<Receipt, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'receipts'), receipt);
  return docRef.id;
}

export async function updateReceipt(id: string, updates: Partial<Receipt>): Promise<void> {
  const docRef = doc(db, 'receipts', id);
  await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
}

export async function deleteReceipt(id: string): Promise<void> {
  await deleteDoc(doc(db, 'receipts', id));
}

export async function getReceipt(id: string): Promise<Receipt | null> {
  const docRef = doc(db, 'receipts', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Receipt : null;
}

export async function getUserReceipts(
  userId: string,
  filters?: {
    startDate?: Date;
    endDate?: Date;
    category?: string;
    searchTerm?: string;
  }
): Promise<Receipt[]> {
  let q = query(
    collection(db, 'receipts'),
    where('userId', '==', userId),
    orderBy('transactionDate', 'desc')
  );

  if (filters?.startDate && filters?.endDate) {
    q = query(q, 
      where('transactionDate', '>=', filters.startDate.toISOString()),
      where('transactionDate', '<=', filters.endDate.toISOString())
    );
  }

  const querySnapshot = await getDocs(q);
  const receipts = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Receipt[];

  if (filters?.category) {
    return receipts.filter(receipt =>
      receipt.items.some(item => item.category === filters.category)
    );
  }

  if (filters?.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    return receipts.filter(receipt =>
      receipt.storeName.toLowerCase().includes(term) ||
      receipt.items.some(item => item.name.toLowerCase().includes(term))
    );
  }

  return receipts;
}