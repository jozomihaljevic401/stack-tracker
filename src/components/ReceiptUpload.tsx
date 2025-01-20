import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  uploadReceiptImage,
  extractTextFromImage,
  parseReceiptText,
} from '../services/receiptProcessing';
import { createReceipt } from '../services/receiptStorage';

export default function ReceiptUpload({ onUploadComplete }: { onUploadComplete: () => void }) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) return;

    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);

      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Upload image
      const imageUrl = await uploadReceiptImage(file, user.id);

      // Extract text using OCR
      const extractedText = await extractTextFromImage(imageUrl);

      // Parse text using Gemini
      const parsedData = await parseReceiptText(extractedText);

      // Create receipt in Firestore
      await createReceipt({
        userId: user.id,
        imageUrl,
        rawText: extractedText,
        status: 'completed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...parsedData,
      } as any);

      onUploadComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process receipt');
    } finally {
      setIsProcessing(false);
    }
  }, [user, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxSize: 5242880, // 5MB
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop a receipt image, or click to select
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supports JPEG, JPG, PNG up to 5MB
        </p>
      </div>

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Receipt preview"
            className="max-h-64 mx-auto rounded-lg"
          />
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Processing receipt...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}