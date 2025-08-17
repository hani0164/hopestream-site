import { GetStaticProps } from 'next';
import { useState } from 'react';
import PlanCard from '../components/PlanCard';
import EpisodeCard from '../components/EpisodeCard';
import { getEpisodes } from '../lib/sanity';

interface Episode {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string;
  publishedAt?: string;
}

interface HomeProps {
  episodes: Episode[];
}

/**
 * The landing page displays a hero section, a newsletter signup form and the
 * available donation plans. It also shows the latest content pulled from
 * Sanity so potential donors can see the stories they’ll receive.
 */
export default function Home({ episodes }: HomeProps) {
  const [email, setEmail] = useState('');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  const plans = [
    {
      name: 'Starter',
      price: 10,
      description: 'Provides warm meals and hygiene kits for those in need.',
      id: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
    },
    {
      name: 'Impact',
      price: 25,
      description: 'Funds emergency shelter nights and recovery counselling.',
      id: process.env.NEXT_PUBLIC_STRIPE_PRICE_IMPACT,
    },
    {
      name: 'Champion',
      price: 50,
      description: 'Supports long‑term housing and job readiness programs.',
      id: process.env.NEXT_PUBLIC_STRIPE_PRICE_CHAMPION,
    },
  ];

  /**
   * Trigger the creation of a Stripe Checkout session and redirect the
   * visitor to Stripe’s hosted payment page. A price ID must be defined
   * in your environment variables for each plan.
   */
  async function subscribe(priceId: string | undefined) {
    if (!priceId) {
      alert('Price ID missing. Please configure your environment variables.');
      return;
    }
    setLoadingPlan(priceId);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Unable to create checkout session');
      }
    } catch (err: any) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoadingPlan(null);
    }
  }

  /**
   * Adds an email address to the newsletter via the `/api/join` endpoint.
   */
  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus('loading');
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setNewsletterStatus('success');
        setEmail('');
      } else {
        setNewsletterStatus('error');
      }
    } catch (err) {
      console.error(err);
      setNewsletterStatus('error');
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="bg-primary text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">HopeStream</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Stream hope into the lives of Canadians experiencing homelessness and substance abuse.
          Your monthly support turns stories of struggle into stories of recovery.
        </p>
      </header>

      {/* Newsletter */}
      <section className="py-12 px-4 bg-white text-center">
        <h2 className="text-2xl font-semibold mb-4">Stay in the loop</h2>
        <p className="mb-6">Join our mailing list to receive updates on new episodes and the impact of your donations.</p>
        <form onSubmit={handleNewsletterSubmit} className="flex flex-col items-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary/90"
            disabled={newsletterStatus === 'loading'}
          >
            {newsletterStatus === 'loading' ? 'Joining…' : 'Join newsletter'}
          </button>
          {newsletterStatus === 'success' && <p className="text-green-600">Thank you for joining!</p>}
          {newsletterStatus === 'error' && <p className="text-red-600">Something went wrong. Please try again.</p>}
        </form>
      </section>

      {/* Plans */}
      <section className="py-12 px-4 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-8">Choose your plan</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center items-stretch max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              onSubscribe={() => subscribe(plan.id)}
              loading={loadingPlan === plan.id}
            />
          ))}
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="py-12 px-4 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-8">Latest Stories</h2>
        {episodes && episodes.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {episodes.map((episode) => (
              <EpisodeCard key={episode._id} episode={episode} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No stories available yet. Check back soon!</p>
        )}
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let episodes: Episode[] = [];
  try {
    episodes = await getEpisodes();
  } catch (err) {
    console.warn('Could not fetch episodes:', err);
  }
  return {
    props: { episodes },
    // Revalidate once per minute; adjust to your needs
    revalidate: 60,
  };
};
