import React, { useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { CalendarRange } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Spending',
      data: [1200, 1900, 1500, 2100, 1800, 2400],
      borderColor: 'rgb(79, 70, 229)',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

const categoryData = {
  labels: ['Groceries', 'Shopping', 'Entertainment', 'Bills', 'Travel'],
  datasets: [
    {
      data: [3000, 2500, 1500, 2000, 1000],
      backgroundColor: [
        'rgba(79, 70, 229, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(107, 114, 128, 0.8)',
      ],
    },
  ],
};

const merchantData = {
  labels: ['Walmart', 'Target', 'Amazon', 'Costco', 'Whole Foods'],
  datasets: [
    {
      label: 'Spending by Merchant',
      data: [2500, 2000, 1800, 1500, 1200],
      backgroundColor: 'rgba(79, 70, 229, 0.8)',
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
  },
};

export default function Analytics() {
  const [dateRange, setDateRange] = useState('6m');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Detailed analysis of your spending patterns
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarRange className="h-5 w-5 text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Spending Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Spending Trends</h2>
          <div className="h-[300px]">
            <Line options={chartOptions} data={monthlyData} />
          </div>
        </div>

        {/* Spending by Category */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Spending by Category</h2>
          <div className="h-[300px]">
            <Pie options={pieOptions} data={categoryData} />
          </div>
        </div>

        {/* Top Merchants */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top Merchants</h2>
          <div className="h-[300px]">
            <Bar options={chartOptions} data={merchantData} />
          </div>
        </div>

        {/* Spending Insights */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Spending Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">Positive Trends</h3>
              <ul className="mt-2 text-sm text-green-700 space-y-1">
                <li>• Grocery spending decreased by 15% this month</li>
                <li>• You're under budget in 5 categories</li>
                <li>• Entertainment expenses are well managed</li>
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-800">Areas to Watch</h3>
              <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                <li>• Shopping expenses trending upward</li>
                <li>• Online purchases increased by 20%</li>
                <li>• Restaurant spending near budget limit</li>
              </ul>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-800">Recommendations</h3>
              <ul className="mt-2 text-sm text-indigo-700 space-y-1">
                <li>• Consider bulk buying for frequent purchases</li>
                <li>• Review subscription services</li>
                <li>• Set up alerts for large transactions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}