'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend
);

// Define a type for our analytics data
type AnalyticsData = {
  total_reviews: number;
  average_rating: number;
  positive_reviews: number;
  rating_distribution: { rating: number; count: number }[];
  reviews_over_time: { date: string; count: number }[];
};

export default function AnalyticsDashboard({ analytics }: { analytics: AnalyticsData }) {
  const lineChartData = {
    labels: analytics.reviews_over_time.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [{
      label: 'Reviews per Day',
      data: analytics.reviews_over_time.map(d => d.count),
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
    }],
  };

  const pieChartData = {
    labels: analytics.rating_distribution.map(d => `${d.rating} Stars`),
    datasets: [{
      data: analytics.rating_distribution.map(d => d.count),
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#f97316', '#ef4444'],
    }],
  };

  return (
    <div className="mt-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Reviews" value={analytics.total_reviews} />
        <StatCard title="Average Rating" value={analytics.average_rating?.toFixed(1) || 'N/A'} />
        <StatCard title="Positive Reviews" value={`${Math.round((analytics.positive_reviews / analytics.total_reviews) * 100) || 0}%`} />
        {/* Add more stat cards */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg">Review Trend</h3>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg">Rating Distribution</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
    <p className="text-3xl font-bold mt-2 text-slate-800">{value}</p>
  </div>
);