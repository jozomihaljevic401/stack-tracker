import React, { useState } from 'react';
import { Save, Trash2 } from 'lucide-react';
import type { Receipt, ReceiptItem, ItemCategory } from '../types/receipt';
import { updateReceipt } from '../services/receiptStorage';

const CATEGORIES: ItemCategory[] = [
  'Groceries',
  'Electronics',
  'Clothing',
  'Healthcare',
  'Food & Dining',
  'Household',
  'Uncategorized',
];

interface Props {
  receipt: Receipt;
  onSave: () => void;
  onCancel: () => void;
}

export default function ReceiptEditor({ receipt, onSave, onCancel }: Props) {
  const [editedReceipt, setEditedReceipt] = useState<Receipt>(receipt);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemChange = (index: number, field: keyof ReceiptItem, value: any) => {
    const newItems = [...editedReceipt.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      subtotal: field === 'price' || field === 'quantity'
        ? Number(value) * (field === 'price' ? newItems[index].quantity : newItems[index].price)
        : newItems[index].subtotal,
    };

    setEditedReceipt({
      ...editedReceipt,
      items: newItems,
      totalAmount: newItems.reduce((sum, item) => sum + item.subtotal, 0),
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await updateReceipt(receipt.id, editedReceipt);
      onSave();
    } catch (error) {
      console.error('Failed to update receipt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Store Name</label>
          <input
            type="text"
            value={editedReceipt.storeName}
            onChange={(e) => setEditedReceipt({ ...editedReceipt, storeName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={editedReceipt.transactionDate.split('T')[0]}
            onChange={(e) => setEditedReceipt({ ...editedReceipt, transactionDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Items</h3>
        <div className="mt-4 space-y-4">
          {editedReceipt.items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Item name"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Qty"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Price"
                  step="0.01"
                />
              </div>
              <div className="col-span-3">
                <select
                  value={item.category}
                  onChange={(e) => handleItemChange(index, 'category', e.target.value as ItemCategory)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => {
                    const newItems = editedReceipt.items.filter((_, i) => i !== index);
                    setEditedReceipt({
                      ...editedReceipt,
                      items: newItems,
                      totalAmount: newItems.reduce((sum, item) => sum + item.subtotal, 0),
                    });
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t">
        <div className="text-lg font-medium">
          Total: ${editedReceipt.totalAmount.toFixed(2)}
        </div>
        <div className="space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}