import React, { useState } from 'react';
import { Upload, Search, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface ReceiptListItem {
  id: string;
  merchantName: string;
  date: string;
  total: number;
  category: string;
  imageUrl: string;
}

const mockReceipts: ReceiptListItem[] = [
  {
    id: '1',
    merchantName: 'Walmart',
    date: '2024-03-15',
    total: 156.78,
    category: 'Groceries',
    imageUrl: 'https://images.unsplash.com/photo-1554774853-719586f82d77?w=300&h=400&fit=crop'
  },
  {
    id: '2',
    merchantName: 'Target',
    date: '2024-03-14',
    total: 89.99,
    category: 'Shopping',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=400&fit=crop'
  },
  {
    id: '3',
    merchantName: 'Amazon',
    date: '2024-03-13',
    total: 245.32,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=300&h=400&fit=crop'
  }
];

export default function Receipts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptListItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredReceipts = mockReceipts.filter(receipt =>
    receipt.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Receipts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your receipts
          </p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Receipt
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search receipts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Receipts list */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredReceipts.map((receipt) => (
            <li key={receipt.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-20 w-20">
                      <img
                        className="h-20 w-20 rounded-md object-cover"
                        src={receipt.imageUrl}
                        alt={receipt.merchantName}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-indigo-600 truncate">
                        {receipt.merchantName}
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-gray-600">
                          {format(new Date(receipt.date), 'MMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-900 font-medium">
                          ${receipt.total.toFixed(2)}
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {receipt.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0 flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedReceipt(receipt);
                      setIsViewModalOpen(true);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedReceipt(receipt);
                      // Open edit modal (to be implemented)
                    }}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      // Handle delete (to be implemented)
                    }}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Upload Receipt
                  </h3>
                  <div className="mt-4">
                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => {
                                // Handle file upload (to be implemented)
                                console.log('File selected:', e.target.files?.[0]);
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // Handle upload (to be implemented)
                    setIsUploadModalOpen(false);
                  }}
                >
                  Upload
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Receipt Modal */}
      {isViewModalOpen && selectedReceipt && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Receipt Details
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <img
                        src={selectedReceipt.imageUrl}
                        alt={selectedReceipt.merchantName}
                        className="w-full rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Merchant</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedReceipt.merchantName}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Date</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {format(new Date(selectedReceipt.date), 'MMMM d, yyyy')}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Total</h4>
                        <p className="mt-1 text-sm text-gray-900">${selectedReceipt.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Category</h4>
                        <p className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {selectedReceipt.category}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}