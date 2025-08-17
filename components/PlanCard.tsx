import React from 'react';

interface PlanCardProps {
  name: string;
  price: number;
  description: string;
  onSubscribe: () => void;
  loading?: boolean;
}

/**
 * A reusable card component for displaying a subscription plan.
 *
 * The component shows the plan name, the monthly price and a short
 * description. When the user clicks the subscribe button the supplied
 * callback is invoked. A loading state disables the button and
 * replaces its text with a busy indicator.
 */
export default function PlanCard({ name, price, description, onSubscribe, loading = false }: PlanCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-md flex flex-col items-center justify-between w-full max-w-xs bg-white">
      <h3 className="text-xl font-semibold mb-2 text-primary">{name}</h3>
      <p className="text-4xl font-bold mb-4 text-secondary">
        ${price}
        <span className="text-base font-normal text-gray-600">/mo</span>
      </p>
      <p className="text-sm text-gray-700 mb-6 text-center">{description}</p>
      <button
        onClick={onSubscribe}
        disabled={loading}
        className="bg-accent text-primary font-semibold py-2 px-4 rounded-md hover:bg-accent/90 disabled:opacity-50"
      >
        {loading ? 'Processing…' : 'Subscribe'}
      </button>
    </div>
  );
}
