import { storage } from '../config/firebase';
import { API_CONFIG } from '../config/api';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Receipt, ReceiptItem } from '../types/receipt';

export async function uploadReceiptImage(file: File, userId: string): Promise<string> {
  const storageRef = ref(storage, `receipts/${userId}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function extractTextFromImage(imageUrl: string): Promise<string> {
  const response = await fetch(API_CONFIG.googleCloud.visionApiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_CONFIG.googleCloud.visionApiKey}`,
    },
    body: JSON.stringify({
      requests: [
        {
          image: {
            source: {
              imageUri: imageUrl,
            },
          },
          features: [
            {
              type: 'TEXT_DETECTION',
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  return data.responses[0]?.fullTextAnnotation?.text || '';
}

export async function parseReceiptText(text: string): Promise<Partial<Receipt>> {
  const response = await fetch(API_CONFIG.gemini.apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_CONFIG.gemini.apiKey}`,
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Parse the following receipt text and return a JSON object with storeName, transactionDate, totalAmount, and items array with name, price, quantity, and category for each item. Text: ${text}`,
        }],
      }],
    }),
  });

  const data = await response.json();
  const parsedData = JSON.parse(data.candidates[0].content.parts[0].text);
  
  return {
    storeName: parsedData.storeName,
    transactionDate: parsedData.transactionDate,
    totalAmount: parsedData.totalAmount,
    items: parsedData.items,
  };
}