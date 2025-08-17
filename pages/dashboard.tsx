import { useEffect, useState } from 'react';

interface ImpactItem {
  id: number;
  description: string;
  date: string;
  amount: number;
}

/**
 * Dashboard page for subscribers. Currently this page uses static
 * placeholder data. In a real application you would authenticate
 * the visitor and fetch their donation history and impact stats
 * from your backend or directly from Stripe.
 */
export default function Dashboard() {
  const [history, setHistory] = useState<ImpactItem[]>([]);

  useEffect(() => {
    // Simulated donation history; replace with live data retrieval
    setHistory([
      {
        id: 1,
        description: 'Provided 30 warm meals in Vancouver',
        date: '2025-08-15',
        amount: 25,
      },
      {
        id: 2,
        description: 'Supported one week of transitional housing',
        date: '2025-07-30',
        amount: 50,
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Your Dashboard</h1>
      <p className="text-center mb-8 text-gray-700">Welcome back! Here’s a snapshot of how your contributions are making a difference.</p>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-secondary">Impact History</h2>
        {history.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Impact</th>
                <th className="py-2 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-2 px-4">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{item.description}</td>
                  <td className="py-2 px-4 text-right">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No donation history yet.</p>
        )}
      </div>
    </div>
  );
}
