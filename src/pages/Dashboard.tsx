import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  AlertCircle 
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const stats = [
  { name: 'Total Spent', value: '$12,456', icon: DollarSign, change: '+12%', changeType: 'increase' },
  { name: 'Receipts', value: '45', icon: ShoppingBag, change: '+8%', changeType: 'increase' },
  { name: 'Average per Receipt', value: '$276.80', icon: TrendingUp, change: '+3%', changeType: 'increase' },
  { name: 'Over Budget Categories', value: '2', icon: AlertCircle, change: '+1', changeType: 'increase' },
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Spending',
      data: [1200, 1900, 1500, 2100, 1800, 2400],
      borderColor: 'rgb(79, 70, 229)',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      tension: 0.4,
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

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Your spending overview and recent activity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900">Spending Trends</h2>
            <p className="text-sm text-gray-500">Last 6 months</p>
          </div>
          <div className="h-[300px]">
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Receipts</h2>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {[
                { merchant: 'Walmart', date: '2024-03-15', amount: '$156.78' },
                { merchant: 'Target', date: '2024-03-14', amount: '$89.99' },
                { merchant: 'Amazon', date: '2024-03-13', amount: '$245.32' },
              ].map((receipt, idx) => (
                <li key={idx} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {receipt.merchant}
                      </p>
                      <p className="text-sm text-gray-500">{receipt.date}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-sm font-medium text-gray-900">
                        {receipt.amount}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Budget Alerts</h2>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {[
                {
                  category: 'Groceries',
                  status: 'Over budget by $120',
                  severity: 'high',
                },
                {
                  category: 'Entertainment',
                  status: 'Near budget limit',
                  severity: 'medium',
                },
                {
                  category: 'Shopping',
                  status: 'Within budget',
                  severity: 'low',
                },
              ].map((alert, idx) => (
                <li key={idx} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        alert.severity === 'high'
                          ? 'bg-red-500'
                          : alert.severity === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {alert.category}
                      </p>
                      <p className="text-sm text-gray-500">{alert.status}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}